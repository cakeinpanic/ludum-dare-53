import React from 'react';
import styles from './Hero.module.scss';
import { SpriteAnimator } from 'react-sprite-animator'
import bird from './bird.png'
export function Hero() {
    return (
        <div className={styles.Hero}>
            <SpriteAnimator
                sprite={bird}
                fps={10}
                width={62}
                height={50}
            />
        </div>

    );
};

