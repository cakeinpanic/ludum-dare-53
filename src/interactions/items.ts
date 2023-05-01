import { get } from "http";
import {
  CharacterName,
  CharactersCollection,
  Item,
  ItemName,
  ItemsCollection,
} from "../components/Game/types";
import { RoomName } from "../rooms/rooms";
import { getText } from "./texts";
import { InteractionResult } from "./types";

const interactionPrerequisites = {
  [ItemName.flowers]: ItemName.scissors,
  [ItemName.birdCage]: ItemName.blanket,
  [ItemName.tree]: ItemName.shovel,
  [ItemName.altar]: ItemName.skull,
  [ItemName.poison]: ItemName.bourbon,
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
    // todo: use better phrases here
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
  if (itemName === ItemName.table) {
    return writeALetter(items, characters, currentItem, act);
  }
  if (itemName === ItemName.poison) {
    return mixBourbonAndPoison(items, characters, currentItem, act);
  }
  if (itemName === ItemName.birdCage) {
    return putBlanketOnABird(items, characters, currentItem, act);
  }
  if (itemName === ItemName.tree && currentItem?.id === ItemName.shovel) {
    return digUnderTheTree(items, characters, currentItem, act);
  }
  if (itemName === ItemName.altar && currentItem?.id === ItemName.skull) {
    return sacrifice(items, characters, currentItem, act);
  }
  if (itemName === ItemName.dirtPile) {
    return lookInDirt(items, characters, currentItem, act);
  }

  switch (item.id) {
    case ItemName.tree:
      result.newHelpText = getText("6");
      break;
    case ItemName.vase:
      result.newHelpText = getText("5");
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
    newHelpText: getText("10"),
  };
};
export const digUnderTheTree = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  return {
    newCurrentItem: null,
    updateItemsObject: {
      [ItemName.dirtPile]: {
        ...items[ItemName.dirtPile],
        isActive: true,
        isVisible: true,
      },
    },
    updateCharactersObject: {},
    newHelpText: getText("14"),
  };
};
export const sacrifice = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  return {
    newCurrentItem: null,
    updateItemsObject: {
      [ItemName.altar]: {
        ...items[ItemName.altar],
        isActive: false,
      },
    },
    updateCharactersObject: {
      [CharacterName.ghost]: {
        ...characters[CharacterName.ghost],
        room: RoomName.basement,
      },
    },
    newHelpText: getText("16"),
  };
};

export const lookInDirt = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  return {
    newCurrentItem: items[ItemName.skull],
    updateItemsObject: {
      [ItemName.dirtPile]: {
        ...items[ItemName.dirtPile],
        isActive: false,
      },
    },
    updateCharactersObject: {},
    newHelpText: getText("15"),
  };
};
export const mixBourbonAndPoison = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  return {
    newCurrentItem: items[ItemName.poisonedDrink],
    updateItemsObject: {
      [ItemName.poison]: {
        ...items[ItemName.poison],
        isVisible: false,
      },
    },
    updateCharactersObject: {},
    newHelpText: getText("15"),
  };
};
export const grabABook = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  if (
    characters[CharacterName.pa].room === RoomName.library &&
    characters[CharacterName.main].room === RoomName.library
  ) {
    return {
      newCurrentItem: currentItem,
      newHelpText: getText("12"),
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
    updatedStatus: { basementIsLocked: false },
    newHelpText: getText("13"),
  };
};

export const writeALetter = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  if (!characters[CharacterName.uncle].isDead) {
    return {
      newCurrentItem: currentItem,
      newHelpText: getText("102"),
      updateItemsObject: {},
      updateCharactersObject: {},
    };
  }
  return {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: {},
    updatedStatus: { gameFinished: true },
    newHelpText: getText("29"),
  };
};
