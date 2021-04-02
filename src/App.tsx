import React, { useState, useEffect } from "react";
import Phaser from "phaser";
import styled from "styled-components";
import { makeGame } from "./Scene";

const Fullscreen = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
`;

function App() {
  const [game, setGame] = useState<Phaser.Game>();

  useEffect(() => {
    const game = makeGame();
    setGame(game);
  }, []);

  return <Fullscreen id="stage"></Fullscreen>;
}

export default App;
