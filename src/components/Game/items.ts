import { RoomName } from "../../rooms/rooms";
import { Item, ItemName, ItemsCollection } from "./types";

export const items: ItemsCollection = {
  [ItemName.letter]: {
    id: ItemName.letter,
    isActive: false,
    isVisible: true,
    collectable: true,
    room: RoomName.living,
    roomPosition: {
      x: 0,
      y: 0,
    },
  },
  [ItemName.mailbox]: {
    id: ItemName.mailbox,
    isActive: false,
    isVisible: true,
    collectable: false,
    room: RoomName.yard,
    roomPosition: {
      x: 0,
      y: 0,
    },
  },
  [ItemName.tree]: {
    id: ItemName.tree,
    isActive: false,
    isVisible: true,
    collectable: false,
    room: RoomName.yard,
    roomPosition: {
      x: 0,
      y: 0,
    },
  },
  [ItemName.chest]: {
    id: ItemName.chest,
    isActive: false,
    isVisible: false,
    collectable: false,
    room: RoomName.basement,
    roomPosition: {
      x: 0,
      y: 0,
    },
  },
};
