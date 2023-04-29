import React from 'react';
import styles from './House.module.scss';
import img from './house.jpeg'

export function House() {
    return (
        <div className={styles.House}>
            <img className={styles.mainImg} src={img}/>
        </div>
    );
};

