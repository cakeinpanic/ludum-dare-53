import {
  CharactersCollection,
  Item,
  ItemsCollection,
} from "../components/Game/types";

export interface InteractionResult {
  newCurrentItem?: Item | null;
  updateItemsObject: ItemsCollection;
  updateCharactersObject: CharactersCollection;
  newHelpText?: string | null;
  nextAct?: boolean;
}
