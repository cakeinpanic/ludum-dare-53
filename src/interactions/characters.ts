import {
  CharacterName,
  CharactersCollection,
  Item,
  ItemName,
  ItemsCollection,
} from '../components/Game/types'
import { RoomName } from '../rooms/rooms'
import { getText } from './texts'
import { InteractionResult } from './types'

export const clickOnCharacterInteraction = (
  characterName: CharacterName,
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number,
): InteractionResult => {
  const result: InteractionResult = {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: {},
    newHelpText: null,
  }
  if (characterName === 'ma') {
    if (currentItem?.id === 'flowers') {
      return giveFlowersToMother(items, characters, currentItem)
    }
    return talkToMother(items, characters, currentItem, act)
  }
  if (characterName === 'sister') {
    if (currentItem?.id === 'letter') {
      return talkToSisterAboutLetter(items, characters, currentItem)
    }
    return talkToSister(items, characters, currentItem, act)
  }
  return result
}

const talkToSisterAboutLetter = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
): InteractionResult => {
  return {
    newCurrentItem: items[ItemName.scissors],
    updateItemsObject: {},
    updateCharactersObject: {},
    newHelpText: getText('2'),
  }
}

const giveFlowersToMother = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
): InteractionResult => {
  return {
    newCurrentItem: null,
    updateItemsObject: {
      [ItemName.flowers]: {
        ...items[ItemName.flowers],
        room: RoomName.kitchen,
        roomPosition: {
          shiftX: 300,
          shiftY: -100,
        },
        isVisible: true,
        isActive: false,
      },
      [ItemName.vase]: { ...items[ItemName.vase], isActive: false },
    },
    updateCharactersObject: {
      ma: { ...characters['ma'], room: RoomName.kitchen },
    },
    newHelpText: getText('3'),
    nextAct: true,
  }
}

const talkToMother = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number,
): InteractionResult => {
  return {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: {},
    newHelpText: getText('1'),
  }
}

const talkToSister = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number,
): InteractionResult => {
  return {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: {},
    newHelpText: getText('4'),
  }
}
