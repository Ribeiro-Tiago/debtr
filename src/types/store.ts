import { Item } from './';

export interface ListReducerAction {
  type: string;
  payload: string & Item;
}
