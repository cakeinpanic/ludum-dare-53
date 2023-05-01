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
    if (currentItem?.id === "letter") {
      return talkToMotherAboutLetter(items, characters, currentItem, act);
    }
    return talkToMother(items, characters, currentItem, act);
  }
  if (characterName === "sister") {
    if (currentItem?.id === "letter") {
      return talkToSisterAboutLetter(items, characters, currentItem);
    }
    return talkToSister(items, characters, currentItem, act);
  }

  if (characterName === CharacterName.ghost) {
    if (currentItem?.id === "photo") {
      return showPhotoToGhost(items, characters, currentItem, act);
    }
    return talkToGhost(items, characters, currentItem, act);
  }
  if (characterName === CharacterName.uncle) {
    if (currentItem?.id === ItemName.poisonedDrink) {
      return killUncle(items, characters, currentItem, act);
    }
    return talkToUncle(items, characters, currentItem, act);
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
    newHelpText: getText("2"),
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
          shiftX: -100,
          shiftY: -75,
        },
        isVisible: true,
        isActive: false,
      },
      [ItemName.vase]: { ...items[ItemName.vase], isActive: false },
    },
    updateCharactersObject: {
      ma: {
        ...characters["ma"],
        room: RoomName.kitchen,
        roomPosition: { shiftX: -20, shiftY: 0 },
      },
    },
    newHelpText: getText("3"),
    nextAct: true,
    updatedStatus: { upstairsIsBlockedByMa: false },
  };
};

const talkToMotherAboutLetter = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  return {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: {},
    newHelpText: getText("1"),
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
    newHelpText: getText("7"),
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
    newHelpText: act === 3 ? getText("22") : getText("4"),
  };
};
const talkToGhost = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  return {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: {},
    newHelpText: act === 3 ? getText("21") : getText("19"),
  };
};
const talkToUncle = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  return {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: {},
    newHelpText: getText("101"),
  };
};

const showPhotoToGhost = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  return {
    newCurrentItem: null,
    updateItemsObject: {},
    updateCharactersObject: {},
    newHelpText: getText("24"),
    updatedStatus: { atticIsHidden: false },
  };
};

const killUncle = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  return {
    newCurrentItem: null,
    updateItemsObject: {},
    updateCharactersObject: {
      uncle: {
        ...characters[CharacterName.uncle],
        isDead: true,
      },
    },
    newHelpText: getText("28"),
    updatedStatus: { uncleFollows: false },
  };
};
