import React, { useCallback, useEffect } from 'react'
import { moveFromRoom, RoomName } from '../../rooms/rooms'
import { CharacterView } from '../CharacterView/CharacterView'
import { House } from '../House/House'
import styles from './Game.module.scss'
import { useGame } from './useGame'
import { AvailableWays } from './types'

const MAX_SCALE = 5

export function Game() {
  const [debugMode, setDebugMode] = React.useState<boolean>(false)
  const [scale, setScale] = React.useState(MAX_SCALE)

  const { gameState, characters, move, setCurrentRoom } = useGame()

  const moveOnMap = useCallback(
    (e) => {
      const coordinates = { x: 0, y: 0 }
      let direction: keyof AvailableWays | undefined

      if (e.key === 's' || e.key === 'ArrowDown') {
        direction = 'down'
        e.preventDefault()
      }
      if (e.key === 'a' || e.key === 'ArrowLeft') {
        direction = 'left'
        e.preventDefault()
      }
      if (e.key === 'd' || e.key === 'ArrowRight') {
        direction = 'right'
        e.preventDefault()
      }
      if (e.key === 'w' || e.key === 'ArrowUp') {
        direction = 'up'
        e.preventDefault()
      }
      if (direction) {
        move(direction)
      }

      //   const newRoom = moveFromRoom(gameState.currentRoom, coordinates);
      //   setCurrentRoom(newRoom);
    },
    [move],
  )

  useEffect(() => {
    document.addEventListener('keydown', moveOnMap)
    return () => {
      document.removeEventListener('keydown', moveOnMap)
    }
  }, [moveOnMap])

  useEffect(() => {
    const shift = { shiftX: -100, shiftY: 0 }
    // setMotherPosition(calculatePositionForAHero(RoomName.living, shift))
    // setFatherosition(calculatePositionForAHero(RoomName.attick, shift))
  }, [scale])

  return (
    <>
      <div className={styles.game}>
        <House
          scale={scale}
          setScale={setScale}
          className={styles.house}
          setCurrentRoom={setCurrentRoom}
          currentRoom={gameState.currentRoom}
        />

        <CharacterView
          character={{
            name: 'main',
            room: gameState.currentRoom,
            roomPosition: { x: 0, y: 0 },
          }}
          scale={scale}
        />
        {characters.map((character) => (
          <CharacterView character={character} scale={scale} />
        ))}

        <CharacterView
          character={{
            name: 'main',
            room: gameState.currentRoom,
            roomPosition: { x: 0, y: 0 },
          }}
          scale={scale}
        />
        {characters.map((character) => (
          <CharacterView character={character} scale={scale} />
        ))}
      </div>
      <div
        className={styles.zoom + ' ' + (scale === MAX_SCALE ? styles.out : '')}
        onClick={() =>
          scale === MAX_SCALE ? setScale(2) : setScale(MAX_SCALE)
        }
      >
        -
      </div>
    </>
  )
}
