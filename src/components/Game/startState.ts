import { RoomName } from "../../rooms/rooms";
import { AvailableWays, Character, CharacterName, Game, Item } from "./types";

interface StartState {
  game: Game;
  currentRoom: RoomName;
  availableWays: AvailableWays;
  characters: Character[];
  items: Item[];
  currentItem: Item | null;
}

export const startState: StartState = {
  game: {
    act: 1,
    currentRoom: RoomName.living,
    status: {
      upstairsIsBlockedByMa: true,
      atticIsHidden: true,
      basementIsLocked: true,
    },
    helpText: "",
  },
  availableWays: {
    up: false,
    down: false,
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
    {
      id: "letter",
      isActive: true,
      isVisible: true,
      room: RoomName.living,
      roomPosition: {
        x: 0,
        y: 0,
      },
    },
  ],
};
