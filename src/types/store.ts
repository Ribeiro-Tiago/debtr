import {Item, SupportedCurrencies, PickerType} from "./";

export interface StoreState {
  items: Item[];
  current: {
    item: Item;
    months: number[];
  };
  amountLeft: number;
  currency: SupportedCurrencies;
  notification: {
    pickerType: PickerType;
    isPickerVisible: boolean;
    pickerValue: Date;
    isEnabled: boolean;
  };
  settings: {
    resetDay: number;
  };
}

export interface ReducerAction<T> {
  type: string;
  payload: T;
}
