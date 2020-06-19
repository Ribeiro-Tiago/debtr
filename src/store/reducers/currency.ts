import { UPDATE_CURRENCY } from "../actions/types";
import { ReducerAction } from "../../types/store";
import { SupportedCurrencies } from "../../types";

const initState = SupportedCurrencies.EUR;

export default (
  state = initState,
  { type, payload }: ReducerAction<SupportedCurrencies>,
) => {
  switch (type) {
    case UPDATE_CURRENCY: {
      return payload;
    }

    default:
      return state;
  }
};
