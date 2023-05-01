import React, { useCallback, useEffect } from "react";
import { AvailableWays } from "../Game/types";

import styles from "./Controls.module.scss";
import { debounce, throttle } from "lodash";

export function Controls({ scale, setScale, move, availableWays }) {
  const directions = ["up", "down", "left", "right"];
  const debounceMove = useCallback(throttle(move, 2000, { heading: true }), [
    move,
  ]);

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
        debounceMove(direction);
      }
    },
    [debounceMove]
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
            key={direction}
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
    </>
  );
}
