import React, { ComponentProps, memo } from "react";
import { SpriteAnimator } from "react-sprite-animator";
import { calculatePositionForSomething } from "../../rooms/rooms";
import { Character, CharacterName } from "../Game/types";

import styles from "./CharacterView.module.scss";

const defaultShit = { shiftX: -100, shiftY: 0 };
const defaultMainShift = { shiftX: 0, shiftY: 0 };

function _CharacterView({
  character,
  scale,
  ...props
}: { character: Character; scale: number } & ComponentProps<
  typeof SpriteAnimator
>) {
  const { room, size, sprite, roomPosition, name, isDead } = character;

  if (room === null) return <></>;
  const position = calculatePositionForSomething(
    room,
    scale,

    roomPosition ||
      (name === CharacterName.main ? defaultMainShift : defaultShit)
  );

  return (
    <div
      id={character.name}
      className={styles.Hero + " " + (isDead ? styles.dead : "")}
      style={{ ...position, ...(size || {}) }}
      {...props}
    >
      {sprite ? (
        <img className={styles.sprite} src={sprite} />
      ) : (
        //<SpriteAnimator
        //  className={styles.sprite}
        //  sprite={sprite}
        //  fps={10}
        //  width={62}
        //  height={50}
        ///>
        <div className={styles.debug}>
          <span className={styles.name}>{name}</span>{" "}
        </div>
      )}
      <div className={styles.tooltip}>
        {character.description || character.name}
      </div>
    </div>
  );
}

export const CharacterView = memo(_CharacterView);
