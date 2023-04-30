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
      const { newCurrentItem, updateItemsObject, newHelpText, nextAct } =
        clickOnItemInteraction(items[itemId], currentItem);

      setCurrentItem(newCurrentItem);

      setItems({
        ...items,
        ...updateItemsObject,
      });
      if (nextAct) {
        setGameState((prevState) => ({
          ...prevState,
          act: prevState.act + 1 < 4 ? prevState.act + 1 : 3,
        }));
      }
      if (newHelpText) {
        setHelpText(newHelpText);
      }
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
        nextAct,
      } = clickOnCharacterInteraction(
        character.name,
        items,
        characters,
        currentItem
      );

      setCurrentItem(newCurrentItem);
      if (nextAct) {
        setGameState((prevState) => ({
          ...prevState,
          act: prevState.act + 1 < 4 ? prevState.act + 1 : 3,
        }));
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
