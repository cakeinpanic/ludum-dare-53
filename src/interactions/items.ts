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
  const item: Item = items[itemName];

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
    return {
      newCurrentItem: item,
      updateItemsObject: {
        [item.id]: { ...item, isVisible: false, isActive: false },
      },
      updateCharactersObject: {},
      newHelpText: `Grabbed ${item.id}`,
    };
  }

  if (itemName === ItemName.book) {
    return grabABook(items, characters, currentItem, act);
  }
  if (itemName === ItemName.birdCage) {
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
export const grabABook = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  if (characters[CharacterName.pa].room === RoomName.library) {
    return {
      newCurrentItem: currentItem,
      newHelpText: `Father: don't touch my books, they are older than you`,
      updateItemsObject: {},
      updateCharactersObject: {},
    };
  }
  return {
    newCurrentItem: items[ItemName.key],
    updateItemsObject: {
      [ItemName.book]: {
        ...items[ItemName.book],
        isActive: false,
        isVisible: false,
      },
    },
    updateCharactersObject: {},
    newHelpText:
      "There is a key inside the book! Probably I can go to some new location now",
  };
};