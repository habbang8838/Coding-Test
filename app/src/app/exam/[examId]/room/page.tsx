import RoomClient from "./room.client";
import { getExam } from "@/lib/api/exams";

interface RoomPageProps {
  params: { examId: string };
}

// @ts-expect-error Next.js build 시 타입 충돌 무시
export default async function RoomPage({ params }: RoomPageProps) {
  const exam = await getExam(params.examId);

  return (
    <RoomClient
      examId={params.examId}
      title={exam.title}
      startAtISO={exam.startsAtISO}
      durationMin={exam.durationMin}
      nowISO={new Date().toISOString()}
    />
  );
}