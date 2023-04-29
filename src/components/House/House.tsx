import React, { useEffect } from 'react';
import { getRoomCoordinates, RoomName, roomPositions, ROOMS } from '../../rooms/rooms';
import styles from './House.module.scss';

export function House({ currentRoom, setCurrentRoom, scale, setScale, ...props }) {

    const zoom = (e: MouseEvent, room: RoomName) => {
        setCurrentRoom(room);
    };

    useEffect(() => {
        requestAnimationFrame(() => document.getElementById(currentRoom)?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' }));
    }, [currentRoom, scale]);

    return (
        <div className={props.className + ' ' + styles.House}>

            {roomPositions.map((rooms: RoomName[], y: number) => rooms.map((room: RoomName, x: number) => {
                const  img = ROOMS[room]?.img
                const { height, width, left, top } = getRoomCoordinates(room, {x,y});




                return <div key={'room' + room + x + y}
                            className={styles.img + ' ' + (room === currentRoom ? styles.active : '')}
                            style={{ left: left*scale, top: top*scale, width: width*scale, height: height*scale, }}>
                    <img id={room}
                         onClick={(e) => zoom(e, room)}
                         src={img}/>
                </div>;
            }))}


        </div>
    );
};

