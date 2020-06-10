import {
  SUBTRACT_AMOUNT_LEFT,
  ADD_AMOUNT_LEFT,
  SET_AMOUNT_LEFT,
} from "../actions/types";
import { AmountLeftReducerAction } from "../../types/store";
import { updateAmount } from "../../services/storage/storage";
import { sanitizeAmount, formatDecimal } from "../../utils";

const initState = 0;

export default (
  state = initState,
  { type, payload }: AmountLeftReducerAction,
) => {
  switch (type) {
    case SET_AMOUNT_LEFT: {
      return formatDecimal(payload);
    }

    case ADD_AMOUNT_LEFT: {
      const amount = formatDecimal(Number(state) + sanitizeAmount(payload));

      updateAmount(amount);

      return amount;
    }

    case SUBTRACT_AMOUNT_LEFT: {
      const amount = formatDecimal(Number(state) - sanitizeAmount(payload));

      updateAmount(amount);

      return amount;
    }

    default:
      return state;
  }
};
