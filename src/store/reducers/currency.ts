import { SET_CURRENCY, UPDATE_CURRENCY } from "../actions/types";
import { ReducerAction } from "../../types/store";
import { SupportedCurrencies } from "../../types";
import { updateCurrency } from "../../services/storage";

const initState = SupportedCurrencies.EUR;

export default (
  state = initState,
  { type, payload }: ReducerAction<SupportedCurrencies>,
) => {
  switch (type) {
    case SET_CURRENCY: {
      return payload;
    }

    case UPDATE_CURRENCY: {
      updateCurrency(payload);

      return payload;
    }

    default:
      return state;
  }
};
