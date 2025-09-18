import { ProctorEvent } from "@/types/proctor";

export async function postProctorEvent(e: ProctorEvent) {
  // 백엔드 생기면 fetch(`${BASE}/proctor/events`, { method: "POST", body: JSON.stringify(e) })
  if (process.env.NODE_ENV !== "production") {
    console.log("[proctor_event]", e);
  }
  return { ok: true };
}