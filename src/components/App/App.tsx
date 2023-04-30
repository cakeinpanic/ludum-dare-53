import React, { useEffect } from "react";
import { Controls } from "../Controls/Controls";
import { Game } from "../Game/Game";
import { useGame, useGameReturn } from "../Game/useGame";
import { HelpText } from "../HelpText/HelpText";
import { Letter } from "../Letter/Letter";
import { Music } from "../music/Music";
import styles from "./App.module.scss";

function App() {
  const [showMenu, setShowMenu] = React.useState<boolean>(true);
  const [loaded, setLoaded] = React.useState<boolean>(true);

  const gameProps: useGameReturn = useGame();
  const { scale, setScale, move, currentItem, availableWays, gameState } =
    gameProps;

  const menuClick = () => {
    setShowMenu(false);
  };
  useEffect(() => {
    if (loaded) {
      return;
    }
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);
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
        </>
      )}

      {!showMenu && (
        <HelpText text={gameState.helpText} inventory={currentItem?.id} />
      )}
      <Music gameStarted={!showMenu} />
    </div>
  );
}

export default App;
