import { RoomName } from "../../rooms/rooms";
import { CharacterName, CharactersCollection } from "./types";

export const characters: CharactersCollection = {
  [CharacterName.ma]: {
    name: CharacterName.ma,
    room: RoomName.living,
    roomPosition: {
      shiftX: -100,
      shiftY: 0,
    },
  },
  [CharacterName.uncle]: {
    name: CharacterName.uncle,
    room: RoomName.attick,
    roomPosition: {
      shiftX: -200,
      shiftY: 0,
    },
  },
  [CharacterName.sister]: {
    name: CharacterName.sister,
    room: RoomName.kitchen,
    roomPosition: {
      shiftX: -200,
      shiftY: 0,
    },
  },
};
