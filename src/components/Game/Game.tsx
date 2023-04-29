import React, { useCallback, useEffect } from 'react';
import { IRoom, RoomName, rooms } from '../../rooms/rooms';
import { Hero, HeroName } from '../Hero/Hero';
import { House } from '../House/House';
import styles from './Game.module.scss';

export function Game() {
    const [currentRoom, setCurrentRoom] = React.useState<RoomName>(RoomName.living);
    const [heroPosition, setHeroPosition] = React.useState<{ left: number, top: number }>({ left: 0, top: 0 });
    const [motherPosition, setMotherPosition] = React.useState<{ left: number, top: number }>({ left: 0, top: 0 });
    const [fatherPosition, setFatherosition] = React.useState<{ left: number, top: number }>({ left: 0, top: 0 });
    const [debugMode, setDebugMode] = React.useState<boolean>(false);
    const [scale, setScale] = React.useState(5);

    const calculatePositionForAHero = useCallback((room: IRoom, { shiftX, shiftY } = { shiftX: 0, shiftY: 0 }) => {
        const { left, top, width, height } = room;
        return { left: left * scale + width * scale / 2 - 20 + shiftX, top: top * scale + height * scale / 2 + shiftY - 20 };
    }, [scale]);

    useEffect(() => {
        const shift = { shiftX: -100, shiftY: 0 };
        setMotherPosition(calculatePositionForAHero(rooms[RoomName.living], shift),);
        setFatherosition(calculatePositionForAHero(rooms[RoomName.attick], shift));
    }, []);

    useEffect(() => {
        setHeroPosition(calculatePositionForAHero(rooms[currentRoom]));
    }, [currentRoom]);

    return (
        <div className={styles.game}>
            <House scale={scale}
                   setScale={setScale}
                   className={styles.house}
                   setCurrentRoom={setCurrentRoom}
                   currentRoom={currentRoom}/>
            {/*{Object.keys(rooms).map((room: RoomName) => {*/}
            {/*    const { left, top, width, height } = rooms[room];*/}
            {/*    return <div key={room} className={styles.roomDummie} style={{ left, top, width, height, display: debugMode ? 'block': 'none' }} onClick={moveToRoom(room)}/>;*/}
            {/*})}*/}
            <Hero name={HeroName.main} style={{ left: heroPosition.left, top: heroPosition.top }}/>
            <Hero name={HeroName.mother} style={{ left: motherPosition.left, top: motherPosition.top }}/>
            <Hero name={HeroName.father} style={{ left: fatherPosition.left, top: fatherPosition.top }}/>

        </div>

    );
}
;


