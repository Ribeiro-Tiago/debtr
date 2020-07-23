import {
  SET_ITEMS,
  ADD_ITEM,
  UPDATE_ITEM,
  REMOVE_ITEM,
  TOGGLE_ITEM_STATUS,
  HIDE_FOR_REMOVAL,
  UNDO_REMOVAL,
} from "./types";
import { Item, ItemCreation } from "../../types";

export const setItems = (payload: Item[]) => ({ type: SET_ITEMS, payload });

export const addItem = (payload: ItemCreation) => ({ type: ADD_ITEM, payload });

export const updateItem = (payload: Item) => ({ type: UPDATE_ITEM, payload });

export const removeItem = (payload: string) => ({ type: REMOVE_ITEM, payload });

export const toggleItemStatus = (payload: string) => ({
  type: TOGGLE_ITEM_STATUS,
  payload,
});

export const hideForRemoval = (payload: string) => ({
  type: HIDE_FOR_REMOVAL,
  payload,
});

export const undoRemoval = (payload: string) => ({
  type: UNDO_REMOVAL,
  payload,
});
