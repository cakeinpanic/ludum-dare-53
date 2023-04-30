import React, { useCallback, useEffect } from "react";
import { AvailableWays } from "../Game/types";
import { MAX_SCALE, MIN_SCALE } from "../Game/useGame";
import styles from "./Controls.module.scss";

export function Controls({ scale, setScale, move, availableWays }) {
  const directions = ["up", "down", "left", "right"];
  const moveOnMap = useCallback(
    (e) => {
      let direction: keyof AvailableWays | undefined;

      if (e.key === "s" || e.key === "ArrowDown") {
        direction = "down";
        e.preventDefault();
      }
      if (e.key === "a" || e.key === "ArrowLeft") {
        direction = "left";
        e.preventDefault();
      }
      if (e.key === "d" || e.key === "ArrowRight") {
        direction = "right";
        e.preventDefault();
      }
      if (e.key === "w" || e.key === "ArrowUp") {
        direction = "up";
        e.preventDefault();
      }
      if (direction) {
        move(direction);
      }
    },
    [move]
  );

  useEffect(() => {
    document.addEventListener("keydown", moveOnMap);
    return () => {
      document.removeEventListener("keydown", moveOnMap);
    };
  }, [moveOnMap]);

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
          scale === MAX_SCALE ? setScale(MIN_SCALE) : setScale(MAX_SCALE)
        }
      >
        -
      </div>
    </>
  );
}
