import { Item, SupportedCurrencies } from "./";

export interface StoreState {
  items: Item[];
  current: {
    item: Item;
    months: number[];
  };
  amountLeft: number;
  currency: SupportedCurrencies;
}

export interface ReducerAction<T> {
  type: string;
  payload: T;
}
