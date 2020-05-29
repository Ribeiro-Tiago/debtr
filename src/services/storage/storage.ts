import { AsyncStorage } from 'react-native';

import { StorageData } from '../../types';

const key = 'MPT_DATA';

export const getItems = async () => {
  JSON.parse(await AsyncStorage.getItem(key)) as StorageData;
};

export const saveItems = async (data: StorageData) => {
  return await AsyncStorage.setItem(key, JSON.stringify(data));
};
