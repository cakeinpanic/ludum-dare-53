import { RoomName } from "../rooms/rooms";
import { CharacterName, CharactersCollection } from "../components/Game/types";
import character from "./character.png";
import mama from "./mama.png";
import sister from "./sister.png";
import father from "./father.png";
import uncle from "./uncle.png";
import ghost from "./ghost.png";

export const characters: CharactersCollection = Object.freeze({
  [CharacterName.ma]: {
    name: CharacterName.ma,
    room: RoomName.living,
    sprite: mama,
    description: "Mother",
    roomPosition: {
      shiftX: -150,
      shiftY: -30,
    },
    size: {
      height: 250,
      width: 140,
    },
  },

  [CharacterName.uncle]: {
    name: CharacterName.uncle,
    room: RoomName.attick,
    description: "Uncle",
    sprite: uncle,
    roomPosition: {
      shiftX: -170,
      shiftY: -50,
    },
    size: {
      height: 300,
      width: 150,
    },
  },
  [CharacterName.sister]: {
    name: CharacterName.sister,
    room: RoomName.kitchen,
    sprite: sister,
    description: "Elder sister",
    roomPosition: {
      shiftX: -300,
      shiftY: 0,
    },
  },
  [CharacterName.pa]: {
    name: CharacterName.pa,
    room: RoomName.library,
    sprite: father,
    description: "Father",
    roomPosition: {
      shiftX: -200,
      shiftY: -100,
    },
    size: {
      height: 300,
      width: 140,
    },
  },
  [CharacterName.ghost]: {
    name: CharacterName.ghost,
    room: null,
    sprite: ghost,
    description: "Small ghost",
    roomPosition: {
      shiftX: -200,
      shiftY: 0,
    },
    size: {
      height: 200,
      width: 200,
    },
  },
  [CharacterName.main]: {
    name: CharacterName.main,
    sprite: character,
    description: `It's you`,
  },
});
