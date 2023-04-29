import React, { useEffect } from "react";
import {
  getRoomCoordinates,
  RoomName,
  roomPositions,
  ROOMS,
} from "../../rooms/rooms";
import styles from "./Controls.module.scss";

const MAX_SCALE = 5;

export function Controls({ scale, setScale }) {
  return (
    <>
      <div className={styles.button + " " + styles.up} />
      <div className={styles.button + " " + styles.down} />
      <div className={styles.button + " " + styles.left} />
      <div className={styles.button + " " + styles.right} />
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
