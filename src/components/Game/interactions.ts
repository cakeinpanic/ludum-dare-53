import { RoomName } from "../../rooms/rooms";
import {
  Character,
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
}

const interactionPrerequisites = {
  [ItemName.flowers]: ItemName.scissors,
};
export const clickOnItemInteraction = (
  item: Item,
  currentItem: Item
): InteractionResult => {
  const result: InteractionResult = {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: {},
    newHelpText: null,
  };

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
  return result;
};

export const clickOnCharacterInteraction = (
  characterName: CharacterName,
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item
): InteractionResult => {
  const result: InteractionResult = {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: {},
    newHelpText: null,
  };
  if (characterName === "ma") {
    if (currentItem.id === "flowers") {
      return giveFlowersToMother(items, characters, currentItem);
    }
    return talkToMother(items, characters, currentItem);
  }
  if (characterName === "sister") {
    if (currentItem.id === "letter") {
      return talkToSisterAboutLetter(items, characters, currentItem);
    }
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
  };
};

const talkToMother = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item
): InteractionResult => {
  return {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: {},
    newHelpText: "Mother: hi, did not see you for a while. Missed your family?",
  };
};
