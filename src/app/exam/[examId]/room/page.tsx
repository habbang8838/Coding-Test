// app/exam/[examId]/room/page.tsx (Server Component)
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RoomClient from "./room.client";

export default async function RoomPage(
  { params }: { params: Promise<{ examId: string }> }
) {
  const { examId } = await params;
  const cookieStore = await cookies();
  const admit = cookieStore.get(`admit_exam_${examId}`)?.value === "1";
  if (!admit) redirect(`/exam/${examId}/lobby?reason=admission_required`);
  return <RoomClient examId={examId} />; // ← 여기서 IDE/문제 렌더
}