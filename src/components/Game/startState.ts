import { RoomName } from "../../rooms/rooms";
import { AvailableWays, Character, CharacterName, Game, Item } from "./types";

interface StartState {
  game: Game;
  availableWays: AvailableWays;
  characters: Character[];
  items: Item[];
  currentItem: Item | null;
}

const Letter: Item =  {
    id: "letter",
    isActive: true,
    isVisible: true,
    room: RoomName.living,
    roomPosition: {
      x: 0,
      y: 0,
    },
  };

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
  items: [
    Letter,
  ],
  currentItem: Letter,
};
