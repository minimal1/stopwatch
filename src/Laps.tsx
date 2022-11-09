import styled from "@emotion/styled";
import * as React from "react";
import { Lap, STATUS } from "./hooks/useStopwtach";
import { stopwatchTime } from "./utils";

interface IProps {
  status: STATUS;
  nextLap: Lap;
  laps: Lap[];
}

const LapItem: React.FC<Lap> = ({ title, lapTime }) => {
  return (
    <Box>
      <span>{title}</span>
      <span>{stopwatchTime(lapTime)}</span>
    </Box>
  );
};

const Laps: React.FC<IProps> = ({ status, nextLap, laps }) => {
  const showNextLap = React.useMemo(() => {
    return status === STATUS.PROCESSING || !!laps.length;
  }, [status, laps]);

  return (
    <Container>
      {showNextLap && <LapItem {...nextLap} />}
      {laps.map((lap) => {
        return <LapItem key={lap.id} {...lap} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-size: 24px;

  padding: 20px;

  &:not(:last-of-type) {
    border-bottom: 1px solid #1d1c1e;
  }

  &:last-of-type:not(:nth-of-type(1)):not(:nth-of-type(2)) {
    color: #e8594f;
  }

  &:nth-of-type(2) {
    color: #095d22;
  }
`;
export default Laps;
