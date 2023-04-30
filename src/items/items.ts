import { RoomName } from "../rooms/rooms";
import { Item, ItemName, ItemsCollection } from "../components/Game/types";
import birdCage from "./birdCage.png";
import mailbox from "./mailbox.png";

export const items: ItemsCollection = {
  [ItemName.letter]: {
    id: ItemName.letter,
    isActive: false,
    isVisible: true,
    collectable: true,
  },
  [ItemName.mailbox]: {
    id: ItemName.mailbox,
    isActive: false,
    isVisible: true,
    collectable: false,
    room: RoomName.yard,
    sprite: mailbox,
    roomPosition: {
      shiftX: 200,
      shiftY: -80,
    },
    size: {
      width: 130,
      height: 260,
    },
  },
  [ItemName.tree]: {
    id: ItemName.tree,
    isActive: false,
    isVisible: true,
    collectable: false,
    room: RoomName.yard,
    roomPosition: {
      shiftX: -300,
      shiftY: 0,
    },
  },
  [ItemName.chest]: {
    id: ItemName.chest,
    isActive: false,
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
    isActive: false,
    isVisible: true,
    collectable: false,
    room: RoomName.living,
  },
  [ItemName.cabinet]: {
    id: ItemName.cabinet,
    isActive: false,
    isVisible: true,
    collectable: false,
    room: RoomName.living,
    roomPosition: {
      shiftX: 250,
      shiftY: -40,
    },
  },
  [ItemName.birdCage]: {
    id: ItemName.birdCage,
    isActive: false,
    isVisible: true,
    collectable: false,
    sprite: birdCage,
    room: RoomName.kitchen,
    roomPosition: {
      shiftX: 200,
      shiftY: -100,
    },
    size: {
      width: 150,
      height: 150,
    },
  },
  [ItemName.bar]: {
    id: ItemName.bar,
    isActive: false,
    isVisible: false,
    collectable: false,
    room: RoomName.kitchen,
  },
  [ItemName.recordPlayer]: {
    id: ItemName.recordPlayer,
    isActive: false,
    isVisible: false,
    collectable: false,
    room: RoomName.bedroom,
  },
  [ItemName.secretButton]: {
    id: ItemName.secretButton,
    isActive: false,
    isVisible: false,
    collectable: false,
    room: RoomName.bedroom,
  },
  [ItemName.secretButton]: {
    id: ItemName.secretButton,
    isActive: false,
    isVisible: false,
    collectable: false,
    room: RoomName.bedroom,
  },
  [ItemName.sacrificeCircle]: {
    id: ItemName.sacrificeCircle,
    isActive: false,
    isVisible: false,
    collectable: false,
    room: RoomName.basement,
  },
  [ItemName.paperPile]: {
    id: ItemName.paperPile,
    isActive: false,
    isVisible: false,
    collectable: false,
    room: RoomName.attick,
  },
  [ItemName.knife]: {
    id: ItemName.knife,
    isActive: false,
    isVisible: false,
    collectable: false,
    room: RoomName.attick,
  },
  [ItemName.desk]: {
    id: ItemName.desk,
    isActive: false,
    isVisible: false,
    collectable: false,
    room: RoomName.attick,
  },
};
