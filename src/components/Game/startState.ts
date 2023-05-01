import { characters } from "../../characters/characters";
import { items } from "../../items/items";
import { RoomName } from "../../rooms/rooms";
import {
  AvailableWays,
  CharactersCollection,
  Game,
  Item,
  ItemName,
} from "./types";

interface StartState {
  game: Game;
  availableWays: AvailableWays;
  characters: CharactersCollection;
  items: { [key: ItemName]: Item };
  currentItem: Item | null;
}

export const startState: StartState = {
  game: {
    act: 1,
    currentRoom: RoomName.yard,
    status: {
      upstairsIsBlockedByMa: true,
      atticIsHidden: true,
      basementIsLocked: true,
      uncleFollows: false,
      gameFinished: false,
    },
    subtitles: "You have arrived to your parents house",
  },
  availableWays: {
    up: true,
    down: true,
    left: false,
    right: false,
  },
  characters: characters,
  items: items,
  currentItem: items[ItemName.letter],
};
