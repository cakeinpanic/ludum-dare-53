import { RoomName } from "../rooms/rooms";
import { CharacterName, CharactersCollection } from "../components/Game/types";
import character from "./character.png";
import mama from "./mama.png";
import sister from "./sister.png";

export const characters: CharactersCollection = {
  [CharacterName.ma]: {
    name: CharacterName.ma,
    room: RoomName.living,
    sprite: mama,
    description: "mother, she looks nervous and tired",
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
    description: "Elder sister, her haughty grin never leaves her face",
    roomPosition: {
      shiftX: -200,
      shiftY: 0,
    },
  },
  [CharacterName.pa]: {
    name: CharacterName.pa,
    room: RoomName.library,
    description: "Father, always in his thoughts",
    roomPosition: {
      shiftX: -200,
      shiftY: 0,
    },
  },
  [CharacterName.ghost]: {
    name: CharacterName.ghost,
    room: null,
    description: "???",
    roomPosition: {
      shiftX: -200,
      shiftY: 0,
    },
  },
  [CharacterName.main]: {
    name: CharacterName.main,
    sprite: character,
    description: `I'm Luntik`, // I born
  },
};
