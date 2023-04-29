import React, { useCallback, useEffect } from "react";
import {
  getRoomCoordinates,
  getTileCoordinates,
  IRoom,
  moveFromRoom,
  RoomName,
  ROOMS,
} from "../../rooms/rooms";
import { Hero, HeroName } from "../Hero/Hero";
import { House } from "../House/House";
import styles from "./Game.module.scss";

const MAX_SCALE = 5;

export function Game() {
  const [currentRoom, setCurrentRoom] = React.useState<RoomName>(
    RoomName.living
  );
  const [heroPosition, setHeroPosition] = React.useState<{
    left: number;
    top: number;
  }>({ left: 0, top: 0 });
  const [motherPosition, setMotherPosition] = React.useState<{
    left: number;
    top: number;
  }>({ left: 0, top: 0 });
  const [fatherPosition, setFatherosition] = React.useState<{
    left: number;
    top: number;
  }>({ left: 0, top: 0 });
  const [debugMode, setDebugMode] = React.useState<boolean>(false);
  const [scale, setScale] = React.useState(MAX_SCALE);

  const calculatePositionForAHero = useCallback(
    (room: RoomName, { shiftX, shiftY } = { shiftX: 0, shiftY: 0 }) => {
      const { left, top, width, height } = getRoomCoordinates(room);
      return {
        left: (left + width / 2) * scale - 20 + shiftX,
        top: (top + height / 2) * scale - 20 + shiftY,
      };
    },
    [scale]
  );

  const moveOnMap = useCallback(
    (e) => {
      const coordinates = { x: 0, y: 0 };

      if (e.key === "s" || e.key === "ArrowDown") {
        coordinates.y = 1;
        e.preventDefault();
      }
      if (e.key === "a" || e.key === "ArrowLeft") {
        coordinates.x = -1;
        e.preventDefault();
      }
      if (e.key === "d" || e.key === "ArrowRight") {
        coordinates.x = 1;
        e.preventDefault();
      }
      if (e.key === "w" || e.key === "ArrowUp") {
        coordinates.y = -1;
        e.preventDefault();
      }

      const newRoom = moveFromRoom(currentRoom, coordinates);
      console.log(currentRoom, newRoom);
      setCurrentRoom(newRoom);
    },
    [currentRoom, setCurrentRoom]
  );

  useEffect(() => {
    document.addEventListener("keydown", moveOnMap);
    return () => {
      document.removeEventListener("keydown", moveOnMap);
    };
  }, [moveOnMap]);

  useEffect(() => {
    const shift = { shiftX: -100, shiftY: 0 };
    setMotherPosition(calculatePositionForAHero(RoomName.living, shift));
    setFatherosition(calculatePositionForAHero(RoomName.attick, shift));
  }, [scale]);

  useEffect(() => {
    console.log(currentRoom);
    setHeroPosition(calculatePositionForAHero(currentRoom));
  }, [currentRoom, scale]);

  return (
    <div className={styles.game}>
      <House
        scale={scale}
        setScale={setScale}
        className={styles.house}
        setCurrentRoom={setCurrentRoom}
        currentRoom={currentRoom}
      />
      <Hero
        name={HeroName.main}
        style={{ left: heroPosition.left, top: heroPosition.top }}
      />
      <Hero
        name={HeroName.mother}
        style={{ left: motherPosition.left, top: motherPosition.top }}
      />
      <Hero
        name={HeroName.father}
        style={{ left: fatherPosition.left, top: fatherPosition.top }}
      />
      <div
        className={styles.zoom + " " + (scale === MAX_SCALE ? styles.out : "")}
        onClick={() =>
          scale === MAX_SCALE ? setScale(2) : setScale(MAX_SCALE)
        }
      >
        -
      </div>
    </div>
  );
}
