import { css } from "@emotion/react";
import styled from "@emotion/styled";
import * as React from "react";

type ButtonType = "NORMAL" | "SUCCESS" | "ERROR";

interface IProps {
  type: ButtonType;
  onClick: () => void;
  children: React.ReactNode;
}

type StyledProps = Omit<IProps, "onClick" | "children">;

const Button: React.FC<IProps> = ({ type, onClick, children }) => {
  return (
    <Container type={type} onClick={onClick}>
      {children}
    </Container>
  );
};

const getStyleByType = (props: StyledProps) => {
  let color = "white";
  let backgroundColor = "#333333";

  switch (props.type) {
    case "NORMAL":
      color = "white";
      backgroundColor = "#333333";
      break;
    case "SUCCESS":
      color = "#095D22";
      backgroundColor = "#0A2A12";
      break;
    case "ERROR":
      color = "#E8594F";
      backgroundColor = "#340D0B";
      break;
  }

  return css`
    color: ${color};
    background-color: ${backgroundColor};
  `;
};

const Container = styled.div<StyledProps>`
  width: 100px;
  height: 100px;
  border-radius: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
  ${getStyleByType}

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

export default Button;
