import React, { useCallback, useEffect } from 'react'
import {
  getRoomCoordinates,
  getTileCoordinates,
  IRoom,
  moveFromRoom,
  RoomName,
  ROOMS,
} from '../../rooms/rooms'
import { CharacterView } from '../CharacterView/CharacterView'
import { House } from '../House/House'
import styles from './Game.module.scss'
import { useGame } from './useGame'

const MAX_SCALE = 5

export function Game() {
  const [currentRoom, setCurrentRoom] = React.useState<RoomName>(
    RoomName.living,
  )
  const [heroPosition, setHeroPosition] = React.useState<{
    left: number
    top: number
  }>({ left: 0, top: 0 })
  const [motherPosition, setMotherPosition] = React.useState<{
    left: number
    top: number
  }>({ left: 0, top: 0 })
  const [fatherPosition, setFatherosition] = React.useState<{
    left: number
    top: number
  }>({ left: 0, top: 0 })
  const [debugMode, setDebugMode] = React.useState<boolean>(false)
  const [scale, setScale] = React.useState(MAX_SCALE)

  const { gameState, characters } = useGame()

  const moveOnMap = useCallback(
    (e) => {
      const coordinates = { x: 0, y: 0 };

      if (e.key === "s" || e.key === "ArrowDown") {
        coordinates.y = 1;
        e.preventDefault();
      }
      if (e.key === "a" || e.key === "ArrowLeft") {
        coordinates.x = -1;
        e.preventDefault();
      }
      if (e.key === "d" || e.key === "ArrowRight") {
        coordinates.x = 1;
        e.preventDefault();
      }
      if (e.key === "w" || e.key === "ArrowUp") {
        coordinates.y = -1;
        e.preventDefault();
      }

      const newRoom = moveFromRoom(currentRoom, coordinates);
      console.log(currentRoom, newRoom);
      setCurrentRoom(newRoom);
    },
    [currentRoom, setCurrentRoom]
  );

  useEffect(() => {
    document.addEventListener("keydown", moveOnMap);
    return () => {
      document.removeEventListener("keydown", moveOnMap);
    };
  }, [moveOnMap]);

  useEffect(() => {
    // setMotherPosition(calculatePositionForAHero(RoomName.living, shift))
    // setFatherosition(calculatePositionForAHero(RoomName.attick, shift))
  }, [scale])

  return (
    <div className={styles.game}>
      <House
        scale={scale}
        setScale={setScale}
        className={styles.house}
        setCurrentRoom={setCurrentRoom}
        currentRoom={currentRoom}
      />

      <CharacterView
        character={{
          name: 'main',
          room: gameState.currentRoom,
          roomPosition: { x: 0, y: 0 },
        }}
        scale={scale}
      />
      {characters.map((character) => 
        (<CharacterView
            character={character}
            scale={scale}
        />))
      }

      <div
        className={styles.zoom + ' ' + (scale === MAX_SCALE ? styles.out : '')}
        onClick={() =>
          scale === MAX_SCALE ? setScale(2) : setScale(MAX_SCALE)
        }
      >
        -
      </div>
    </div>
  )
}
