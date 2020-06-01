import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';

import store from './store';
import { AllExpensesScreen, MonthlyExpensesScreen } from './screens';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Monthly expenses"
            component={MonthlyExpensesScreen}
          />
          <Tab.Screen name="All expenses" component={AllExpensesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
