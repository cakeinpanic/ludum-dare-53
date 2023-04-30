import React, { useCallback, useEffect } from "react";
import bird from "../CharacterView/bird.png";
import { CharacterView } from "../CharacterView/CharacterView";
import { House } from "../House/House";
import { ItemView } from "../ItemView/ItemView";
import styles from "./Game.module.scss";
import { AvailableWays, CharacterName, ItemName } from "./types";

export function Game({ gameProps }) {
  const {
    gameState,
    scale,
    setScale,
    items,
    characters,
    move,
    setCurrentRoom,
    clickOnCharacter,
    clickOnItem,
  } = gameProps;
  console.log((characters["ma"], items[ItemName.flowers]));
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
            name: CharacterName.main,
            room: gameState.currentRoom,
            sprite: bird,
            roomPosition: { x: 0, y: 0 },
          }}
          scale={scale}
          key="main"
        />

        {Object.values(characters).map((character) => (
          <CharacterView
            character={character}
            scale={scale}
            key={character.name}
            onClick={() => clickOnCharacter(character)}
          />
        ))}
        {Object.values(items).map((item) => (
          <ItemView
            item={item}
            scale={scale}
            key={item.id}
            onClick={() => clickOnItem(item.id)}
          />
        ))}
      </div>
    </>
  );
}
