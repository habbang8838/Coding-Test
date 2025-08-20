// app/exam/[examId]/room/room.client.tsx
"use client";
export default function RoomClient({ examId }: { examId: string }) {
  return (
    <div style={{ padding: 24, fontSize: 22, fontWeight: 700 }}>
      {examId} 시험장 화면 (여기에 IDE/문제 UI 넣기)
    </div>
  );
}