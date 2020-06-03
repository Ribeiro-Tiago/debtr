import { UPDATE_SELECTED_ITEM, UPDATE_SELECTED_MONTHS } from './types';
import { Item, Month } from '../../types';

export const updateSelected = (payload?: Item) => ({
  type: UPDATE_SELECTED_ITEM,
  payload,
});

export const updateSelectedMonths = (payload: Month[]) => ({
  type: UPDATE_SELECTED_MONTHS,
  payload,
});
