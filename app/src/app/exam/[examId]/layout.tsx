import {notFound} from "next/navigation";
import {isValidExamId} from "@/utils/exam";
import type {ReactNode} from "react";

export const dynamic = "force-dynamic"; // 월 바뀔때 즉시 반영시킬 것

export default async function ExamLayout({
  children,
  params,
}: {
  children: ReactNode;
  // ✅ params는 Promise 타입이어야 함
  params: Promise<{ examId: string }>;
}) {
  // ✅ 반드시 await 해서 꺼내 쓰기
  const { examId } = await params;

  if (!isValidExamId(examId)) notFound();
  return <>{children}</>;
}