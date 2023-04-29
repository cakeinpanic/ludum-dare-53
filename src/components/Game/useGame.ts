import { useCallback, useEffect, useState } from 'react'
import { RoomName, moveFromRoom } from '../../rooms/rooms'
import { AvailableWays, Character, Game, Item } from './types'
import { startState } from './startState'

interface useGameReturn {
  gameState: Game
  availableWays: AvailableWays
  characters: Character[]
  items: Item[]
  currentItem: Item | null

  clickOnItem: (item: Item['id']) => boolean
  clickOnCharacter: (character: Character['name']) => void
  move: (direction: keyof AvailableWays) => void
  setCurrentRoom: (room: RoomName) => void
}
export const useGame = (): useGameReturn => {
  const [gameState, setGameState] = useState<Game>(startState.game)

  const [availableWays, setAvailableWays] = useState<AvailableWays>(
    startState.availableWays,
  )

  const [characters, setCharacters] = useState<Character[]>(
    startState.characters,
  )
  const [items, setItems] = useState<Item[]>(startState.items)
  const [currentItem, setCurrentItem] = useState<Item | null>(null)

  const setHelpText = useCallback((text: string) => {
    setGameState((prevState) => ({
      ...prevState,
      helpText: text,
    }))
  }, [])

  // calc available ways
  useEffect(() => {
    const availableWays = {
      up: !!moveFromRoom(gameState.currentRoom, 'up'),
      down: !!moveFromRoom(gameState.currentRoom, 'down'),
      left: !!moveFromRoom(gameState.currentRoom, 'left'),
      right: !!moveFromRoom(gameState.currentRoom, 'right'),
    }
    setAvailableWays(availableWays)
  }, [gameState.currentRoom])

  const move = useCallback(
    (direction: keyof AvailableWays) => {
      const newRoom = moveFromRoom(gameState.currentRoom, direction)
      if (!newRoom) {
        return setHelpText('You can not go there')
      }
      setGameState((prevState) => ({
        ...prevState,
        currentRoom: newRoom,
      }))
    },
    [gameState.currentRoom],
  )

  const clickOnItem = useCallback((item: Item['id']) => {
    return false
  }, [])

  const clickOnCharacter = useCallback((character: Character['name']) => {}, [])
  //   const teleport = useCallback((room: RoomName) => {}, []);
  const setCurrentRoom = useCallback((room: RoomName) => {
    setGameState((prevState) => ({
      ...prevState,
      currentRoom: room,
    }))
  }, [])

  return {
    gameState,
    availableWays,
    characters,
    items,
    currentItem,
    clickOnItem,
    clickOnCharacter,
    move,
    setCurrentRoom,
  }
}
