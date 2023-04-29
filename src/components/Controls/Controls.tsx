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
  const directions = ["up", "down", "left", "right"];
  console.log(availableWays);
  return (
    <>
      {directions.map((direction) => {
        return (
          <div
            className={
              styles.button +
              " " +
              styles[direction] +
              " " +
              (!availableWays[direction] ? styles.disabled : "")
            }
            onClick={() => {
              move(direction);
            }}
          />
        );
      })}
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
