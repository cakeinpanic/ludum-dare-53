import living from "./living.png";
import kids from "./kids.png";
import pantry from "./pantry.png";
import library from "./library.png";
import bedroom from "./bedroom.png";
import kitchen from "./kitchen.png";
import yard from "./yard.png";
import basement from "./basement.png";
import attick from "./attick.png";

export const scale = 1.2;

export const shiftX = 160;
export const shiftY = 220;
export const H = 95;

export const gap = 4;

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

export const getTileCoordinates = (
  roomName: RoomName
): { x: number; y: number } => {
    console.log('aaa', roomName)
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
  { x, y } = { x: 0, y: 0 }
) => {
  const { x: x1, y: y1 } = getTileCoordinates(currentRoom);
  console.log("katya");
  const { x: x2, y: y2 } = { x: x1 + x, y: y1 + y };
  console.log(
    "move from",
    currentRoom,
    " on ",
    { x, y },
    "result",
    { x1, y1 },
    "into",
    { x2, y2 }
  );
  const room = roomPositions[y2]?.[x2];

  if (room && room !== RoomName.none) {
    return room;
  }
  return currentRoom;
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
