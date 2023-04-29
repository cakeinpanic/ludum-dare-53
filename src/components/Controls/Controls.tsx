import React, { useEffect } from "react";
import {
  getRoomCoordinates,
  RoomName,
  roomPositions,
  ROOMS,
} from "../../rooms/rooms";
import { useGame } from "../Game/useGame";
import styles from "./Controls.module.scss";

const MAX_SCALE = 5;

export function Controls({ scale, setScale, move, availableWays }) {
  return (
    <>
      {availableWays.up && (
        <div
          className={styles.button + " " + styles.up}
          onClick={() => {
            move("up");
          }}
        />
      )}
      {availableWays.down && (
        <div
          className={styles.button + " " + styles.down}
          onClick={() => {
            move("down");
          }}
        />
      )}
      {availableWays.left && (
        <div
          className={styles.button + " " + styles.left}
          onClick={() => {
            move("left");
          }}
        />
      )}
      {availableWays.right && (
        <div
          className={styles.button + " " + styles.right}
          onClick={() => {
            move("right");
          }}
        />
      )}
      <div
        className={styles.zoom + " " + (scale === MAX_SCALE ? styles.out : "")}
        onClick={() =>
          scale === MAX_SCALE ? setScale(2) : setScale(MAX_SCALE)
        }
      >
        -
      </div>
    </>
  );
}
