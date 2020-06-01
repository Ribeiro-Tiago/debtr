import storage from '@react-native-community/async-storage';

import { StorageData } from '../../types';

const key = 'MPT_DATA';

export const getItems = async () => {
  return JSON.parse(await storage.getItem(key)) as StorageData;
};

export const saveItems = async (data: StorageData) => {
  return await storage.setItem(key, JSON.stringify(data));
};
