"use client";
import React, { useEffect, useState } from "react";
import WebcamPreview from "@/components/WebcamPreview";
import FocusGuard from "@/components/FocusGuard";
import Link from "next/link";

export default function SystemCheck({ params }: { params: { examId: string } }) {
  const examId = params.examId;
  const userId = "demo-user";
  const [camOn, setCamOn] = useState(false);
  const [fs, setFs] = useState<boolean>(!!document.fullscreenElement);

  useEffect(() => {
    const onFs = () => setFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const enterFs = async () => {
    await document.documentElement.requestFullscreen();
  };

  const canGo = camOn && fs;

  return (
    <main style={{ maxWidth: 760, margin: "40px auto", padding: 16 }}>
      <FocusGuard examId={examId} userId={userId} />
      <h1 style={{ fontSize: 24, fontWeight: 800 }}>시스템 체크</h1>

      <div style={{ display: "grid", gap: 12 }}>
        <WebcamPreview onStateChange={setCamOn} />
        <div style={{ border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>전체화면</div>
          <div>상태: {fs ? "ON ✅" : "OFF ❌"}</div>
          {!fs && (
            <button onClick={enterFs} style={{ marginTop: 8, padding: "8px 12px", borderRadius: 6 }}>
              전체화면 전환
            </button>
          )}
        </div>
      </div>

      <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
        <Link
          href={`/exam/${examId}`}
          style={{
            pointerEvents: canGo ? "auto" : "none",
            opacity: canGo ? 1 : 0.5,
            padding: "10px 14px",
            background: "#111",
            color: "#fff",
            borderRadius: 8,
          }}
        >
          시험 화면으로 이동
        </Link>
        <Link href={`/exam/${examId}/lobby`} style={{ padding: "10px 14px" }}>
          대기실로
        </Link>
      </div>
    </main>
  );
}