import React, { useCallback, useEffect, useState } from "react";
import { moveFromRoom, RoomName } from "../../rooms/rooms";
import {
  clickOnCharacterInteraction,
  clickOnItemInteraction,
} from "./interactions";
import { startState } from "./startState";
import { uniq as _uniq, filter as _filter } from "lodash";
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
  const [currentItem, setCurrentItem] = useState<Item[]>(
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

  const addCurrentItem = useCallback(
    (newCurrentItem: Item) => {
      setCurrentItem(_uniq([...currentItem, newCurrentItem]));
    },
    [currentItem, setCurrentItem]
  );

  const removeCurrentItem = useCallback(
    (newCurrentItem: Item) => {
      setCurrentItem(_filter(currentItem, newCurrentItem));
    },
    [currentItem, setCurrentItem]
  );

  const clickOnItem = useCallback(
    (itemId: Item["id"]) => {
      const { newCurrentItem, updateItemsObject } = clickOnItemInteraction(
        items[itemId]
      );

      if (newCurrentItem) {
        addCurrentItem(newCurrentItem);
      }

      setItems({
        ...items,
        ...updateItemsObject,
      });
    },
    [items, currentItem]
  );

  const clickOnCharacter = useCallback(
    (character: Character) => {
      const {
        newCurrentItem,
        updateItemsObject,
        updateCharactersObject,
        newHelpText,
      } = clickOnCharacterInteraction(
        character.name,
        items,
        characters,
        currentItem
      );
      if (newCurrentItem) {
        addCurrentItem(newCurrentItem);
      }

      setItems({
        ...items,
        ...updateItemsObject,
      });

      setCharacters({
        ...characters,
        ...updateCharactersObject,
      });

      if (newHelpText) {
        setHelpText(newHelpText);
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
