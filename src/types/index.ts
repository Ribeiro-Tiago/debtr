import { Item } from "./item";

export * from "./item";

export interface StorageData {
  amountLeft: number;
  currMonth: number;
  items: Item[];
  currency: SupportedCurrencies;
  resetDay: number;
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
  es = "es",
}

export type PickerType = "date" | "time";
