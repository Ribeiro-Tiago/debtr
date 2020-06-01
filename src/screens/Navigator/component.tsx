import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AllExpensesScreen, MonthlyExpensesScreen } from '../../screens';
import { getItems } from '../../services/storage/storage';
import { StorageData, Item } from '../../types';

interface Props {
  setAmountLeft: (amount: number) => void;
  setItems: (items: Item[]) => void;
}

const Tab = createBottomTabNavigator();

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
      <Tab.Navigator>
        <Tab.Screen name="Monthly expenses" component={MonthlyExpensesScreen} />
        <Tab.Screen name="All expenses" component={AllExpensesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
