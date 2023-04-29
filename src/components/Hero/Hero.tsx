import React, { ComponentProps } from 'react';
import styles from './Hero.module.scss';
import { SpriteAnimator } from 'react-sprite-animator'
import bird from './bird.png'
export function Hero({...props}: ComponentProps<any>) {
    return (
        <div className={styles.Hero} style={props.style}>
            <SpriteAnimator
                sprite={bird}
                fps={10}
                width={62}
                height={50}
            />
        </div>

    );
};

