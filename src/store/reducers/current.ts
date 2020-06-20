import { UPDATE_SELECTED_MONTHS, UPDATE_SELECTED_ITEM } from "../actions/types";
import { ReducerAction } from "../../types/store";
import { Item } from "../../types";

interface State {
  months: Item[];
  item: Item;
}

const initState: State = {
  months: [],
  item: null,
};

export default (
  state = initState,
  { type, payload }: ReducerAction<Item | Item[]>,
) => {
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
