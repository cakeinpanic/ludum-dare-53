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
  const [showMenu, setShowMenu] = React.useState<boolean>(true);
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
    isAllMuted,
    setIsAllMuted,
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
  const [style, setStyle] = useState({ transform: "scale(1)" });

  const updateSize = () => {
    console.log(window.innerWidth);
    if (window.innerWidth > 1000) {
      setStyle({});
      return;
    }
    const ratio = (window.innerWidth - 200) / 1000;
    console.log(ratio);
    setStyle({ transform: `scale(${ratio})` });
  };

  useEffect(() => {
    window.addEventListener("resize", (event) => {
      updateSize();
    });
    updateSize();
  }, []);

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
    <div className={styles.App} style={style}>
      {showMenu ? (
        <Letter
          onExit={() => menuClick()}
          skipTitle={wasReset}
          isAllMuted={isAllMuted}
          setIsAllMuted={setIsAllMuted}
        />
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
        isAllMuted={isAllMuted}
        setIsAllMuted={setIsAllMuted}
      />
      {blackAnimation && <div className={styles.blackAnimation} />}
    </div>
  );
}

export default App;
