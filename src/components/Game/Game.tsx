import React from 'react';
import { Hero } from '../Hero/Hero';
import { House } from '../House/House';
import styles from './Game.module.scss';

export function Game() {
    return (
        <div className={styles.game}>
            <House className={styles.house} />
            <Hero/>
        </div>

    );
};


