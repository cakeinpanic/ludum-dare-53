import React, { useCallback, useEffect, useMemo, useState } from "react";
import { clickOnCharacterInteraction } from "../../interactions/characters";
import { clickOnItemInteraction } from "../../interactions/items";
import { moveRoomInteraction } from "../../interactions/room";
import { InteractionResult } from "../../interactions/types";

import { moveFromRoom, RoomName } from "../../rooms/rooms";

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
  const [isAllMuted, setIsAllMuted] = useState(false);
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
  const setSubs = useCallback((text: string) => {
    setGameState((prevState) => ({
      ...prevState,
      subtitles: text,
    }));
  }, []);
  const resetWholeGame = useCallback(() => {
    // weeeird bug
    setCharacters({
      ...startState.characters,
      [CharacterName.sister]: {
        ...characters[CharacterName.sister],
        room: RoomName.kitchen,
      },
    });
    setItems(startState.items);
    setCurrentItem(startState.currentItem);
    setAvailableWays(startState.availableWays);
    setGameState(startState.game);
  }, []);
  // calc available ways
  useEffect(() => {
    const availableWays = {
      up: !!moveFromRoom(
        gameState.currentRoom,
        "up",
        characters,
        items,
        currentItem,
        gameState
      ),
      down: !!moveFromRoom(
        gameState.currentRoom,
        "down",
        characters,
        items,
        currentItem,
        gameState
      ),
      left: !!moveFromRoom(
        gameState.currentRoom,
        "left",
        characters,
        items,
        currentItem,
        gameState
      ),
      right: !!moveFromRoom(
        gameState.currentRoom,
        "right",
        characters,
        items,
        currentItem,
        gameState
      ),
    };
    setAvailableWays(availableWays);
  }, [gameState]);

  const applyInteraction = useCallback(
    ({
      newCurrentItem,
      updateCharactersObject,
      updateItemsObject,
      nextAct,
      newHelpText,
      updatedStatus,
      newSubs,
    }: InteractionResult) => {
      setCurrentItem(newCurrentItem);
      setGameState((prevState) => ({
        ...prevState,
        status: { ...prevState.status, ...(updatedStatus || {}) },
      }));
      setItems({
        ...items,
        ...updateItemsObject,
      });

      setCharacters({
        ...characters,
        ...updateCharactersObject,
      });
      if (nextAct) {
        goToNextAct();
      }

      setHelpText(newHelpText);
      setSubs(newSubs);
    },
    [items, characters, currentItem, gameState.act, gameState.currentRoom]
  );
  const move = useCallback(
    (direction: keyof AvailableWays) => {
      const newRoom = moveFromRoom(
        gameState.currentRoom,
        direction,
        characters,
        items,
        currentItem,
        gameState
      );
      if (!newRoom) {
        return;
      }

      setTimeout(() => {
        applyInteraction(
          moveRoomInteraction(
            gameState.currentRoom,
            newRoom as RoomName,
            items,
            characters,
            currentItem,
            gameState
          )
        );
      }, 400);

      setGameState((prevState) => ({
        ...prevState,
        currentRoom: newRoom as RoomName,
      }));
    },
    [characters, currentItem, gameState, items, setHelpText]
  );

  useEffect(() => {
    console.log(characters[CharacterName.main]);
  }, [characters]);

  const goToNextAct = useCallback(() => {
    setGameState((prevState) => ({
      ...prevState,
      act: prevState.act + 1 < 4 ? prevState.act + 1 : 3,
    }));
  }, [setGameState]);

  const clickOnItem = useCallback(
    (itemId: Item["id"]) => {
      applyInteraction(
        clickOnItemInteraction(
          itemId,
          items,
          characters,
          currentItem,
          gameState.act
        )
      );
    },
    [items, currentItem, goToNextAct, setHelpText]
  );

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
        ma: { ...currentCharacters["ma"], room: RoomName.kitchen },
      }));
    }
  }, [gameState.act]);

  const clickOnCharacter = useCallback(
    (characterName: CharacterName) => {
      applyInteraction(
        clickOnCharacterInteraction(
          characterName,
          items,
          characters,
          currentItem,
          gameState
        )
      );
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
    setSubs,
    resetWholeGame,
    setCurrentRoom,
    isAllMuted,
    setIsAllMuted,
  };
};
