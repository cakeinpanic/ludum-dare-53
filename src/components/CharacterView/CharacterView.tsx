import React, { ComponentProps, memo } from "react";
import { SpriteAnimator } from "react-sprite-animator";
import { calculatePositionForSomething, RoomName } from "../../rooms/rooms";
import { Character, CharacterName } from "../Game/types";
import bird from "./bird.png";
import styles from "./CharacterView.module.scss";

const shift = { shiftX: -100, shiftY: 0 };

const SPRITES = {
  [CharacterName.main]: bird,
};

function _CharacterView({
  character,
  scale,
  ...props
}: { character: Character; scale: number } & ComponentProps<
  typeof SpriteAnimator
>) {
  const name = character.name;

  const room: RoomName = character.room;
  // const top: number = character.roomPosition.y;
  // const left: number = character.roomPosition.x;
  const position =
    name === CharacterName.main
      ? calculatePositionForSomething(room, scale)
      : calculatePositionForSomething(room, scale, shift);

  return (
    <div className={styles.Hero} style={{ ...position }}>
      {SPRITES[name] ? (
        <SpriteAnimator
          className={styles.sprite}
          sprite={SPRITES[name]}
          fps={10}
          width={62}
          height={50}
        />
      ) : (
        <div className={styles.debug}>
          <span className={styles.name}>{name}</span>{" "}
        </div>
      )}
    </div>
  );
}

export const CharacterView = memo(_CharacterView);
