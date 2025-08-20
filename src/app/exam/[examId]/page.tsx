"use client";
import React, { useEffect, useMemo, useState } from "react";
import {useParams} from "next/navigation";
import Editor from "@monaco-editor/react";
import { getExam } from "@/lib/api/exams";
import dayjs from "dayjs";
import FocusGuard from "@/components/FocusGuard";

type Problem = { id: string; title: string; body: string; samples: { in: string; out: string }[] };

const mockProblems: Problem[] = [
  { id: "p1", title: "A+B", body: "두 정수 A, B가 주어질 때 A+B를 출력하세요.", samples: [{ in: "1 2", out: "3" }] },
  { id: "p2", title: "수 정렬하기", body: "N개의 수를 오름차순 정렬하세요.", samples: [{ in: "5\n3 2 5 1 4", out: "1 2 3 4 5" }] },
];

export default function Exam() {
  const {examId} = useParams<{examId:string}>();
  const userId = "demo-user";
  const [exam, setExam] = useState<any>(null);
  const [now, setNow] = useState(dayjs());
  const [selected, setSelected] = useState<Problem>(mockProblems[0]);
  const [code, setCode] = useState(`# Python3
a,b = map(int, input().split())
print(a+b)`);

  useEffect(() => {
    getExam(examId).then(setExam);
    const id = setInterval(() => setNow(dayjs()), 1000);
    return () => clearInterval(id);
  }, [examId]);

  const endAt = useMemo(() => (exam ? dayjs(exam.startsAtISO).add(exam.durationMin, "minute") : null), [exam]);
  const remain = endAt ? Math.max(0, endAt.diff(now, "second")) : 0;

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const ss = s % 60;
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(h)}:${pad(m)}:${pad(ss)}`;
  };

  const runLocal = () => alert("로컬 실행은 백엔드/샌드박스 붙일 때 구현");
  const submit = () => alert("제출 API는 백엔드 붙일 때 구현");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", height: "100vh" }}>
      <FocusGuard examId={examId} userId={userId} />
      <aside style={{ borderRight: "1px solid #eee", padding: 12, overflowY: "auto" }}>
        <div style={{ fontWeight: 800, marginBottom: 8 }}>문제 목록</div>
        <div style={{ display: "grid", gap: 6 }}>
          {mockProblems.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              style={{
                textAlign: "left",
                padding: "8px 10px",
                borderRadius: 6,
                border: "1px solid #ddd",
                background: selected.id === p.id ? "#f3f4f6" : "#fff",
              }}
            >
              {p.title}
            </button>
          ))}
        </div>
      </aside>

      <section style={{ display: "grid", gridTemplateRows: "auto 1fr auto", height: "100%" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderBottom: "1px solid #eee" }}>
          <div>
            <div style={{ fontWeight: 800 }}>{selected.title}</div>
            <div style={{ color: "#666", fontSize: 13 }}>{selected.body}</div>
          </div>
          <div style={{ fontFamily: "ui-monospace", fontWeight: 800 }}>남은 시간: {fmt(remain)}</div>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px" }}>
          <div style={{ minHeight: 0 }}>
            <Editor language="python" value={code} onChange={(v) => setCode(v ?? "")} height="100%" />
          </div>
          <div style={{ borderLeft: "1px solid #eee", padding: 10, overflowY: "auto" }}>
            <div style={{ fontWeight: 800, marginBottom: 8 }}>예제 입출력</div>
            {selected.samples.map((s, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 700 }}>입력</div>
                <pre style={pre}>{s.in}</pre>
                <div style={{ fontWeight: 700 }}>출력</div>
                <pre style={pre}>{s.out}</pre>
              </div>
            ))}
          </div>
        </div>

        <footer style={{ borderTop: "1px solid #eee", padding: 10, display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={runLocal} style={btn}>로컬 실행</button>
          <button onClick={submit} style={{ ...btn, background: "#111", color: "#fff" }}>제출</button>
        </footer>
      </section>
    </div>
  );
}

const pre: React.CSSProperties = { background: "#f9fafb", border: "1px solid #eee", padding: 10, borderRadius: 6, whiteSpace: "pre-wrap" };
const btn: React.CSSProperties = { padding: "8px 12px", borderRadius: 6, border: "1px solid #ddd", background: "#fff" };