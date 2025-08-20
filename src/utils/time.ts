import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const KST = "Asia/Seoul";
export const nowKST = () => dayjs().tz(KST);
export const toKST = (d: string | number | Date) => dayjs(d).tz(KST);

export function lobbyWindow(startsAtISO: string, openOffsetMin: number, closeOffsetMin: number) {
  const start = toKST(startsAtISO);
  const openAt = start.subtract(openOffsetMin, "minute");
  const closeAt = start.subtract(closeOffsetMin, "minute");
  return {start, openAt, closeAt};
}