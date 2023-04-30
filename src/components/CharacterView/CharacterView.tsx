import React, { ComponentProps, memo } from 'react';
import { SpriteAnimator } from 'react-sprite-animator';
import { calculatePositionForSomething } from '../../rooms/rooms';
import { Character, CharacterName } from '../Game/types';

import styles from './CharacterView.module.scss';

const defaultShit = { shiftX: -100, shiftY: 0 };

function _CharacterView({
                            character,
                            scale,
                            ...props
                        }: { character: Character; scale: number } & ComponentProps<typeof SpriteAnimator>) {
    const { room, sprite, roomPosition, name } = character;
    // const top: number = character.roomPosition.y;
    // const left: number = character.roomPosition.x;
    const position =
        name === CharacterName.main
            ? calculatePositionForSomething(room, scale)
            : calculatePositionForSomething(room, scale, roomPosition || defaultShit);

    return (
        <div className={styles.Hero} style={{ ...position }}>
            {sprite ? (
                <SpriteAnimator
                    className={styles.sprite}
                    sprite={sprite}
                    fps={10}
                    width={62}
                    height={50}
                />
            ) : (
                <div className={styles.debug}>
                    <span className={styles.name}>{name}</span>{' '}
                </div>
            )}
        </div>
    );
}

export const CharacterView = memo(_CharacterView);
