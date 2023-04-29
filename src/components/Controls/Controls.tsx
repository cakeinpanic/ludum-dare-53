import React from "react";
import styles from "./Controls.module.scss";

export const MAX_SCALE = 1;
export const MIN_SCALE = 0.5;
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
          scale === MAX_SCALE ? setScale(MIN_SCALE) : setScale(MAX_SCALE)
        }
      >
        -
      </div>
    </>
  );
}
