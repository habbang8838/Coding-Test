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

export async function POST(req:Request){
  const url = new URL(req.url);
  const segments = url.pathname.split("/");
  const examId = segments[segments.indexOf("exams") + 1];
  const exam = await getExam(examId);

  // ⚠️ 클라와 동일 시간대(KST)로 통일. 초 스냅 제거(권장).
  const startAt = dayjs(exam.startsAtISO); // .second(0).millisecond(0) 하지 않음
  const openAt  = startAt.subtract(exam.lobbyOpenOffsetMin ?? 2, "minute");
  const closeAt = startAt.subtract(exam.lobbyCloseOffsetMin ?? 1, "minute");

  const now = nowKST();

  // 경계 흔들림 방지용 여유(선택)
  const OPEN_GRACE_SEC = 1;   // 살짝만 여유
  const CLOSE_GRACE_SEC = 0;

  const afterOpen   = !now.isBefore(openAt.subtract(OPEN_GRACE_SEC, "second"));
  const beforeClose =  now.isBefore(closeAt.add(CLOSE_GRACE_SEC, "second"));

  if (!(afterOpen && beforeClose)) {
    const res = new NextResponse("Not in admission window", { status: 403 });
    res.headers.set("x-open-at", openAt.format("YYYY-MM-DD HH:mm:ss"));
    res.headers.set("x-close-at", closeAt.format("YYYY-MM-DD HH:mm:ss"));
    res.headers.set("x-now", now.format("YYYY-MM-DD HH:mm:ss"));
    return res;
  }

  const endAt = startAt.add(exam.durationMin, "minute");
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