import { Item } from './';

export interface StoreState {
  items: Item[];
  amountLeft: number;
}

export interface ListReducerAction {
  type: string;
  payload: string & Item;
}
