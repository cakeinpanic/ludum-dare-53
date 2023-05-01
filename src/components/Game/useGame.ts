import React, { useCallback, useEffect, useMemo, useState } from "react";
import { moveFromRoom, RoomName } from "../../rooms/rooms";
import {
  clickOnCharacterInteraction,
  clickOnItemInteraction,
  expressTo2,
} from "./interactions";
import { startState } from "./startState";
import { uniq as _uniq, filter as _filter } from "lodash";
import {
  AvailableWays,
  Character,
  CharacterName,
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
      up: !!moveFromRoom(
        gameState.currentRoom,
        "up",
        characters,
        items,
        currentItem
      ),
      down: !!moveFromRoom(
        gameState.currentRoom,
        "down",
        characters,
        items,
        currentItem
      ),
      left: !!moveFromRoom(
        gameState.currentRoom,
        "left",
        characters,
        items,
        currentItem
      ),
      right: !!moveFromRoom(
        gameState.currentRoom,
        "right",
        characters,
        items,
        currentItem
      ),
    };
    setAvailableWays(availableWays);
  }, [gameState.currentRoom]);

  const move = useCallback(
    (direction: keyof AvailableWays) => {
      const newRoom = moveFromRoom(
        gameState.currentRoom,
        direction,
        characters,
        items,
        currentItem
      );
      if (!newRoom) {
        return setHelpText("You can not go there");
      }
      setGameState((prevState) => ({
        ...prevState,
        currentRoom: newRoom,
      }));
    },
    [characters, currentItem, gameState.currentRoom, items, setHelpText]
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
        goToNextAct();
      }
      if (newHelpText) {
        setHelpText(newHelpText);
      }
    },
    [items, currentItem, goToNextAct, setHelpText]
  );

  const goToNextAct = useCallback(() => {
    setGameState((prevState) => ({
      ...prevState,
      act: prevState.act + 1 < 4 ? prevState.act + 1 : 3,
    }));
  }, [setGameState]);

  useEffect(() => {
    if (gameState.act === 2) {
      setItems((currentItems) => ({
        ...currentItems,
        [ItemName.blanket]: {
          ...currentItems[ItemName.blanket],
          isVisible: true,
        },
      }));
      setCharacters((currentCharacters) => ({
        ...currentCharacters,
        "ma": { ...currentCharacters["ma"], room: RoomName.kitchen },
      }));
    }
  }, [gameState.act]);

  const clickOnCharacter = useCallback(
    (characterName: CharacterName) => {
      const {
        newCurrentItem,
        updateItemsObject,
        updateCharactersObject,
        newHelpText,
        nextAct,
      } = clickOnCharacterInteraction(
        characterName,
        items,
        characters,
        currentItem,
        gameState.act
      );

      setCurrentItem(newCurrentItem);
      if (nextAct) {
        goToNextAct();
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
    [items, characters, currentItem, gameState.act, goToNextAct, setHelpText]
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
