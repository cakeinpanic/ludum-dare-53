import React, { useEffect } from 'react';
import { RoomName, rooms } from '../../rooms/rooms';
import { Hero } from '../Hero/Hero';
import { House } from '../House/House';
import styles from './Game.module.scss';

export function Game() {
    const [currentRoom, setCurrentRoom] = React.useState<RoomName>(RoomName.living);
    const [heroPosition, setHeroPosition] = React.useState<{ left: number, top: number }>({ left: 0, top: 0 });
    const [debugMode, setDebugMode] = React.useState<boolean>(false);
    const [scale, setScale] = React.useState(5);
    const moveToRoom = (room: RoomName) => () => {
        setCurrentRoom(room);
    };

    useEffect(() => {
        const { left, top, width, height } = rooms[currentRoom];
        setHeroPosition({ left: left*scale + width * scale / 2 - 20, top: top*scale  + height*scale / 2 - 20 });
    }, [currentRoom]);

    return (
        <div className={styles.game}>
            {/*<img className={styles.bg} src={suburb}/>*/}
            <House scale={scale}
                   setScale={setScale}
                   className={styles.house} setCurrentRoom={setCurrentRoom} currentRoom={currentRoom}/>
            {/*{Object.keys(rooms).map((room: RoomName) => {*/}
            {/*    const { left, top, width, height } = rooms[room];*/}
            {/*    return <div key={room} className={styles.roomDummie} style={{ left, top, width, height, display: debugMode ? 'block': 'none' }} onClick={moveToRoom(room)}/>;*/}
            {/*})}*/}
            <Hero style={{ left: heroPosition.left, top: heroPosition.top }}/>

        </div>

    );
}
;


