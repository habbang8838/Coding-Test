"use client";

import { useEffect, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useRouter, useParams } from "next/navigation";
import { getExam } from "@/lib/api/exams";
import { toKST, nowKST } from "@/utils/time";

function useCountdown(target: Dayjs | null, intervalMs = 1000) {
  const calc = (t: Dayjs | null) => (t ? Math.max(0, t.diff(nowKST(), "second")) : null);
  const [remainSec, setRemainSec] = useState<number | null>(calc(target));
  useEffect(() => {
    if (!target) { setRemainSec(null); return; }
    setRemainSec(calc(target));
    const id = setInterval(() => setRemainSec(calc(target)), intervalMs);
    return () => clearInterval(id);
  }, [target ? target.valueOf() : null, intervalMs]);
  return remainSec;
}

function formatRemain(sec: number | null) {
  if (sec === null) return "--:--:--";
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function Lobby() {
  const { examId: _examId } = useParams<{ examId: string }>();
  const examId = Array.isArray(_examId) ? _examId[0] : _examId;

  const router = useRouter();
  const [exam, setExam] = useState<any>(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!examId) return;
    (async () => setExam(await getExam(examId)))();
  }, [examId]);

  // 시험 시작 시각 (exam.startsAtISO가 이미 KST라면 그대로 dayjs만 사용)
const startAt = useMemo<Dayjs | null>(
  () => (exam ? dayjs(exam.startsAtISO) : null),
  [exam]
);

// 숫자로 보장 + NaN 방지
const openMin = useMemo(
  () => Number.isFinite(Number(exam?.lobbyOpenOffsetMin))
    ? Number(exam!.lobbyOpenOffsetMin)
    : 30,
  [exam]
);

const closeMin = useMemo(
  () => Number.isFinite(Number(exam?.lobbyCloseOffsetMin))
    ? Number(exam!.lobbyCloseOffsetMin)
    : 10,
  [exam]
);

// 후보 시각
const candOpen = useMemo<Dayjs | null>(
  () => (startAt ? startAt.subtract(openMin, "minute") : null),
  [startAt, openMin]
);

const candClose = useMemo<Dayjs | null>(
  () => (startAt ? startAt.subtract(closeMin, "minute") : null),
  [startAt, closeMin]
);

const { openAt, closeAt } = useMemo(() => {
if (!candOpen || !candClose) {
  return { openAt: null as Dayjs | null, closeAt: null as Dayjs | null };
}
return candOpen.isBefore(candClose)
  ? { openAt: candOpen, closeAt: candClose }
  : { openAt: candClose, closeAt: candOpen };
}, [candOpen, candClose]);

  // 카운트다운
  const toStartSec = useCountdown(startAt);
  const toOpenSec  = useCountdown(openAt);
  const toCloseSec = useCountdown(closeAt);

  // ✅ phase: 초 단위 스냅으로 비교 → 30:00 아래로 내려가는 즉시 open
  const phase = useMemo<"loading" | "before" | "open" | "closed">(() => {
    if (toStartSec === null) return "loading";

    if (toStartSec >= openMin * 60) {
      return "before";   // 아직 30분 이상 남음
    }
    if (toStartSec > closeMin * 60) {
      return "open";     // 30분 미만 ~ 10분 초과
    }
    return "closed";     // 10분 이하
  }, [toStartSec, openMin, closeMin]);

  const inWindow = phase === "open";

  async function enterRoom() {
    if (!inWindow || loading || !examId || !exam) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/exams/${examId}/admit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // ❌ 굳이 오프셋/시작시간 다시 보내지 말고 서버가 getExam으로 판단하도록
        body: JSON.stringify({}),
      });

      if (!res.ok) {
        const msg = await res.text();
        const openAt = res.headers.get("x-open-at");
        const closeAt = res.headers.get("x-close-at");
        const now = res.headers.get("x-now");

        throw new Error(`${msg}\n(openAt=${openAt}, closeAt=${closeAt}, now=${now})`);
}

      router.replace(`/exam/${examId}/room`);
    } catch (e: any) {
      setErr(e.message ?? "입장 실패");
      setLoading(false);
    }
  }

  // ── 스타일 ────────────────────────────────────────────────────────
  const S: Record<string, React.CSSProperties> = {
    root: { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f1f5f9", padding: 20 },
    card: { width: "min(900px, 92vw)", background: "#fff", borderRadius: 20, boxShadow: "0 10px 30px rgba(0,0,0,0.12)", padding: 40, textAlign: "center" },
    title: { fontSize: 46, fontWeight: 900, marginBottom: 18 },
    row: { fontSize: 22, fontWeight: 700, margin: "10px 0" },
    help: { marginTop: 10, fontSize: 20, color: "#475569" },
    timer: { marginTop: 14, fontSize: 28, fontWeight: 900, letterSpacing: 1 },
    status: { marginTop: 14, fontSize: 20, fontWeight: 800, color: inWindow ? "#065f46" : "#b91c1c" },
    ctaWrap: { marginTop: 26 },
    hint: { marginTop: 10, fontSize: 16, color: "#475569" },
    err: { marginTop: 12, color: "#dc2626", fontSize: 18, fontWeight: 700 },
  };

  const ctaStyle = (enabled: boolean): React.CSSProperties => ({
    fontSize: 22, fontWeight: 900, padding: "16px 28px",
    borderRadius: 14, border: "none",
    cursor: enabled ? "pointer" : "not-allowed",
    background: enabled ? "#111827" : "#9ca3af", color: "#fff",
    boxShadow: enabled ? "0 10px 20px rgba(0,0,0,0.15)" : "none",
    opacity: enabled ? 1 : 0.9,
    transition: "transform .05s ease",
  });

  const ctaTitle =
    phase === "open"
      ? "입장 가능 시간입니다. 시험장으로 입장합니다."
      : phase === "before" && toOpenSec !== null
        ? `입장 가능까지 ${formatRemain(toOpenSec)} 남음`
        : "입장 시간이 마감되었습니다. (시험 시작 10분 전까지)";

  return (
    <main style={S.root}>
      <section style={S.card}>
        <h1 style={S.title}>시험 대기실</h1>

        <p style={S.row}>시험 시작: {startAt ? startAt.format("YYYY-MM-DD HH:mm") : "—"}</p>
        <p style={S.help}>입장 가능 시간은 <strong>시작 30분 전 ~ 10분 전</strong>입니다.</p>
        <p style={S.timer}>시험 시작까지 남은 시간 : {formatRemain(toStartSec)}</p>

        <p style={S.status}>
          {phase === "open"   && "✅ 지금은 입장 가능 시간입니다."}
          {phase === "before" && "⏳ 아직 입장 시간이 아닙니다."}
          {phase === "closed" && "❌ 입장 시간이 마감되었습니다."}
        </p>

        <div style={S.ctaWrap}>
          <button
            style={ctaStyle(inWindow && !loading)}
            disabled={!inWindow || loading}
            onClick={enterRoom}
            title={ctaTitle}
          >
            {loading ? "입장 중..." : "시험장 입장하기"}
          </button>

          {phase !== "open" && (
            <div style={S.hint}>
              {phase === "before" && toOpenSec !== null && <>입장 가능까지 {formatRemain(toOpenSec)} 남았습니다.</>}
              {phase === "closed" && <>입장 시간이 마감되었습니다.</>}
            </div>
          )}
        </div>

        {err && <div style={S.err}>{err}</div>}
      </section>
    </main>
  );
}