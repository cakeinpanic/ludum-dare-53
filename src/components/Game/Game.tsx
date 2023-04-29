import React, { useEffect } from 'react';
import { RoomName, rooms } from '../../rooms/rooms';
import { Hero } from '../Hero/Hero';
import { House } from '../House/House';
import { Music } from '../music/Music';
import styles from './Game.module.scss';
import suburb from './suburb2.png';

export function Game() {
    const [currentRoom, setCurrentRoom] = React.useState<RoomName>(RoomName.living);
    const [heroPosition, setHeroPosition] = React.useState<{ left: number, top: number }>({ left: 0, top: 0 });
    const [debugMode, setDebugMode] = React.useState<boolean>(true);

    const moveToRoom = (room: RoomName) => () => {
        setCurrentRoom(room);
    };

    useEffect(() => {
        const { left, top, width, height } = rooms[currentRoom];
        setHeroPosition({ left: left + width / 2 - 20, top: top + height / 2 - 20 });
    }, [currentRoom]);

    return (
        <div className={styles.game}>
            {/*<img className={styles.bg} src={suburb}/>*/}
            <House className={styles.house}/>
            {Object.keys(rooms).map((room: RoomName) => {
                const { left, top, width, height } = rooms[room];
                return <div key={room} className={styles.roomDummie} style={{ left, top, width, height, display: debugMode ? 'block': 'none' }} onClick={moveToRoom(room)}/>;
            })}
            <Hero style={{ left: heroPosition.left, top: heroPosition.top }}/>

        </div>

    );
}
;


