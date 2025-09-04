import RoomClient from "./room.client";
import { getExam } from "@/lib/api/exams";

export default async function RoomPage({ params }: { params: { examId: string } }) {
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