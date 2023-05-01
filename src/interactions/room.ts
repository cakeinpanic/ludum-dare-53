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
import { getText } from "./texts";

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
    return merge(
      { updateCharactersObject: result.updateCharactersObject },
      fatherRunsToTheBird(items, characters)
    );
  }

  if (
    oldRoom === RoomName.basement &&
    characters[CharacterName.ghost].room === RoomName.basement
  ) {
    return merge(
      { updateCharactersObject: result.updateCharactersObject },
      exitBasementAfterMeetingGhost(items, characters)
    );
  }
  if (newRoom === RoomName.attick) {
    return merge(
      { updateCharactersObject: result.updateCharactersObject },
      goToAtticFirstTime(items, characters)
    );
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
  const uncleUpdate = {};
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

  if (newRoom === RoomName.kitchen) {
    roomPosition = {
      shiftX: 200,
      shiftY: 0,
    };
  }

  if (act === 3 && characters[CharacterName.uncle].room === oldRoom) {
    uncleUpdate.room = newRoom;
    uncleUpdate.roomPosition = { ...roomPosition };
    uncleUpdate.roomPosition.shiftX += 150;
    uncleUpdate.roomPosition.shiftY -= 0;
  }

  return {
    ...characters,
    [CharacterName.main]: {
      ...characters[CharacterName.main],
      roomPosition,
    },
    [CharacterName.uncle]: {
      ...characters[CharacterName.uncle],
      ...uncleUpdate,
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
    newHelpText: getText("11"),
  };
};

export const exitBasementAfterMeetingGhost = (
  items: ItemsCollection,
  characters: CharactersCollection
): InteractionResult => {
  return {
    newCurrentItem: null,
    updateCharactersObject: {
      [CharacterName.ghost]: {
        ...characters[CharacterName.ghost],
        room: RoomName.bedroom,
      },
      [CharacterName.sister]: {
        ...characters[CharacterName.sister],
        room: RoomName.living,
      },
      [CharacterName.pa]: {
        ...characters[CharacterName.pa],
        room: RoomName.library,
      },
    },
    updateItemsObject: {
      [ItemName.photo]: {
        ...items[ItemName.photo],
        collectable: true,
      },
      [ItemName.blanket]: {
        ...items[ItemName.blanket],
        isVisible: false,
      },
    },
    nextAct: true,
    newHelpText: getText("20"),
  };
};

export const goToAtticFirstTime = (
  items: ItemsCollection,
  characters: CharactersCollection
): InteractionResult => {
  return {
    newCurrentItem: null,
    updateCharactersObject: {
      [CharacterName.ghost]: {
        ...characters[CharacterName.ghost],
        room: RoomName.basement,
      },
    },
    updateItemsObject: {},
  };
};
