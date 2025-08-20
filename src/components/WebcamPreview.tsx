"use client";
import React, { useEffect, useRef, useState } from "react";

export default function WebcamPreview({ onStateChange }: { onStateChange?: (on: boolean) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
        setOn(true);
        onStateChange?.(true);
      } catch (e: any) {
        setErr(e?.message ?? "카메라 접근 실패");
        setOn(false);
        onStateChange?.(false);
      }
    })();
    return () => {
      const tracks = (videoRef.current?.srcObject as MediaStream | undefined)?.getTracks();
      tracks?.forEach((t) => t.stop());
    };
  }, [onStateChange]);

  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>웹캠 상태: {on ? "ON ✅" : "OFF ❌"}</div>
      <video ref={videoRef} muted playsInline style={{ width: "100%", background: "#000", borderRadius: 6 }} />
      {err && <div style={{ marginTop: 8, color: "crimson" }}>{err}</div>}
    </div>
  );
}
