export interface ItemNotification {
  id: string;
  date: Date;
}

export interface ItemCreation {
  description: string;
  amount: number;
  months: number[];
  notification?: ItemNotification;
}

export interface Item extends ItemCreation {
  id: string;
  isPaid: boolean;
  notification: ItemNotification;
}

export interface StorageData {
  amountLeft: number;
  currMonth: number;
  items: Item[];
  currency: SupportedCurrencies;
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
  en = "en",
  pt = "pt",
}
