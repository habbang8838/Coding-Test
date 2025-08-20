"use client";
import { useEffect } from "react";
import { postProctorEvent } from "@/lib/api/proctor";

export default function FocusGuard({ examId, userId }: { examId: string; userId: string }) {
  useEffect(() => {
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        postProctorEvent({ examId, userId, event_type: "FOCUS_OUT", event_detail: {} });
      }
    };
    const onBlur = () => postProctorEvent({ examId, userId, event_type: "WINDOW_BLUR", event_detail: {} });
    const onFs = () => {
      const fs = !!document.fullscreenElement;
      postProctorEvent({
        examId,
        userId,
        event_type: fs ? "FULLSCREEN_ENTER" : "FULLSCREEN_EXIT",
        event_detail: {},
      });
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", onBlur);
    document.addEventListener("fullscreenchange", onFs);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", onBlur);
      document.removeEventListener("fullscreenchange", onFs);
    };
  }, [examId, userId]);

  return null;
}