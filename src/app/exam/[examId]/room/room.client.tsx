"use client";

import { useEffect, useState, useRef } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { formatRemain } from "@/lib/api/exams";
import WebcamArea from "@/components/WebcamPreview";
import QuizExam from "./QuizExam";

dayjs.extend(utc);
dayjs.extend(timezone);

const KST = "Asia/Seoul";

export default function RoomClient({
  examId,
  title,
  startAtISO,
  durationMin,
  nowISO,
}: {
  examId: string;
  title: string;
  startAtISO: string;
  durationMin: number;
  nowISO: string;
}) {
  const [now, setNow] = useState(dayjs(nowISO).tz(KST));
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(dayjs().tz(KST)), 1000);
    return () => clearInterval(timer);
  }, []);

  // 웹캠 연결 (채팅 영역에서도 쓰려고 유지)
  useEffect(() => {
    async function enableCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("웹캠 접근 실패:", err);
      }
    }
    enableCamera();
  }, []);

  const startAt = dayjs(startAtISO).tz(KST);
  const endAt = startAt.add(durationMin, "minute");

  const beforeStartSec = startAt.diff(now, "second");
  const afterStartSec = endAt.diff(now, "second");
  const examStarted = beforeStartSec <= 0;
  const examEnded = afterStartSec <= 0;

  return (
    <div className="flex h-screen">
      {/* ⬅ 왼쪽 (메인 시험 영역) */}
      <div className="flex-[8] p-4 overflow-y-auto">
        {!examStarted ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <p className="text-lg font-semibold">
              시험 시작 예정 시각:{" "}
              <span className="text-blue-500">
                {startAt.format("YYYY-MM-DD HH:mm:ss")}
              </span>
            </p>
            <p className="text-lg font-semibold mt-2">
              시험 시작까지 남은 시간:{" "}
              <span className="text-red-500 text-2xl">
                {formatRemain(beforeStartSec)}
              </span>
            </p>
          </div>
        ) : !examEnded ? (
          <div className="h-full flex flex-col">
            <h2 className="text-xl font-bold mb-4">머신러닝 퀴즈 시험</h2>
            <p className="text-lg font-semibold">
              시험 종료 예정 시각:{" "}
              <span className="text-blue-500">
                {endAt.format("YYYY-MM-DD HH:mm:ss")}
              </span>
            </p>
            <p className="text-lg font-semibold mt-2 mb-6">
              시험 종료까지 남은 시간:{" "}
              <span className="text-green-600 text-2xl">
                {formatRemain(afterStartSec)}
              </span>
            </p>

            {/* ✅ 시험 문제 */}
            <QuizExam />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-bold text-red-600">
              시험이 종료되었습니다.
            </h2>
          </div>
        )}
      </div>

      {/* ➡ 오른쪽 (웹캠 + 채팅) */}
      <div className="flex-[2] flex flex-col border-l border-gray-300">
        {/* 웹캠 */}
        <div className="h-40 border-b border-gray-300 flex items-center justify-center">
          <video
            ref={videoRef}
            className="w-full h-full object-cover rounded-md"
            autoPlay
            playsInline
            muted
          />
        </div>

        {/* 채팅 로그 */}
        <div className="flex-1 overflow-y-auto p-2 text-sm">
          <div>[채팅 로그]</div>
          <div>관리자: 시험 안내드립니다.</div>
          <div>응시자: 네 알겠습니다.</div>
        </div>

        {/* 입력창 */}
        <div className="border-t border-gray-300 p-2">
          <input
            type="text"
            placeholder="메시지를 입력하세요..."
            className="w-full border rounded px-2 py-1 text-sm"
          />
          <button className="mt-2 w-full bg-blue-500 text-white text-sm py-1 rounded">
            전송
          </button>
        </div>
      </div>
    </div>
  );
}