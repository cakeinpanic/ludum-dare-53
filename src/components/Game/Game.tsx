import React, { useEffect } from 'react';
import { Hero } from '../Hero/Hero';
import { House } from '../House/House';
import styles from './Game.module.scss';

enum RoomName {
    attic = 'attic',
    toilet = 'toilet',
    cabinet = 'cabinet'
}

const rooms = {
    [RoomName.attic]: {
        left: 72,
        top: 103,
        width: 350,
        height: 125
    },
    [RoomName.toilet]: {
        left: 72,
        top: 232,
        width: 93,
        height: 105,
    },
    [RoomName.cabinet]: {
        left: 162,
        top: 232,
        width: 258,
        height: 105,
    },
};

export function Game() {
    const [currentRoom, setCurrentRoom] = React.useState<RoomName>(RoomName.attic);
    const [heroPosition, setHeroPosition] = React.useState<{ left: number, top: number }>({ left: 0, top: 0 });
    const [debugMode, setDebugMode] = React.useState<boolean>(false);

    const moveToRoom = (room: RoomName) => () => {
        setCurrentRoom(room);
    };

    useEffect(() => {
        const { left, top, width, height } = rooms[currentRoom];
        setHeroPosition({ left: left + width / 2 - 20, top: top + height / 2 - 20 });
    }, [currentRoom]);

    return (
        <div className={styles.game}>
            <House className={styles.house}/>
            {Object.keys(rooms).map((room: RoomName) => {
                const { left, top, width, height } = rooms[room];
                return <div key={room} className={styles.roomDummie} style={{ left, top, width, height, opacity: debugMode ? .5: 0 }} onClick={moveToRoom(room)}/>;
            })}
            <Hero style={{ left: heroPosition.left, top: heroPosition.top }}/>
        </div>

    );
}
;


