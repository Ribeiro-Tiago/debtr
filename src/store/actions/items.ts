import {
  ADD_ITEM,
  UPDATE_ITEM,
  REMOVE_ITEM,
  TOGGLE_ITEM_STATUS,
} from './types';
import { Item } from '../../types';

export const addItem = (payload: Item) => ({ type: ADD_ITEM, payload });

export const updateItem = (payload: Item) => ({ type: UPDATE_ITEM, payload });

export const removeItem = (payload: string) => ({ type: REMOVE_ITEM, payload });

export const toggleItemStatus = (payload: string) => ({
  type: TOGGLE_ITEM_STATUS,
  payload,
});
