import React, { useEffect } from 'react';
import { RoomName, rooms } from '../../rooms/rooms';
import styles from './House.module.scss';

export function House({ currentRoom, setCurrentRoom, scale, setScale, ...props }) {

    const zoom = (e: MouseEvent, room: RoomName) => {
        setCurrentRoom(room);
    };

    useEffect(() => {
        requestAnimationFrame(() => document.getElementById(currentRoom)?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' }));
    }, [currentRoom]);

    return (
        <div className={props.className + ' ' + styles.House}>
            {/*<img className={styles.bg} src={bg}/>*/}
            {/*<img className={styles.bg} src={house}/>*/}

            {Object.keys(rooms).map((room: RoomName) => {
                const { left, top, width, height, img } = rooms[room];
                return <div className={styles.img + ' ' + (room === currentRoom ? styles.active : '')}
                            style={{ left: left * scale, top: top * scale, width: width * scale, height: height * scale, }}>
                    <img key={room}
                         id={room}
                         onClick={(e) => zoom(e, room)}
                         src={img}/>
                </div>;
            })}

        </div>
    );
};

