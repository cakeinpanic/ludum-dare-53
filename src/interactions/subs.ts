import { getText } from "./texts";

export const clickOnSubs = (currentSubTest: string): string => {
  if (currentSubTest === getText("GHOST_UNCLE_DEAD_SAYS")) {
    return getText("SECRET_COMES_TRUE");
  }
  if (currentSubTest === getText("28")) {
    return getText("GO_TO_ATTICK");
  }
  return "";
};
