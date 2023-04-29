import React, { ComponentProps, memo, useEffect } from "react";
import { SpriteAnimator } from "react-sprite-animator";
import bird from "./bird.png";
import styles from "./CharacterView.module.scss";
import { Character, CharacterName } from "../Game/types";
import { RoomName, getRoomCoordinates } from "../../rooms/rooms";

const calculatePositionForAHero = (
  room: RoomName,
  scale: number,
  { shiftX, shiftY } = { shiftX: 0, shiftY: 0 }
) => {
  const { left, top, width, height } = getRoomCoordinates(room);
  return {
    left: (left + width / 2) * scale - 20 + shiftX,
    top: (top + height / 2) * scale - 20 + shiftY,
  };
};

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
      ? calculatePositionForAHero(room, scale)
      : calculatePositionForAHero(room, scale, shift);

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
