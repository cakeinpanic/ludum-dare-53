import {
  CharacterName,
  CharactersCollection,
  Item,
  ItemName,
  ItemsCollection,
} from "../components/Game/types";
import { RoomName, roomPositions } from "../rooms/rooms";
import { merge } from "lodash";
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
  if (
    oldRoom === RoomName.basement &&
    characters[CharacterName.ghost].room === RoomName.basement
  ) {
    return merge(exitBasementAfterMeetingGhost(items, characters), {
      updateCharactersObject: result.updateCharactersObject,
    });
  }
  return result;
};

export const changeMainLocation = (
  oldRoom: RoomName,
  newRoom: RoomName,
  characters: CharactersCollection,
  act: number
): CharactersCollection => {
  let roomPosition = {
    shiftX: 0,
    shiftY: 0,
  };
  const ghostUpdate = {};
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
  //
  //if (act === 3 || (oldRoom=== RoomName.basement && characters[CharacterName.ghost].room === RoomName.basement)) {
  //    ghostUpdate.room = newRoom;
  //    ghostUpdate.roomPosition = {...roomPosition}
  //    ghostUpdate.roomPosition.shiftX += 150;
  //    ghostUpdate.roomPosition.shiftY -= 30;
  //
  //
  //}
  return {
    ...characters,
    [CharacterName.main]: {
      ...characters[CharacterName.main],
      roomPosition,
    },
    [CharacterName.ghost]: {
      ...characters[CharacterName.ghost],
      ...ghostUpdate,
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

export const exitBasementAfterMeetingGhost = (
  items: ItemsCollection,
  characters: CharactersCollection
): InteractionResult => {
  return {
    newCurrentItem: null,
    updateCharactersObject: {},
    updateItemsObject: {},
    nextAct: true,
    newHelpText: "I'm gonna lear a lot today...",
  };
};
