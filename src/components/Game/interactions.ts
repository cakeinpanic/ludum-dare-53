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

export const clickOnItemInteraction = (item: Item): InteractionResult => {
  const result: InteractionResult = {
    newCurrentItem: null,
    updateItemsObject: {},
    updateCharactersObject: {},
  };
  if (!item.isActive || !item.isVisible) {
    return result;
  }
  if (item.collectable) {
    return {
      newCurrentItem: item,
      updateItemsObject: {
        [item.id]: { ...item, isVisible: false, isActive: false },
      },
      updateCharactersObject: {},
    };
  }
  return result;
};

export const clickOnCharacterInteraction = (
  characterName: CharacterName,
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item[]
): InteractionResult => {
  const result: InteractionResult = {
    newCurrentItem: null,
    updateItemsObject: {},
    updateCharactersObject: {},
    newHelpText: null,
  };
  if (characterName === "ma") {
    if (currentItem.find(({ id }) => id === "flowers")) {
      return giveFlowersToMother(items, characters, currentItem);
    }
  }
  return result;
};

const giveFlowersToMother = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item[]
): InteractionResult => {
  const result: InteractionResult = {
    newCurrentItem: null,
    updateItemsObject: {},
    updateCharactersObject: {},
    newHelpText: null,
  };
  result.updateCharactersObject = {
    ["ma"]: { ...characters["ma"], room: RoomName.kitchen },
  };
  result.updateItemsObject = {
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
  };
  result.newHelpText = "Mother went to put flowers in the vase.";
  return result;
};
