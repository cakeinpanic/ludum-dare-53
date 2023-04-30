import {
  AvailableWays,
  CharactersCollection,
  Item,
  ItemName,
  ItemsCollection,
} from "../components/Game/types";
import attick from "./attick.jpg";
import basement from "./basement.jpg";
import bedroom from "./bedroom.jpg";
import kitchen from "./kitchen.jpg";
import library from "./library.jpg";
import living from "./living.jpg";
import yard from "./yard.jpg";

export const scale = 1;

export const shiftX = 0;
export const shiftY = 0;
export const H = 500;

export const gap = 0;

export enum RoomName {
  cabinet = "cabinet",
  library = "library",
  yard = "yard",
  kitchen = "kitchen",
  bedroom = "bedroom",
  living = "living",
  basement = "basement",
  attick = "attick",
  none = "none",
}

export interface IRoom {
  img: string;
  left: number;
  top: number;
  width: number;
  height: number;
}

export const roomPositions: RoomName[][] = [
  [RoomName.none, RoomName.none, RoomName.attick],
  [RoomName.none, RoomName.library, RoomName.bedroom],
  [RoomName.yard, RoomName.living, RoomName.kitchen],
  [RoomName.none, RoomName.none, RoomName.basement],
];

export const calculatePositionForSomething = (
  room: RoomName,
  scale: number,
  { shiftX, shiftY } = { shiftX: 0, shiftY: 0 }
) => {
  const { left, top, width, height } = getRoomCoordinates(room);
  return {
    left: (left + width / 2) * scale - 20 + shiftX,
    top: (top + height / 2) * scale - 20 + shiftY,
  };
};

export const getTileCoordinates = (
  roomName: RoomName
): { x: number; y: number } => {
  const y = roomPositions.findIndex((row) => row.includes(roomName));
  const x = roomPositions[y].findIndex((r) => r === roomName);
  return { x, y };
};

export const getRoomCoordinates = (
  roomName: RoomName,
  { x, y } = { x: 0, y: 0 }
): { left: number; top: number; width: number; height: number } => {
  const height = H;
  const width = H * 2;

  if (roomName !== RoomName.none) {
    x = getTileCoordinates(roomName).x;
    y = getTileCoordinates(roomName).y;
  }

  const left = x * (width + gap);
  const top = y * (H + gap);

  return { left: left, top: top, width: width, height: height };
};

export const moveFromRoom = (
  currentRoom: RoomName,
  direction: keyof AvailableWays,
  characters: CharactersCollection,
  items: ItemsCollection,
  currentItem: Item
) => {
  if (
    currentRoom === RoomName.living &&
    characters["ma"].room === RoomName.living &&
    direction === "up"
  ) {
    return false;
  }
  if (currentRoom === RoomName.kitchen && direction === "up") {
    return false;
  }
  if (
    currentRoom === RoomName.kitchen &&
    direction === "down" &&
    currentItem?.id !== ItemName.key
  ) {
    return false;
  }
  let { x, y } = { x: 0, y: 0 };
  if (direction === "up") {
    y = -1;
  }
  if (direction === "down") {
    y = 1;
  }
  if (direction === "left") {
    x = -1;
  }
  if (direction === "right") {
    x = 1;
  }

  const { x: x1, y: y1 } = getTileCoordinates(currentRoom);

  const { x: x2, y: y2 } = { x: x1 + x, y: y1 + y };

  const room = roomPositions[y2]?.[x2];

  if (room && room !== RoomName.none) {
    return room;
  }
  return false;
};

export const ROOMS: { [key: string]: IRoom } = {
  [RoomName.library]: {
    img: library,
    ...getRoomCoordinates(RoomName.library),
  },
  [RoomName.living]: {
    img: living,
    ...getRoomCoordinates(RoomName.living),
  },
  [RoomName.bedroom]: {
    img: bedroom,
    ...getRoomCoordinates(RoomName.bedroom),
  },
  [RoomName.yard]: {
    img: yard,
    ...getRoomCoordinates(RoomName.yard),
  },
  [RoomName.kitchen]: {
    img: kitchen,
    ...getRoomCoordinates(RoomName.kitchen),
  },
  [RoomName.basement]: {
    img: basement,
    ...getRoomCoordinates(RoomName.basement),
  },
  [RoomName.attick]: {
    img: attick,
    ...getRoomCoordinates(RoomName.attick),
  },
};

Object.keys(ROOMS).forEach((roomName) => {
  const room = ROOMS[roomName];
  room.left = room.left * scale + shiftX;
  room.top = room.top * scale + shiftY;
  room.width = room.width * scale;
  room.height = room.height * scale;
});
