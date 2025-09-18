// app/api/exams/[examId]/admit/route.ts
import { NextResponse } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { getExam } from "@/lib/api/exams";

dayjs.extend(utc);
dayjs.extend(timezone);

const KST = "Asia/Seoul";
const nowKST = () => dayjs().tz(KST);

export async function POST(req: Request) {
  const url = new URL(req.url);
  const segments = url.pathname.split("/");
  const examId = segments[segments.indexOf("exams") + 1];
  const exam = await getExam(examId);

  // 시작/종료 시간은 그냥 참고용
  const startAt = dayjs(exam.startsAtISO).tz(KST);
  const endAt = startAt.add(exam.durationMin, "minute");

  // 🚫 입장 제한 로직 제거 → 항상 ok 응답
  const res = new NextResponse("ok");
  res.cookies.set(`admit_exam_${examId}`, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: endAt.add(10, "minute").toDate(),
  });
  return res;
}