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
    description: "An old tree my father and I planted when I was 6",
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
      shiftX: 300,
      shiftY: -35,
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
    description: "Book I cant not recognize",
    sprite: book,
    roomPosition: {
      shiftX: 340,
      shiftY: -30,
    },
    size: {
      width: 60,
      height: 60,
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
      shiftX: 300,
      shiftY: -20,
    },
    size: {
      width: 138,
      height: 248,
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
    isVisible: false,
    collectable: true,
    sprite: blanket,
    room: RoomName.living,
    roomPosition: {
      shiftX: -260,
      shiftY: 70 - 46,
    },
    size: {
      width: 100,
      height: 100,
    },
  },
  [ItemName.recordPlayer]: {
    id: ItemName.recordPlayer,
    isActive: true,
    isVisible: false,
    collectable: false,
    room: RoomName.bedroom,
  },
  [ItemName.secretButton]: {
    id: ItemName.secretButton,
    isActive: true,
    isVisible: false,
    collectable: false,
    room: RoomName.bedroom,
  },
  [ItemName.secretButton]: {
    id: ItemName.secretButton,
    isActive: true,
    isVisible: false,
    collectable: false,
    room: RoomName.bedroom,
  },
  [ItemName.sacrificeCircle]: {
    id: ItemName.sacrificeCircle,
    isActive: true,
    isVisible: false,
    collectable: false,
    room: RoomName.basement,
  },
  [ItemName.paperPile]: {
    id: ItemName.paperPile,
    isActive: true,
    isVisible: false,
    collectable: false,
    room: RoomName.attick,
  },
  [ItemName.knife]: {
    id: ItemName.knife,
    isActive: true,
    isVisible: false,
    collectable: false,
    room: RoomName.attick,
  },
  [ItemName.desk]: {
    id: ItemName.desk,
    isActive: true,
    isVisible: false,
    collectable: false,
    room: RoomName.attick,
  },
};
