import { RoomName } from "../../rooms/rooms";
import { CharacterName, CharactersCollection } from "./types";

import mama from "../CharacterView/mama.png";
import sister from "../CharacterView/sister.png";
export const characters: CharactersCollection = {
  [CharacterName.ma]: {
    name: CharacterName.ma,
    room: RoomName.living,
    sprite: mama,
    description: "My mama who I love very much",
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
    sprite: sister,
    description: "Oh, siiister, my siiister, don't you want to dance with me?",
    roomPosition: {
      shiftX: -200,
      shiftY: 0,
    },
  },
};
