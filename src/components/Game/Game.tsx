import React, { useCallback, useEffect, useState } from "react";
import character from "../CharacterView/character.png";
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

  const express = [
    () => clickOnCharacter(CharacterName.sister),
    () => clickOnItem(ItemName.flowers),
    () => clickOnCharacter(CharacterName.ma),
  ];

  const [currentExpress, setCurrentExpress] = useState(0);

  const onExpressClick = () => {
    console.log("express jump to act 2");
    const expressStep = express[currentExpress];
    if (!expressStep) {
      return;
    }
    expressStep();

    setCurrentExpress(currentExpress + 1);
  };

  return (
    <>
      {currentExpress < express.length && (
        <div onClick={onExpressClick} className={styles.express}>
          DEbug: Next move express({express.length - currentExpress} left)
        </div>
      )}
      <div className={styles.game}>
        <House
          scale={scale}
          setScale={setScale}
          className={
            styles.house +
            " " +
            (gameState.act === 2 ? styles.darker : "") +
            " " +
            (gameState.act === 3 ? styles.darkest : "")
          }
          setCurrentRoom={setCurrentRoom}
          currentRoom={gameState.currentRoom}
        />

        <CharacterView
          character={{
            name: CharacterName.main,
            room: gameState.currentRoom,
            sprite: character,
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
            onClick={() => clickOnCharacter(character.name)}
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
