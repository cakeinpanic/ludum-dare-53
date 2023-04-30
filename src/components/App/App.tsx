import React from "react";
import { Controls } from "../Controls/Controls";
import { Game } from "../Game/Game";
import { useGame, useGameReturn } from "../Game/useGame";
import { HelpText } from "../HelpText/HelpText";
import { Letter } from "../Letter/Letter";
import { Music } from "../music/Music";
import styles from "./App.module.scss";

function App() {
  const [showMenu, setShowMenu] = React.useState<boolean>(true);
  const gameProps: useGameReturn = useGame();
  const { scale, setScale, move, availableWays, gameState } = gameProps;
  console.log(gameProps);
  const menuClick = () => {
    setShowMenu(false);
  };
  return (
    <div className={styles.App}>
      {showMenu ? (
        <Letter onClick={() => menuClick()} />
      ) : (
        <>
          <Game gameProps={gameProps} />
          <Controls
            scale={scale}
            setScale={setScale}
            move={move}
            availableWays={availableWays}
          />
          <HelpText text={gameState.helpText} />
        </>
      )}

      <Music gameStarted={!showMenu} />
    </div>
  );
}

export default App;
