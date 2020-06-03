import { UPDATE_SELECTED_MONTHS, UPDATE_SELECTED_ITEM } from '../actions/types';
import { CurrentReducerAction } from '../../types/store';
import { Item } from '../../types';

const initState = {
  months: [],
  item: null,
};

export default (state = initState, { type, payload }: CurrentReducerAction) => {
  switch (type) {
    case UPDATE_SELECTED_MONTHS: {
      return { ...state, months: payload };
    }

    case UPDATE_SELECTED_ITEM: {
      if (!payload) {
        return { item: null, months: [] };
      }

      return { item: payload, months: (payload as Item).months };
    }

    default:
      return state;
  }
};
