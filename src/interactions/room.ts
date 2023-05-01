import {
  CharacterName,
  CharactersCollection,
  Item,
  ItemsCollection,
} from "../components/Game/types";
import { RoomName } from "../rooms/rooms";

import { InteractionResult } from "./types";

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

export const fatherRunsToTheBird = (
  items: ItemsCollection,
  characters: CharactersCollection
): InteractionResult => {
  return {
    newCurrentItem: null,

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
