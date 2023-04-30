import { RoomName } from "../../rooms/rooms";
import {
  Character,
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
  character: Character,
  items,
  currentItem: Item
): InteractionResult => {
  const result: InteractionResult = {
    newCurrentItem: null,
    updateItemsObject: {},
    updateCharactersObject: {},
    newHelpText: null,
  };
  if (character.name === "ma") {
    if (currentItem.id === "flowers") {
      result.updateCharactersObject = {
        ["ma"]: { ...character, room: RoomName.kitchen },
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
      result.newHelpText =
        "You have given flowers to your mother. She is happy now.";
      return result;
    }
  }
  return result;
};
