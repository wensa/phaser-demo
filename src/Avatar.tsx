import React from "react";
import styled from "styled-components";
import { avatarSize } from "./config";

const Container = styled.div`
  border-radius: 50%;
  background-color: white;
  display: block;
  width: ${avatarSize}px;
  height: ${avatarSize}px;
  position: absolute;
  transform: translate(-50%, -50%);
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: block;

  & div {
    background-color: transparent !important;
    & video {
      border-radius: 50%;
    }
  }
`;

interface Props {
  id: string;
  mini?: boolean;
}

export default function Avatar(props: Props) {
  return (
    <Container>
      <Content id={props.id} />
    </Container>
  );
}
