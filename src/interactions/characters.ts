import { sample } from "lodash";
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

export const clickOnCharacterInteraction = (
  characterName: CharacterName,
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  game: Game
): InteractionResult => {
  const { act } = game;
  const result: InteractionResult = {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: {},
    newHelpText: null,
    newSubs: null,
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

  if (characterName === "pa") {
    return talkToFather(items, characters, currentItem, act);
  }

  if (characterName === CharacterName.ghost) {
    if (currentItem?.id === "photo") {
      return showPhotoToGhost(items, characters, currentItem, act);
    }
    if (characters[CharacterName.uncle].isDead) {
      return talkToGhostWhenUncleDead(items, characters, currentItem, act);
    }
    if (characters[CharacterName.uncle].isSaidHi) {
      return talkToGhostWhenUncleFollows(items, characters, currentItem, act);
    }

    return talkToGhost(items, characters, currentItem, act, game);
  }
  if (characterName === CharacterName.uncle) {
    if (currentItem?.id === ItemName.poisonedDrink) {
      return killUncle(items, characters, currentItem, act);
    }

    if (characters[CharacterName.uncle].isDead) {
      return result;
    }

    if (!characters[CharacterName.uncle].isSaidHi) {
      return talkToUncleInitial(items, characters, currentItem, act);
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
    newSubs: getText("2"),
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
      [ItemName.blanket]: { ...items[ItemName.blanket], collectable: false },
    },
    updateCharactersObject: {
      ma: {
        ...characters["ma"],
        room: RoomName.kitchen,
        roomPosition: { shiftX: -20, shiftY: 0 },
      },
    },
    newSubs: getText("3"),
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
    newSubs: getText("1"),
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
    newSubs:
      act === 3
        ? sample([
            getText("SHIT_MA_SAYS_act_3_1"),
            getText("SHIT_MA_SAYS_act_3_2"),
          ])
        : getText("7"),
  };
};

const talkToFather = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  let newSubs =
    act === 3
      ? sample([
          getText("SHIT_PA_SAYS_act_3_1"),
          getText("SHIT_PA_SAYS_act_3_2"),
        ])
      : getText("SHIT_PA_SAYS_act_2_1");

  if (act === 2 && characters[CharacterName.pa].room === RoomName.bedroom) {
    newSubs = getText("SHIT_PA_SAYS_act_2_2");
  }
  return {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: {},
    newSubs,
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
    newSubs:
      act === 3
        ? getText("22")
        : act === 2
        ? sample([
            getText("SHIT_SISTER_SAYS_act_2_1"),
            getText("SHIT_SISTER_SAYS_act_2_2"),
          ])
        : getText("4"),
  };
};
const talkToGhost = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number,
  { status }: Game
): InteractionResult => {
  let newSubs = getText("19");
  if (act === 3) {
    if (characters[CharacterName.ghost].room === RoomName.basement) {
      newSubs = getText("GHOST_IN_THE_BASEMENT");
    } else {
      newSubs = status.atticIsHidden
        ? getText("21")
        : getText("GHOST_AFTER_OPENING");
    }
  }
  return {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: {},
    newSubs,
  };
};

const talkToGhostWhenUncleFollows = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  return {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: {},
    newSubs: getText("GHOST_UNCLE_FOLLOW_SAYS"),
  };
};

const talkToGhostWhenUncleDead = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  return {
    newCurrentItem: currentItem,
    updateItemsObject: {
      [ItemName.table]: {
        ...items[ItemName.table],
        isActive: true,
      },
    },
    updateCharactersObject: {},
    newSubs: getText("GHOST_UNCLE_DEAD_SAYS"),
  };
};

const rememberAll = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  return {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: {},
    newSubs: getText("SECRET_COMES_TRUE"),
  };
};

const talkToUncleInitial = (
  items: ItemsCollection,
  characters: CharactersCollection,
  currentItem: Item,
  act: number
): InteractionResult => {
  return {
    newCurrentItem: currentItem,
    updateItemsObject: {},
    updateCharactersObject: {
      uncle: {
        ...characters[CharacterName.uncle],
        isSaidHi: true,
      },
    },
    newSubs: getText("SHIT_UNCLE_SAYS_INITIAL"),
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
    updateCharactersObject: {
      uncle: {
        ...characters[CharacterName.uncle],
      },
    },
    newSubs: sample([
      getText("SHIT_UNCLE_SAYS_1"),
      getText("SHIT_UNCLE_SAYS_2"),
      getText("SHIT_UNCLE_SAYS_4"),
    ]),
  };
};

export const uncleTalksWhenMove = () => {
  return {
    newSubs: sample([
      getText("SHIT_UNCLE_SAYS_1"),
      getText("SHIT_UNCLE_SAYS_2"),
      getText("SHIT_UNCLE_SAYS_3"),
      getText("SHIT_UNCLE_SAYS_4"),
    ]),
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
    newSubs: getText("24"),
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
        roomPosition: {
          shiftY: 0,
          shiftX: characters[CharacterName.uncle].roomPosition.shiftX,
        },
      },
      [CharacterName.ghost]: {
        ...characters[CharacterName.ghost],
        room: RoomName.attick,
        roomPosition: {
          shiftX: -230 + 109,
          shiftY: 0,
        },
      },
    },
    newSubs: getText("28"),
    updatedStatus: { uncleFollows: false },
  };
};
