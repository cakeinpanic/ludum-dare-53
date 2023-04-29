import React from 'react';
import { RoomName, rooms } from '../../rooms/rooms';
import styles from './House.module.scss';
import bg from './house_bg.svg';
import house from './house.png';

export function House({ ...props }) {

    return (
        <div className={props.className + ' ' + styles.House}>
            {/*<img className={styles.bg} src={bg}/>*/}
            {/*<img className={styles.bg} src={house}/>*/}

            {Object.keys(rooms).map((room: RoomName) => {
                const { left, top, width, height, img } = rooms[room];
                return <img key={room} className={styles.img} style={{ left, top, width, height, }} src={img}/>;
            })}

        </div>
    );
};

