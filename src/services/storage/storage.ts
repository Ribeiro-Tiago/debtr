import storage from '@react-native-community/async-storage';

import { StorageData, Item } from '../../types';

const key = 'MPT_DATA';

const get = async () => {
  return JSON.parse(await storage.getItem(key)) as StorageData;
};

const set = async (data: StorageData) => {
  return await storage.setItem(key, JSON.stringify(data));
};

export const getData = async () => get();

export const updateCurrMonth = async (currMonth: number) => {
  const data = await get();

  return !data
    ? set({ amountLeft: 0, items: [], currMonth })
    : set({ ...data, currMonth });
};

export const updateAmount = async (amount: number) => {
  const data = await get();

  set({ ...data, amountLeft: Number(data.amountLeft) + amount });
};

export const updateItems = async (items: Item[]) => {
  const data = await get();

  set({ ...data, items });
};
