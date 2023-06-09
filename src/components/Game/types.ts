import { RoomName } from "../../rooms/rooms";

export interface AvailableWays {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
}

export enum CharacterName {
  main = "main",
  ma = "ma",
  pa = "pa",
  uncle = "uncle",
  sister = "sister",
  bird = "bird",
  ghost = "ghost",
}

export interface Character {
  name: CharacterName;
  room: RoomName;
  sprite?: string;
  description?: string;
  isDead?: boolean;
  isSaidHi?: boolean;
  roomPosition?: {
    // maybe just , left , right , center?
    shiftX: number;
    shiftY: number;
  };
  size?: {
    width?: number;
    height?: number;
  };
}

export type ItemsCollection = { [key: ItemName]: Item };

export type CharactersCollection = { [key: CharacterName]: Character };

export enum ItemName {
  dirtPile = "dirtPile",
  photo = "photo",
  bourbon = "bourbon",
  poison = "poison",
  birdCage = "birdCage",
  altar = "altar",
  shovel = "shovel",
  scissors = "scissors",
  letter = "letter",
  key = "key",
  glass = "glass",
  atticKey = "atticKey",
  poisonedDrink = "poisonedDrink",
  basementKey = "basementKey",
  tree = "tree",
  table = "table",
  cabinet = "cabinet",
  vase = "vase",
  book = "book",
  secretButton = "secretButton",
  recordPlayer = "recordPlayer",
  flowers = "flowers",
  blanket = "blanket",
  skull = "skull",
  handcuffs = "handcuffs",
  chest = "chest",
  sacrificeCircle = "sacrificeCircle",
  paperPile = "paperPile",
  desk = "desk",
  knife = "knife",
}

export interface Item {
  id: ItemName;
  isActive: boolean;
  isVisible: boolean;
  collectable: boolean;
  room?: RoomName;
  sprite?: string;
  description?: string;
  roomPosition?: {
    // maybe just , left , right , center
    shiftX: number;
    shiftY: number;
  };
  size?: {
    width: number;
    height: number;
  };
}

export interface Game {
  act: 1 | 2 | 3;
  currentRoom: RoomName;
  status: {
    upstairsIsBlockedByMa: boolean;
    atticIsHidden: boolean;
    basementIsLocked: boolean;
    uncleFollows: boolean;
    gameFinished: boolean;
  };
  helpText?: string;
  subtitles?: string;
}
