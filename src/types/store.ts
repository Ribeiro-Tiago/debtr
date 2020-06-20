import { Item, Month, SupportedCurrencies } from "./";

export interface StoreState {
  items: Item[];
  current: {
    item: Item;
    months: Month[];
  };
  amountLeft: number;
  currency: SupportedCurrencies;
}

export interface ReducerAction<T> {
  type: string;
  payload: T;
}
