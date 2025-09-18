"use client";

import { useEffect, useRef } from "react";

export default function WebcamPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function enableCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("웹캠 접근 실패:", err);
      }
    }
    enableCamera();
  }, []);

  return (
    <video
      ref={videoRef}
      className="w-full h-full object-cover rounded-md"
      autoPlay
      playsInline
      muted
    />
  );
}