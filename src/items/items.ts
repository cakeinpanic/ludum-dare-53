import { RoomName } from "../rooms/rooms";
import { ItemName, ItemsCollection } from "../components/Game/types";
import flowers from "./flowers.png";
import pile from "./pile.png";
import tree from "./tree.png";
import blanket from "./blanket.png";
import vase from "./vase.png";
import book from "./book.png";
import birdCage from "./birdCage.png";
import shovel from "./shovel.png";
import altar from "./altar.png";
import photo from "./photo.png";
import bourbon from "./bourbon.png";
import poison from "./poison.png";
import table from "./table.png";
import { getText } from "../interactions/texts";

export const items: ItemsCollection = {
  [ItemName.letter]: {
    id: ItemName.letter,
    isActive: true,
    isVisible: true,
    collectable: true,
  },
  [ItemName.tree]: {
    id: ItemName.tree,
    isActive: true,
    isVisible: true,
    collectable: false,
    room: RoomName.yard,
    description: getText("6"),
    sprite: tree,
    roomPosition: {
      shiftX: 97 - 480 - 87 - 30 - 10,
      shiftY: 945 - 1230,
    },
    size: {
      width: 764,
      height: 496,
    },
  },
  [ItemName.vase]: {
    id: ItemName.vase,
    isActive: true,
    isVisible: true,
    collectable: false,
    room: RoomName.kitchen,
    description: "Flower vase",
    sprite: vase,
    roomPosition: {
      shiftX: -100,
      shiftY: -10,
    },
    size: {
      width: 100,
      height: 100,
    },
  },
  [ItemName.photo]: {
    id: ItemName.photo,
    isActive: true,
    isVisible: true,
    collectable: false,
    room: RoomName.kitchen,
    description: "Family portrait, one face is missing",
    sprite: photo,
    roomPosition: {
      shiftX: 250,
      shiftY: -50,
    },
    size: {
      width: 100,
      height: 100,
    },
  },
  [ItemName.book]: {
    id: ItemName.book,
    isActive: true,
    isVisible: true,
    collectable: false,
    room: RoomName.library,
    description: "Book I can't not recognize",
    sprite: book,
    roomPosition: {
      shiftX: 370,
      shiftY: -37,
    },
    size: {
      width: 90,
      height: 90,
    },
  },
  [ItemName.bourbon]: {
    id: ItemName.bourbon,
    isActive: true,
    isVisible: true,
    collectable: false,
    room: RoomName.library,
    description: "Bottle of good bourbon",
    sprite: bourbon,
    roomPosition: {
      shiftX: -380,
      shiftY: 65,
    },
    size: {
      width: 100,
      height: 100,
    },
  },

  [ItemName.dirtPile]: {
    id: ItemName.dirtPile,
    isActive: true,
    isVisible: false,
    collectable: false,
    room: RoomName.yard,
    description: "A pile of dirt",
    sprite: pile,
    roomPosition: {
      shiftX: -20,
      shiftY: 130,
    },
    size: {
      width: 130,
      height: 100,
    },
  },
  [ItemName.chest]: {
    id: ItemName.chest,
    isActive: true,
    isVisible: false,
    collectable: false,
    room: RoomName.basement,
    roomPosition: {
      shiftX: 0,
      shiftY: 0,
    },
  },
  [ItemName.table]: {
    id: ItemName.table,
    isActive: true,
    isVisible: false,
    collectable: false,
    room: RoomName.living,
  },
  [ItemName.cabinet]: {
    id: ItemName.cabinet,
    isActive: true,
    isVisible: false,
    collectable: false,
    room: RoomName.living,
    roomPosition: {
      shiftX: 250,
      shiftY: -40,
    },
  },

  [ItemName.birdCage]: {
    id: ItemName.birdCage,
    isActive: true,
    isVisible: true,
    collectable: false,
    sprite: birdCage,
    description: "Bird, I taught her to say a few phrases long time ago",
    room: RoomName.bedroom,
    roomPosition: {
      shiftX: 70,
      shiftY: -30,
    },
    size: {
      width: 230,
      height: 230,
    },
  },
  [ItemName.shovel]: {
    id: ItemName.shovel,
    isActive: true,
    isVisible: true,
    collectable: true,
    sprite: shovel,
    description: "Rusty shovel",
    room: RoomName.basement,
    roomPosition: {
      shiftX: -90,
      shiftY: -20,
    },
    size: {
      width: 138,
      height: 248,
    },
  },
  [ItemName.poison]: {
    id: ItemName.poison,
    isActive: true,
    isVisible: true,
    collectable: false,
    sprite: poison,
    description: "Rat poison",
    room: RoomName.basement,
    roomPosition: {
      shiftX: 50,
      shiftY: -160,
    },
    size: {
      width: 100,
      height: 100,
    },
  },
  [ItemName.poisonedDrink]: {
    id: ItemName.poisonedDrink,
    isActive: true,
    isVisible: false,
    collectable: false,
    description: "Poisoned bourbon",
  },
  [ItemName.altar]: {
    id: ItemName.altar,
    isActive: true,
    isVisible: true,
    collectable: false,
    sprite: altar,
    description: "WTH is this, human sacrifice??",
    room: RoomName.basement,
    roomPosition: {
      shiftX: 200,
      shiftY: -70,
    },
    size: {
      width: 300,
      height: 300,
    },
  },
  [ItemName.flowers]: {
    id: ItemName.flowers,
    isActive: true,
    isVisible: true,
    collectable: true,
    sprite: flowers,
    room: RoomName.yard,
    roomPosition: {
      shiftX: 210,
      shiftY: 70,
    },
    size: {
      width: 100,
      height: 100,
    },
  },
  [ItemName.skull]: {
    id: ItemName.skull,
    isActive: true,
    isVisible: false,
    collectable: true,
  },
  [ItemName.scissors]: {
    id: ItemName.scissors,
    isActive: true,
    isVisible: false,
    collectable: true,
  },
  [ItemName.key]: {
    id: ItemName.key,
    isActive: true,
    isVisible: false,
    collectable: true,
  },
  [ItemName.blanket]: {
    id: ItemName.blanket,
    isActive: true,
    isVisible: true,
    collectable: false,
    sprite: blanket,
      description: "This blanket is hovering something...",
    room: RoomName.bedroom,
    roomPosition: {
      shiftX: 40,
      shiftY: -30,
    },
    size: {
      width: 300,
      height: 300,
    },
  },
  [ItemName.table]: {
    id: ItemName.table,
    isActive: true,
    isVisible: true,
    collectable: false,
    room: RoomName.attick,
    description: "Desk with paper and pen",
    sprite: table,
    roomPosition: {
      shiftX: -439,
      shiftY: -85,
    },
    size: {
      width: 336,
      height: 300,
    },
  },
};
