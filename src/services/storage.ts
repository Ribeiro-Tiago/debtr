import storage from "@react-native-community/async-storage";

import {
  StorageData,
  Item,
  SupportedLocales,
  SupportedCurrencies,
} from "../types";

type Metadata = {
  amountLeft: number;
  currMonth: number;
};

type SetParams = Metadata | Item[] | SupportedLocales | SupportedCurrencies;

type StorageKey = "items" | "metadata" | "locale" | "currency";

const key = "MPT_DATA";

const get = async (): Promise<StorageData> => {
  const [items, metadata, currency] = await Promise.all([
    storage.getItem(`${key}_items`),
    storage.getItem(`${key}_metadata`),
    storage.getItem(`${key}_currency`),
  ]);

  if (!items && !metadata && !currency) {
    return undefined;
  }

  return {
    items: JSON.parse(items) || [],
    currency: currency || SupportedCurrencies.EUR,
    ...(metadata && { ...JSON.parse(metadata) }),
  };
};

const set = async (subkey: StorageKey, data: SetParams) => {
  const stringified = typeof data === "string" ? data : JSON.stringify(data);

  return await storage.setItem(`${key}_${subkey}`, stringified);
};

export const getData = async () => get();

export const updateCurrMonth = async (currMonth: number) => {
  const data = await get();

  return !data
    ? set("metadata", { amountLeft: 0, currMonth })
    : set("metadata", { amountLeft: data.amountLeft, currMonth });
};

export const updateAmount = async (amount: number) => {
  return set("metadata", {
    currMonth: new Date().getMonth(),
    amountLeft: Number(amount.toFixed(2)),
  });
};

export const updateItems = async (items: Item[]) => {
  return set("items", items);
};

export const getLocale = async (): Promise<SupportedLocales> => {
  return (await storage.getItem(`${key}_locale`)) as SupportedLocales;
};

export const updateLocale = async (locale: SupportedLocales) => {
  return await set("locale", locale);
};

export const updateCurrency = async (currency: SupportedCurrencies) => {
  return await set("currency", currency);
};
