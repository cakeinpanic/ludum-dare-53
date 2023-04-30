import { RoomName } from "../../rooms/rooms";
import { items } from "./items";
import {
  AvailableWays,
  Character,
  CharacterName,
  Game,
  Item,
  ItemName,
} from "./types";

interface StartState {
  game: Game;
  availableWays: AvailableWays;
  characters: Character[];
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
    },
    helpText: "Help text for debug",
  },
  availableWays: {
    up: true,
    down: true,
    left: false,
    right: false,
  },
  characters: [
    {
      name: CharacterName.ma,
      room: RoomName.living,
      roomPosition: {
        x: 0,
        y: 0,
      },
    },
    {
      name: CharacterName.uncle,
      room: RoomName.attick,
      roomPosition: {
        x: 0,
        y: 0,
      },
    },
  ],
  items: items,
  currentItem: items[ItemName.letter],
};
