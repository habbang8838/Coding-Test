"use client";
import { useEffect, useState } from 'react';
import dayjs, {Dayjs} from "dayjs";

type UseCountdownReturn = {
  remainSec: number | null;   // null이면 카운트다운 비활성
  isRunning: boolean;
};

export function useCountdown(target: Dayjs | null, intervalMs = 1000): UseCountdownReturn {
  const getRemain = (t: Dayjs | null) =>
    t ? Math.max(0, t.diff(dayjs(), "second")) : null;

  const [remainSec, setRemainSec] = useState<number | null>(getRemain(target));

  useEffect(() => {
    if (!target) {
      setRemainSec(null);
      return;
    }
    // target 변경 시 초기화
    setRemainSec(getRemain(target));

    const id = setInterval(() => {
      const s = getRemain(target);
      setRemainSec(s);
      if (s === 0) clearInterval(id);
    }, intervalMs);

    return () => clearInterval(id);
  }, [target ? target.valueOf() : null, intervalMs]); // Dayjs는 valueOf()로 의존성 관리

  return { remainSec, isRunning: !!target && (remainSec ?? 0) > 0 };
}
