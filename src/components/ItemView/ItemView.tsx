import React, { ComponentProps, memo } from "react";
import { SpriteAnimator } from "react-sprite-animator";
import { calculatePositionForSomething, RoomName } from "../../rooms/rooms";
import { CharacterName, Item } from "../Game/types";
import styles from "./ItemView.module.scss";

const defaultShift = { shiftX: -200, shiftY: 0 };

function _ItemView({
  item,
  scale,
  ...props
}: { item: Item; scale: number } & ComponentProps<typeof SpriteAnimator>) {
  const name = item.id;

  const { room, roomPosition } = item;
  if (!room) {
    return;
  }
  const position = calculatePositionForSomething(
    room,
    scale,
    roomPosition || defaultShift
  );

  return (
    <div className={styles.Item} style={{ ...position }}>
      {item.sprite ? (
        <SpriteAnimator
          className={styles.sprite}
          sprite={item.sprite}
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

export const ItemView = memo(_ItemView);
