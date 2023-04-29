import React, { useState } from 'react';
import { RoomName, rooms, scale, shiftX, shiftY } from '../../rooms/rooms';
import styles from './House.module.scss';
//import bg from './house_bg.svg';
//import house from './house.png';
import house from './house1.png';

export function House({ ...props }) {
    const [scale, setScale] = React.useState(1);
    const [currentRoom, setCurrentRoom] = useState<RoomName>(RoomName.yard);

    const zoom = (e: MouseEvent, room: RoomName) => {
        setScale(5);
        setCurrentRoom(room)
        setTimeout(() => {
            e.target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }, 10);

    };
    return (
        <div className={props.className + ' ' + styles.House}>
            {/*<img className={styles.bg} src={bg}/>*/}
            {/*<img className={styles.bg} src={house}/>*/}

            {Object.keys(rooms).map((room: RoomName) => {
                const { left, top, width, height, img } = rooms[room];
                return <img key={room}
                            className={styles.img + ' '+ (room === currentRoom ? styles.active: '')}
                            style={{ left: left * scale, top: top * scale, width: width * scale, height: height * scale, }}
                            onClick={(e) => zoom(e, room)}
                            src={img}/>;
            })}

        </div>
    );
};

