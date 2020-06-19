export interface ItemCreation {
  description: string;
  amount: number;
  months: Month[];
}

export interface Item extends ItemCreation {
  id: string;
  isPaid: boolean;
}

export interface StorageData {
  amountLeft: number;
  currMonth: number;
  items: Item[];
  currency: SupportedCurrencies;
}

export interface Month {
  id: number;
  label: string;
}

export interface RenderItemParams {
  item: Item;
  isBeingDragged: boolean;
  onDrag: () => void;
}

export enum SupportedCurrencies {
  EUR = "EUR",
  USD = "USD",
  GBP = "GBP",
}

export enum SupportedLocales {
  en_GB = "en_GB",
  pt_PT = "pt_PT",
}
