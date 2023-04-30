import React, { useCallback, useEffect } from "react";
import { CharacterView } from "../CharacterView/CharacterView";
import { Controls, MAX_SCALE } from "../Controls/Controls";
import { HelpText } from "../HelpText/HelpText";
import { House } from "../House/House";
import { ItemView } from "../ItemView/ItemView";
import styles from "./Game.module.scss";
import { AvailableWays } from "./types";
import { useGame } from "./useGame";

export function Game() {
  const [debugMode, setDebugMode] = React.useState<boolean>(false);
  const [scale, setScale] = React.useState(MAX_SCALE);

  const { gameState, items, characters, move, setCurrentRoom, availableWays } =
    useGame();

  const moveOnMap = useCallback(
    (e) => {
      const coordinates = { x: 0, y: 0 };
      let direction: keyof AvailableWays | undefined;

      if (e.key === "s" || e.key === "ArrowDown") {
        direction = "down";
        e.preventDefault();
      }
      if (e.key === "a" || e.key === "ArrowLeft") {
        direction = "left";
        e.preventDefault();
      }
      if (e.key === "d" || e.key === "ArrowRight") {
        direction = "right";
        e.preventDefault();
      }
      if (e.key === "w" || e.key === "ArrowUp") {
        direction = "up";
        e.preventDefault();
      }
      if (direction) {
        move(direction);
      }
    },
    [move]
  );

  useEffect(() => {
    document.addEventListener("keydown", moveOnMap);
    return () => {
      document.removeEventListener("keydown", moveOnMap);
    };
  }, [moveOnMap]);

  return (
    <>
      <div className={styles.game}>
        <House
          scale={scale}
          setScale={setScale}
          className={styles.house}
          setCurrentRoom={setCurrentRoom}
          currentRoom={gameState.currentRoom}
        />

        <CharacterView
          character={{
            name: "main",
            room: gameState.currentRoom,
            roomPosition: { x: 0, y: 0 },
          }}
          scale={scale}
          key="main"
        />

        {characters.map((character) => (
          <CharacterView
            character={character}
            scale={scale}
            key={character.name}
          />
        ))}
        {Object.values(items).map((item) => (
          <ItemView item={item} scale={scale} key={item.id} />
        ))}
      </div>
      <Controls
        scale={scale}
        setScale={setScale}
        move={move}
        availableWays={availableWays}
      />
      <HelpText text={gameState.helpText} />
    </>
  );
}
