import {
  CharacterName,
  CharactersCollection,
  Item,
  ItemName,
  ItemsCollection,
} from "../components/Game/types";
import { RoomName } from "../rooms/rooms";
import { InteractionResult } from "./types";

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
