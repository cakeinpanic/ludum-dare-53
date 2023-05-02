import React, { useEffect, useState } from "react";
import {
  getRoomCoordinates,
  RoomName,
  roomPositions,
  ROOMS,
} from "../../rooms/rooms";
import styles from "./House.module.scss";

export function House({
  currentRoom,
  setCurrentRoom,
  scale,
  setScale,
  ...props
}) {
  const zoom = (e: MouseEvent, room: RoomName) => {
    setCurrentRoom(room);
  };
  const [roomToRender, setRoomToRender] = useState<RoomName[]>([]);
  useEffect(() => {
    requestAnimationFrame(() =>
      document.getElementById(currentRoom)?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      })
    );
  }, [currentRoom, scale]);

  useEffect(() => {
    switch (currentRoom) {
      case RoomName.bedroom:
        setRoomToRender([RoomName.library, RoomName.attick]);
        break;
      case RoomName.library:
        setRoomToRender([RoomName.bedroom, RoomName.living]);
        break;
      case RoomName.living:
        setRoomToRender([RoomName.library, RoomName.yard, RoomName.kitchen]);
        break;
      case RoomName.yard:
        setRoomToRender([RoomName.living]);
        break;
      case RoomName.kitchen:
        setRoomToRender([RoomName.living, RoomName.basement]);
        break;
      case RoomName.basement:
        setRoomToRender([RoomName.kitchen]);
        break;
      case RoomName.attick:
        setRoomToRender([RoomName.bedroom]);
        break;
    }
  }, [currentRoom]);

  return (
    <div className={props.className + " " + styles.House}>
      {roomPositions.map((rooms: RoomName[], y: number) =>
        rooms.map((room: RoomName, x: number) => {
          const img = ROOMS[room]?.img;
          const { height, width, left, top } = getRoomCoordinates(room, {
            x,
            y,
          });

          return (
            <div
              key={"room" + room + x + y}
              className={
                styles.img + " " + (room === currentRoom ? styles.active : "")
              }
              style={{
                left: left * scale,
                top: top * scale,
                width: width * scale,
                height: height * scale,
                display:
                  currentRoom === room || roomToRender.includes(room)
                    ? "block"
                    : "none",
              }}
            >
              <img id={room} onClick={(e) => zoom(e, room)} src={img} />
            </div>
          );
        })
      )}
    </div>
  );
}
