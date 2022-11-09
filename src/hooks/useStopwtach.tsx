import * as React from "react";
import { INTERVAL, MILLISEC_PER_SECOND } from "../constants";

export enum STATUS {
  PROCESSING,
  STOP,
}

export interface Lap {
  id: number;
  title: string;
  lapTime: number;
  seconds: number;
}

interface UseStopwatchReturnType {
  seconds: number;
  status: STATUS;
  laps: Lap[];

  nextLap: Lap;

  start: () => void;
  stop: () => void;
  reset: () => void;
  record: () => void;
}

const useStopwatch: () => UseStopwatchReturnType = () => {
  // state
  const [seconds, setSeconds] = React.useState(0);
  const [status, setStatus] = React.useState<STATUS>(STATUS.STOP);
  const [laps, setLaps] = React.useState<Lap[]>([]);

  const nextLap = React.useMemo<Lap>(() => {
    return {
      id: laps.length + 1,
      title: `랩 ${laps.length + 1}`,
      lapTime: seconds - (laps[0]?.seconds ?? 0),
      seconds,
    };
  }, [seconds, laps]);

  const start = React.useCallback(() => {
    if (status !== STATUS.STOP) {
      console.debug("Status is not STOP");
      return;
    }

    setStatus(STATUS.PROCESSING);
    console.debug("Stopwatch just starts");
  }, [status]);

  const stop = React.useCallback(() => {
    if (status !== STATUS.PROCESSING) {
      console.debug("Status is not PROCESSING");
      return;
    }

    setStatus(STATUS.STOP);
    console.debug("Stopwatch just stops");
  }, [status]);

  const reset = React.useCallback(() => {
    if (status !== STATUS.STOP) {
      console.debug("Status is not STOP");
      return;
    }

    setSeconds(0);
    setLaps([]);
    console.debug("Stopwatch just resets");
  }, [status]);

  const record = React.useCallback(() => {
    if (status !== STATUS.PROCESSING) {
      console.debug("Status is not PROCESSING");
      return;
    }

    setLaps((prev) => [nextLap, ...prev]);
    console.debug("Stopwatch just records");
  }, [status, nextLap]);

  React.useEffect(() => {
    let intervalId: number;

    if (status === STATUS.PROCESSING) {
      intervalId = window.setInterval(() => {
        setSeconds((prev) => {
          return prev + INTERVAL / MILLISEC_PER_SECOND;
        });
      }, INTERVAL);
    }

    return () => {
      window.clearInterval(intervalId);
    };
  }, [status]);

  return {
    seconds,
    status,
    laps,

    nextLap,

    start,
    stop,
    reset,
    record,
  };
};

export default useStopwatch;
