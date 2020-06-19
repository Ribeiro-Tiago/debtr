import { UPDATE_CURRENCY } from "./types";
import { SupportedCurrencies } from "../../types";

export const updateCurrency = (payload: SupportedCurrencies) => ({
  type: UPDATE_CURRENCY,
  payload,
});
