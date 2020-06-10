import { nanoid } from "nanoid/non-secure";

import {
  TOGGLE_ITEM_STATUS,
  REMOVE_ITEM,
  UPDATE_ITEM,
  ADD_ITEM,
  SET_ITEMS,
} from "../actions/types";
import { Item, ItemCreation } from "../../types";
import { ListReducerAction } from "../../types/store";
import { updateItems } from "../../services/storage/storage";
import { sanitizeAmount, formatDecimal } from "../../utils";

const initState: Item[] = [];

export default (state = initState, { type, payload }: ListReducerAction) => {
  switch (type) {
    case SET_ITEMS: {
      return payload;
    }

    case ADD_ITEM: {
      const items = [
        ...state,
        {
          ...(payload as ItemCreation),
          id: nanoid(),
          isPaid: false,
          amount: formatDecimal(sanitizeAmount(payload.amount)),
        },
      ];

      updateItems(items);

      return items;
    }

    case UPDATE_ITEM: {
      const items = state.map((item) => {
        return item.id === payload.id ? payload : item;
      });

      updateItems(items);

      return items;
    }

    case TOGGLE_ITEM_STATUS: {
      const items = state.map((item) => {
        return item.id === payload ? { ...item, isPaid: !item.isPaid } : item;
      });

      updateItems(items);

      return items;
    }

    case REMOVE_ITEM: {
      const items = state.filter(({ id }) => id !== payload);

      updateItems(items);

      return items;
    }

    default:
      return state;
  }
};
