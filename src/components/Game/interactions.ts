import { RoomName } from "../../rooms/rooms";
import {
  Character,
  CharacterName,
  CharactersCollection,
  Item,
  ItemName,
  ItemsCollection,
} from "./types";
import { merge as _merge } from "lodash";

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
  } else {
    const result = {
      newCurrentItem: item,
      updateItemsObject: {},
      updateCharactersObject: {},
      newHelpText: "",
    };
    switch (item.id) {
      case ItemName.tree:
        result.newHelpText = `Such a big tree....`;
        break;
      case ItemName.vase:
        result.newHelpText = `Flowers from the garden would look good in this vase`;
        break;
    }
    return result;
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

export const expressTo2 = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item
): InteractionResult => {
  const o2 = talkToSisterAboutLetter(items, characters, currentItem);
  const o3 = clickOnItemInteraction(items[ItemName.flowers], o2.newCurrentItem);
  const o1 = giveFlowersToMother(items, characters, o3.newCurrentItem);

  return _merge(o2, o3, o1);
};
