import React from 'react';
import styles from './House.module.scss';
import img from './house.jpeg'

export function House({...props}) {
    return (
        <div className={props.className + ' ' +styles.House}  >
            <img className={styles.mainImg} src={img}/>
        </div>
    );
};

