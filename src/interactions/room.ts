import { merge } from "lodash";
import {
  CharacterName,
  CharactersCollection,
  Game,
  Item,
  ItemName,
  ItemsCollection,
} from "../components/Game/types";
import { RoomName } from "../rooms/rooms";
import { getText } from "./texts";
import { InteractionResult } from "./types";

export const moveRoomInteraction = (
  oldRoom: RoomName,
  newRoom: RoomName,
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  gameState: Game
): InteractionResult => {
  const result: InteractionResult = {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: changeMainLocation(
      oldRoom,
      newRoom,
      characters,
      gameState
    ),
    newHelpText: null,
    newSubs: "",
  };

  if (
    gameState.act === 2 &&
    newRoom === RoomName.library &&
    oldRoom === RoomName.bedroom &&
    items[ItemName.blanket].room === RoomName.bedroom &&
    !items[ItemName.blanket].isVisible
  ) {
    return merge(
      { updateCharactersObject: result.updateCharactersObject },
      fatherRunsToTheBird(items, characters)
    );
  }

  if (
    oldRoom === RoomName.basement &&
    gameState.act === 2 &&
    characters[CharacterName.ghost].room === RoomName.basement
  ) {
    return merge(
      { updateCharactersObject: result.updateCharactersObject },
      exitBasementAfterMeetingGhost(items, characters, gameState.act)
    );
  }
  if (newRoom === RoomName.attick) {
    return merge(
      { updateCharactersObject: result.updateCharactersObject },
      goToAtticFirstTime(items, characters, currentItem)
    );
  }

  if (newRoom === RoomName.basement && currentItem?.id === ItemName.key) {
    return merge(
      { updateCharactersObject: result.updateCharactersObject },
      enterBasement(items, characters)
    );
  }

  return result;
};

export const changeMainLocation = (
  oldRoom: RoomName,
  newRoom: RoomName,
  characters: CharactersCollection,
  { act, status }: Game
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
  if (newRoom === RoomName.bedroom) {
    roomPosition = {
      shiftX: -100,
      shiftY: 0,
    };
  }

  if (
    status.uncleFollows &&
      !characters[CharacterName.uncle].isDead &&
    characters[CharacterName.uncle].room === oldRoom &&
    newRoom !== RoomName.basement
  ) {
    uncleUpdate.room = newRoom;
    uncleUpdate.roomPosition = { ...roomPosition };
      uncleUpdate.roomPosition.shiftY -= 70;
    if(newRoom === RoomName.kitchen){
        uncleUpdate.roomPosition.shiftX -= 500;

    } else {
        uncleUpdate.roomPosition.shiftX += 150;
    }
  }

  return {
    ...characters,
    [CharacterName.main]: {
      ...characters[CharacterName.main],
      roomPosition,
      room: newRoom,
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
    updateItemsObject: {
      [ItemName.blanket]: {
        ...items[ItemName.blanket],
        isVisible: true,
        isActive: false,
      },
    },
    newSubs: getText("11"),
  };
};

export const exitBasementAfterMeetingGhost = (
  items: ItemsCollection,
  characters: CharactersCollection,
  act: number
): InteractionResult => {
  return {
    newCurrentItem: null,
    updateCharactersObject: {
      [CharacterName.ghost]: {
        ...characters[CharacterName.ghost],
        room: act === 2 ? RoomName.bedroom : RoomName.basement,
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
    },
    nextAct: true,
    newSubs: getText("20"),
  };
};

export const goToAtticFirstTime = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item
): InteractionResult => {
  return {
    newCurrentItem: currentItem,
    updateCharactersObject: {
      [CharacterName.ghost]: {
        ...characters[CharacterName.ghost],
        room: RoomName.basement,
      },
    },
    updateItemsObject: {
      [ItemName.bourbon]: {
        ...items[ItemName.bourbon],
        collectable: true,
        isVisible: true,
      },
    },
    updatedStatus: { uncleFollows: true },
  };
};

export const enterBasement = (
  items: ItemsCollection,
  characters: CharactersCollection
): InteractionResult => {
  return {
    newCurrentItem: null,
    updateCharactersObject: {},
    updateItemsObject: {},
  };
};
