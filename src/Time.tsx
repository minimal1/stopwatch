import styled from "@emotion/styled";
import * as React from "react";
import { stopwatchTime } from "./utils";

interface IProps {
  seconds: number;
}

const Time: React.FC<IProps> = ({ seconds }) => {
  return <Container>{stopwatchTime(seconds)}</Container>;
};

const Container = styled.div`
  color: white;
  font-size: 60px;

  display: flex;
  justify-content: center;
  align-items: center;

  flex: 1;
`;

export default Time;