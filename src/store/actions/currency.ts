import { SET_CURRENCY, UPDATE_CURRENCY } from "./types";
import { SupportedCurrencies } from "../../types";

export const updateCurrency = (payload: SupportedCurrencies) => ({
  type: UPDATE_CURRENCY,
  payload,
});

export const setCurrency = (payload: SupportedCurrencies) => ({
  type: SET_CURRENCY,
  payload,
});
