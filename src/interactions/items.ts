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
  [ItemName.flowers]: {
    required: ItemName.scissors,
    phrase: getText("NO_SCISSORS"),
  },
  [ItemName.tree]: {
    required: ItemName.shovel,
    phrase: getText("NO_SHOVEL"),
  },
  [ItemName.altar]: {
    required: ItemName.skull,
    phrase: getText("NO_SKULL"),
  },
  [ItemName.poison]: {
    required: ItemName.bourbon,
    phrase: getText("NO_BOURBON"),
  },
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
    currentItem?.id !== interactionPrerequisites[item.id].required
  ) {
    result.newHelpText = interactionPrerequisites[item.id].phrase;
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
  if (itemName === ItemName.blanket) {
    return removeBlanketFromABird(items, characters, currentItem, act);
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

export const removeBlanketFromABird = (
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
        isActive: true,
        isVisible: true,
      },
      [ItemName.blanket]: {
        ...items[ItemName.blanket],
        isActive: false,
        isVisible: false,
      },
    },
    updateCharactersObject: {},
    newSubs: getText("10"),
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
    newSubs: getText("16"),
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
    newSubs: getText("15"),
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
    newSubs: getText("25"),
  };
};
export const grabABook = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  console.log(
    characters[CharacterName.pa].room,
    characters[CharacterName.main].room
  );
  if (
    characters[CharacterName.pa].room === RoomName.library &&
    characters[CharacterName.main].room === RoomName.library
  ) {
    return {
      newCurrentItem: currentItem,
      newSubs: getText("12"),
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
        isVisible: true,
      },
    },
    updateCharactersObject: {},
    updatedStatus: { basementIsLocked: false },
    newSubs: getText("13"),
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
      newSubs: getText("UNCLE_SAYS_NO"),
      updateItemsObject: {},
      updateCharactersObject: {},
    };
  }
  return {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: {
      [CharacterName.main]: {
        ...characters[CharacterName.main],
        roomPosition: {
          shiftX: -200,
          shiftY: 0,
        },
      },
    },
    updatedStatus: { gameFinished: true },
    newSubs: getText("BAD_END"),
  };
};
