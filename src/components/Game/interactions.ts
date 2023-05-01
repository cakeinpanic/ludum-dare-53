import { RoomName } from "../../rooms/rooms";
import {
  CharacterName,
  CharactersCollection,
  Item,
  ItemName,
  ItemsCollection,
} from "./types";

export interface InteractionResult {
  newCurrentItem?: Item | null;
  updateItemsObject: ItemsCollection;
  updateCharactersObject: CharactersCollection;
  newHelpText?: string | null;
  nextAct?: boolean;
}

const interactionPrerequisites = {
  [ItemName.flowers]: ItemName.scissors,
};
export const moveRoomInteraction = (
  oldRoom: RoomName,
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

  if (act === 2 && oldRoom === RoomName.bedroom) {
    return fatherRunsToTheBird(items, characters);
  }
  return result;
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

  if (item.collectable) {
    if (currentItem?.id !== interactionPrerequisites[item.id]) {
      result.newHelpText = `Something's missing to interact with ${item.id}`;
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

export const clickOnCharacterInteraction = (
  characterName: CharacterName,
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
  if (characterName === "ma") {
    if (currentItem?.id === "flowers") {
      return giveFlowersToMother(items, characters, currentItem);
    }
    return talkToMother(items, characters, currentItem, act);
  }
  if (characterName === "sister") {
    if (currentItem?.id === "letter") {
      return talkToSisterAboutLetter(items, characters, currentItem);
    }
    return talkToSister(items, characters, currentItem, act);
  }
  return result;
};

const talkToSisterAboutLetter = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item
): InteractionResult => {
  return {
    newCurrentItem: items[ItemName.scissors],
    updateItemsObject: {},
    updateCharactersObject: {},
    newHelpText:
      "Sister: we were waiting for you later, this letter seems weird. Go fuck around in the garden ",
  };
};

const giveFlowersToMother = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item
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
      ["ma"]: { ...characters["ma"], room: RoomName.kitchen },
    },
    newHelpText: "Mother went to put flowers in the vase.",
    nextAct: true,
  };
};

const talkToMother = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  return {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: {},
    newHelpText: "Mother: hi, did not see you for a while. Missed your family?",
  };
};

const talkToSister = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  return {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: {},
    newHelpText:
      "Sister: oh god, I have missed you so much! Tell me more about your life!",
  };
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

export const fatherRunsToTheBird = (
  items: ItemsCollection,
  characters: CharactersCollection
): InteractionResult => {
  return {
    newCurrentItem: null,
    updateItemsObject: {},
    updateCharactersObject: {
      [CharacterName.pa]: {
        ...characters[CharacterName.pa],
        room: RoomName.bedroom,
      },
    },
    newHelpText:
      "Meth father on the way from bedroom – he was rushing to check his bird",
  };
};
