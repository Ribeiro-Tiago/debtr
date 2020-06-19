import storage from "@react-native-community/async-storage";

import { StorageData, Item } from "../types";
import { SupportedLocales } from "src/types/context";

type Metadata = {
  amountLeft: number;
  currMonth: number;
};

type SetParams = Metadata | Item[] | SupportedLocales;

type StorageKey = "items" | "metadata" | "locale";

const key = "MPT_DATA";

const get = async () => {
  const items = JSON.parse(await storage.getItem(`${key}_items`));
  const metadata = JSON.parse(await storage.getItem(`${key}_metadata`));

  if (!items && !metadata) {
    return undefined;
  }

  return {
    items: items || [],
    ...(metadata && { ...metadata }),
  } as StorageData;
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

export const getLocale = async () => {
  return (await storage.getItem(`${key}_locale`)) as SupportedLocales;
};

export const updateLocale = async (locale: SupportedLocales) => {
  return await set("locale", locale);
};
