import { useCallback, useEffect, useState } from "react";
import { RoomName } from "../../rooms/rooms";
import { AvailableWays, Character, Game, Item } from "./types";
import { startState } from "./startState";

interface useGameReturn {
  gameState: Game;
  availableWays: AvailableWays;
  characters: Character[];
  items: Item[];
  currentItem: Item | null;

  clickOnItem: (item: Item["id"]) => boolean;
  clickOnCharacter: (character: Character["name"]) => void;
  move: (direction: keyof AvailableWays) => void;
}
export const useGame = (): useGameReturn => {
  const [gameState, setGameState] = useState<Game>(startState.game);

  const [availableWays, setAvailableWays] = useState<AvailableWays>(
    startState.availableWays
  );

  const [characters, setCharacters] = useState<Character[]>(
    startState.characters
  );
  const [items, setItems] = useState<Item[]>(startState.items);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  const move = useCallback((direction: keyof AvailableWays) => {}, []);

  const clickOnItem = useCallback((item: Item["id"]) => {
    return false;
  }, []);

  const clickOnCharacter = useCallback((character: Character["name"]) => {},
  []);
  //   const teleport = useCallback((room: RoomName) => {}, []);

  return {
    gameState,
    availableWays,
    characters,
    items,
    currentItem,
    clickOnItem,
    clickOnCharacter,
    move,
  };
};