import {
  CharacterName,
  CharactersCollection,
  Item,
  ItemName,
  ItemsCollection,
} from "../components/Game/types";
import { RoomName } from "../rooms/rooms";
import { InteractionResult } from "./types";

const interactionPrerequisites = {
  [ItemName.flowers]: ItemName.scissors,
  [ItemName.birdCage]: ItemName.blanket,
};

export const clickOnItemInteraction = (
  itemName: ItemName,
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  const result: InteractionResult = {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: {},
    newHelpText: null,
  };
  const item = items[itemName];

  if (!item.isActive || !item.isVisible) {
    return result;
  }

  if (
    interactionPrerequisites[item.id] &&
    currentItem?.id !== interactionPrerequisites[item.id]
  ) {
    result.newHelpText = `Something's missing to interact with ${item.id}`;
    return result;
  }

  if (item.collectable) {
    if (
      itemName === ItemName.book &&
      characters[CharacterName.pa].room === RoomName.library
    ) {
      result.newHelpText = `Father: don't touch my books, they are older than you`;
      return result;
    }
    return {
      newCurrentItem: item,
      updateItemsObject: {
        [item.id]: { ...item, isVisible: false, isActive: false },
      },
      updateCharactersObject: {},
      newHelpText: `Grabbed ${item.id}`,
    };
  }

  if (item.id === ItemName.birdCage && currentItem?.id === ItemName.blanket) {
    return putBlanketOnABird(items, characters, currentItem, act);
  }

  switch (item.id) {
    case ItemName.tree:
      result.newHelpText = `Such a big tree....`;
      break;
    case ItemName.vase:
      result.newHelpText = `Flowers from the garden would look good in this vase`;
      break;
  }
  return result;
};

export const putBlanketOnABird = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  return {
    newCurrentItem: null,
    updateItemsObject: {
      [ItemName.birdCage]: {
        ...items[ItemName.birdCage],
        isActive: false,
        isVisible: true,
      },
      [ItemName.blanket]: {
        ...items[ItemName.blanket],
        isActive: false,
        isVisible: true,
        room: RoomName.bedroom,
        roomPosition: {
          shiftX: 40,
          shiftY: -30,
        },
        size: {
          width: 300,
          height: 300,
        },
      },
    },
    updateCharactersObject: {},
    newHelpText: "Bird: RUN! RUN! RUN!",
  };
};
