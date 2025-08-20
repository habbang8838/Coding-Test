import dayjs from "dayjs";
import {KST} from "./time";

export function isValidExamId(examId: string) {
  const m = /^coding_test_(\d{6})$/.exec(examId);
  if (!m) return false;
  const currentYYYYMM = dayjs().tz(KST).format("YYYYMM");
  return m[1] === currentYYYYMM;
}