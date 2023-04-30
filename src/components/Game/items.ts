import { RoomName } from "../../rooms/rooms";
import { Item, ItemName, ItemsCollection } from "./types";

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
    roomPosition: {
      shiftX: 200,
      shiftY: 80,
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
};
