import React, { ComponentProps, useEffect } from 'react';
import { SpriteAnimator } from 'react-sprite-animator';
import bird from './bird.png';
import styles from './Hero.module.scss';

export enum HeroName {
    main = 'main',
    sister = 'sister',
    mother = 'mother',
    father = 'father',
    brother = 'brother',
}

const SPRITES = {
    [HeroName.main]: bird,
};

export function Hero({ name, ...props }: ComponentProps<any> & { name: HeroName }) {

    return (
        <div className={styles.Hero} style={props.style}>
            {SPRITES[name] ?
                <SpriteAnimator
                    className={styles.sprite}
                    sprite={SPRITES[name]}
                    fps={10}
                    width={62}
                    height={50}
                /> : <div className={styles.debug}><span className={styles.name}>{name}</span> </div>}
        </div>

    );
};

