import styled from "@emotion/styled";
import * as React from "react";
import Controllers from "./Controllers";
import useStopwatch from "./hooks/useStopwtach";
import Laps from "./Laps";
import Time from "./Time";

const Stopwatch: React.FC = () => {
  // hooks
  const { seconds, status, laps, nextLap, start, stop, record, reset } =
    useStopwatch();

  return (
    <IPhone>
      <Screen>
        <Time seconds={seconds} />
        <Controllers
          state={status}
          record={record}
          start={start}
          stop={stop}
          reset={reset}
        />
        <Laps status={status} nextLap={nextLap} laps={laps} />
      </Screen>
    </IPhone>
  );
};

const IPhone = styled.div`
  border-radius: 30px;
  width: 400px;
  height: 800px;

  background-color: #fbfbfd;
  padding: 20px;
  box-shadow: 7px 7px 10px rgba(0, 0, 0, 0.4),
    inset -5px -5px 15px rgba(0, 0, 0, 0.2),
    inset 2px 0px 15px rgba(0, 0, 0, 0.2);
`;

const Screen = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 30px;
  overflow: hidden;
  background-color: black;

  display: flex;
  flex-direction: column;
  justify-content: stretch;
  align-items: stretch;
`;

export default Stopwatch;
