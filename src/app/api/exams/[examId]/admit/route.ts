// app/api/exams/[examId]/admit/route.ts
import { NextResponse } from "next/server";
import dayjs from "dayjs";
import { getExam } from "@/lib/api/exams";

export async function POST(
  _req: Request,
  ctx: { params: Promise<{ examId: string }> }
) {
  const { examId } = await ctx.params;
  const exam = await getExam(examId);

  // 시작 시각을 초 단위로 고정(경계 오차 줄이기)
  const startAt = dayjs(exam.startsAtISO).second(0).millisecond(0);
  const openAt  = startAt.subtract(exam.lobbyOpenOffsetMin ?? 30, "minute");
  const closeAt = startAt.subtract(exam.lobbyCloseOffsetMin ?? 10, "minute");

  const now = dayjs();
  const OPEN_GRACE_SEC = 3;    // ← 오픈 3초 일찍도 허용
  const CLOSE_GRACE_SEC = 0;   // ← 마감은 엄격(필요하면 1~2초 줄 수 있음)

  const afterOpen   = !now.isBefore(openAt.subtract(OPEN_GRACE_SEC, "second"));      // now >= openAt - 3s
  const beforeClose = now.isBefore(closeAt.add(CLOSE_GRACE_SEC, "second"));          // now <  closeAt

  if (!(afterOpen && beforeClose)) {
    const res = new NextResponse("Not in admission window", { status: 403 });
    // 디버깅 도움되는 헤더
    res.headers.set("x-open-at", openAt.toISOString());
    res.headers.set("x-close-at", closeAt.toISOString());
    res.headers.set("x-now", now.toISOString());
    return res;
  }

  const endAt = startAt.add(exam.durationMin, "minute");
  const res = new NextResponse("ok");
  res.cookies.set(`admit_exam_${examId}`, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production", // dev(local)면 false
    path: "/",
    expires: endAt.add(10, "minute").toDate(),
  });
  return res;
}