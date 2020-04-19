import { MARK_FAVOURITE, REMOVE_FAVOURITE } from "../constants/ActionTypes";

export const markFavourite = (name) => ({
  type: MARK_FAVOURITE,
  name,
});

export const removeFavourite = (name) => ({
  type: REMOVE_FAVOURITE,
  name,
});
