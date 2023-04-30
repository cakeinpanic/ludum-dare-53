import React, { useCallback, useEffect, useState } from "react";
import { moveFromRoom, RoomName } from "../../rooms/rooms";
import { startState } from "./startState";

import {
  AvailableWays,
  Character,
  CharactersCollection,
  Game,
  Item,
  ItemName,
  ItemsCollection,
} from "./types";

export const MAX_SCALE = 1;
export const MIN_SCALE = 0.5;

export interface useGameReturn {
  gameState: Game;
  availableWays: AvailableWays;
  characters: Character[];
  items: ItemsCollection;
  currentItem: Item | null;

  clickOnItem: (item: Item["id"]) => boolean;
  clickOnCharacter: (character: Character["name"]) => void;
  move: (direction: keyof AvailableWays) => void;
  setCurrentRoom: (room: RoomName) => void;
}

export const useGame = (): useGameReturn => {
  const [gameState, setGameState] = useState<Game>(startState.game);
  const [scale, setScale] = React.useState(MAX_SCALE);
  const [availableWays, setAvailableWays] = useState<AvailableWays>(
    startState.availableWays
  );

  const [characters, setCharacters] = useState<CharactersCollection>(
    startState.characters
  );
  const [items, setItems] = useState<ItemsCollection>(startState.items);
  const [currentItem, setCurrentItem] = useState<Item | null>(
    startState.currentItem
  );

  const setHelpText = useCallback((text: string) => {
    setGameState((prevState) => ({
      ...prevState,
      helpText: text,
    }));
  }, []);

  // calc available ways
  useEffect(() => {
    const availableWays = {
      up: !!moveFromRoom(gameState.currentRoom, "up"),
      down: !!moveFromRoom(gameState.currentRoom, "down"),
      left: !!moveFromRoom(gameState.currentRoom, "left"),
      right: !!moveFromRoom(gameState.currentRoom, "right"),
    };
    setAvailableWays(availableWays);
  }, [gameState.currentRoom]);

  const move = useCallback(
    (direction: keyof AvailableWays) => {
      const newRoom = moveFromRoom(gameState.currentRoom, direction);
      if (!newRoom) {
        return setHelpText("You can not go there");
      }
      setGameState((prevState) => ({
        ...prevState,
        currentRoom: newRoom,
      }));
    },
    [gameState.currentRoom]
  );

  const clickOnItem = useCallback(
    (itemId: Item["id"]) => {
      const item: Item = items[itemId];
      if (!item.isActive || !item.isVisible) {
        return false;
      }
      if (item.collectable) {
        setCurrentItem(item);

        setItems({
          ...items,
          [itemId]: { ...item, isVisible: false, isActive: false },
        });
        return;
      }
    },
    [items]
  );

  const clickOnCharacter = useCallback(
    (character: Character) => {
      if (character.name === "ma") {
        if (currentItem.id === "flowers") {
          setCharacters({
            ...characters,
            ["ma"]: { ...character, room: RoomName.kitchen },
          });
          setItems({
            ...items,
            [ItemName.flowers]: {
              ...items[ItemName.flowers],
              room: RoomName.kitchen,
              roomPosition: {
                shiftX: 300,
                shiftY: -100,
              },
              isVisible: true,
              isActive: false,
            },
            [ItemName.vase]: { ...items[ItemName.vase], isActive: false },
          });
          setHelpText(
            "You have given flowers to your mother. She is happy now."
          );
        }
      }
    },
    [currentItem, items, characters]
  );

  //   const teleport = useCallback((room: RoomName) => {}, []);
  const setCurrentRoom = useCallback((room: RoomName) => {
    setGameState((prevState) => ({
      ...prevState,
      currentRoom: room,
    }));
  }, []);

  return {
    scale,
    setScale,
    gameState,
    availableWays,
    characters,
    items,
    currentItem,
    clickOnItem,
    clickOnCharacter,
    move,
    setCurrentRoom,
  };
};
