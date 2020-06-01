import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarOptions,
} from '@react-navigation/material-top-tabs';

import { AllExpensesScreen, MonthlyExpensesScreen } from '../../screens';
import { getItems } from '../../services/storage/storage';
import { StorageData, Item } from '../../types';

interface Props {
  setAmountLeft: (amount: number) => void;
  setItems: (items: Item[]) => void;
}

const Tab = createMaterialTopTabNavigator();

const barOptions: MaterialTopTabBarOptions = {
  activeTintColor: '#581c0c',
  pressOpacity: 0.8,
  allowFontScaling: true,
  bounces: true,
  style: {
    backgroundColor: '#f1e3cb',
    borderTopColor: '#a6a6a6',
    borderTopWidth: 1,
  },
  indicatorStyle: {
    borderBottomColor: '#581c0c',
    backgroundColor: '#581c0c',
  },
};

export default function ({ setAmountLeft, setItems }: Props) {
  // load stuff from local storage
  useEffect(() => {
    getItems()
      .then((data: StorageData) => {
        if (data) {
          setAmountLeft(data.amountLeft);
          setItems(data.items);

          return;
        }

        setAmountLeft(0);
        setItems([]);
      })
      .catch(console.error);
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={barOptions} tabBarPosition="bottom">
        <Tab.Screen name="Monthly expenses" component={MonthlyExpensesScreen} />
        <Tab.Screen name="All expenses" component={AllExpensesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
