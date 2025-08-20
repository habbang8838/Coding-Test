// src/lib/api/exams.ts
import dayjs from "dayjs";

export type Exam = {
  id: string;
  title: string;
  startsAtISO: string;
  durationMin: number;
  lobbyOpenOffsetMin?: number;
  lobbyCloseOffsetMin?: number;
};

declare global {
  // HMR에서도 유지
  // eslint-disable-next-line no-var
  var __EXAM_STORE__: Map<string, Exam> | undefined;
}
const EXAM_STORE = globalThis.__EXAM_STORE__ ?? (globalThis.__EXAM_STORE__ = new Map());

// ✅ 최초 1회만 생성해서 계속 같은 값 반환
export async function getExam(examId: string): Promise<Exam> {
  let ex = EXAM_STORE.get(examId);
  if (!ex) {
    const startsAt = dayjs().add(31, "minute").second(0).millisecond(0); // 테스트 값
    ex = {
      id: examId,
      title: "알고리즘 코딩테스트",
      startsAtISO: startsAt.toISOString(),
      durationMin: 120,
      lobbyOpenOffsetMin: 30,
      lobbyCloseOffsetMin: 10,
    };
    EXAM_STORE.set(examId, ex);
  }
  return ex;
}

// 초 → HH:mm:ss
export function formatRemain(sec: number | null) {
  if (sec === null) return "--:--:--";
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}