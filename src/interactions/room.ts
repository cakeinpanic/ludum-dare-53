import {
  CharacterName,
  CharactersCollection,
  Item,
  ItemName,
  ItemsCollection,
} from "../components/Game/types";
import { RoomName, roomPositions } from "../rooms/rooms";

import { InteractionResult } from "./types";

export const moveRoomInteraction = (
  oldRoom: RoomName,
  newRoom: RoomName,
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  const result: InteractionResult = {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: changeMainLocation(
      oldRoom,
      newRoom,
      characters,
      act
    ),
    newHelpText: null,
  };

  if (
    act === 2 &&
    newRoom === RoomName.library &&
    items[ItemName.blanket].room === RoomName.bedroom
  ) {
    return {
      ...result.updateCharactersObject,
      ...fatherRunsToTheBird(items, characters),
    };
  }
  return result;
};

export const changeMainLocation = (
  oldRoom: RoomName,
  newRoom: RoomName,
  characters: CharactersCollection,
  act: number
): CharactersCollection => {
  let roomPosition = undefined;
  if (newRoom === RoomName.yard && act === 2) {
    roomPosition = {
      shiftX: 110,
      shiftY: 0,
    };
  }
  if (newRoom === RoomName.basement) {
    roomPosition = {
      shiftX: 20,
      shiftY: 0,
    };
  }
  return {
    ...characters,
    [CharacterName.main]: {
      ...characters[CharacterName.main],
      roomPosition,
    },
  };
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
    updateItemsObject: {},
    newHelpText:
      "Met father on the way from bedroom – he was rushing to check his bird",
  };
};
