import { Item, Month } from './';

export interface StoreState {
  items: Item[];
  current: {
    item: Item;
    months: Month[];
  };
  amountLeft: number;
}

interface ReducerAction {
  type: string;
}

export interface ListReducerAction extends ReducerAction {
  payload: string & Item;
}

export interface AmountLeftReducerAction extends ReducerAction {
  payload: number;
}

export interface CurrentReducerAction extends ReducerAction {
  payload: Item | Item[];
}
