import React, { useEffect, useState } from "react";
import { Controls } from "../Controls/Controls";
import { Game } from "../Game/Game";
import { useGame, useGameReturn } from "../Game/useGame";
import { HelpText } from "../HelpText/HelpText";
import { Subtitles } from "../Subtitles/Subtitles";
import { Letter } from "../Letter/Letter";
import { Music } from "../music/Music";

import styles from "./App.module.scss";

function App() {
  const [showMenu, setShowMenu] = React.useState<boolean>(false);
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const [blackAnimation, setBlackAnimation] = React.useState<boolean>(false);
  const [wasReset, setWasReset] = React.useState<boolean>(false);
  const gameProps: useGameReturn = useGame();
  const {
    scale,
    express,
    setSubs,
    setScale,
    move,
    currentItem,
    availableWays,
    gameState,
    resetWholeGame,
  } = gameProps;

  const menuClick = () => {
    setBlackAnimation(true);
    setTimeout(() => {
      setShowMenu(false);
    }, 1000);
    setTimeout(() => {
      setBlackAnimation(false);
    }, 2000);
  };

  useEffect(() => {
    if (loaded) {
      return;
    }
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);
  const resetGame = () => {
    setWasReset(true);
    setShowMenu(true);
    resetWholeGame();
  };
  if (!loaded) {
    return (
      <div className={styles.App}>
        <div className={styles.loader}>Loading...</div>
      </div>
    );
  }
  return (
    <div className={styles.App}>
      {showMenu ? (
        <Letter onExit={() => menuClick()} skipTitle={wasReset} />
      ) : (
        <>
          <Game gameProps={gameProps} />
          <Controls
            scale={scale}
            setScale={setScale}
            move={move}
            availableWays={availableWays}
          />
        </>
      )}

      {!showMenu && (
        <>
          <HelpText text={gameState.helpText} inventory={currentItem?.id} />
          <Subtitles
            text={gameState.subtitles}
            clear={() => {
              if (gameState.status.gameFinished) {
                resetGame();
                return;
              }
              setSubs("");
            }}
          />
        </>
      )}
      <Music
        gameStarted={true}
        room={gameState.currentRoom}
        act={gameState.act}
      />
      {blackAnimation && <div className={styles.blackAnimation} />}
    </div>
  );
}

export default App;
