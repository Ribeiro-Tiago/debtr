import { Item } from './';

export interface StoreState {
  items: Item[];
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
