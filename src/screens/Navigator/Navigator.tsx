import React, { useEffect } from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarOptions,
} from "@react-navigation/material-top-tabs";
import SplashScreen from "react-native-splash-screen";

import {
  AllExpensesScreen,
  MonthlyExpensesScreen,
  ExpenseFormScreen,
} from "..";
import { getData, updateCurrMonth } from "../../services/storage/storage";
import { StorageData, Item } from "../../types";
import { isCurrentMonth } from "../../utils";

interface Props {
  setAmountLeft: (amount: number) => void;
  setItems: (items: Item[]) => void;
}

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const barOptions: MaterialTopTabBarOptions = {
  activeTintColor: "#581c0c",
  pressOpacity: 0.8,
  allowFontScaling: true,
  bounces: true,
  style: {
    backgroundColor: "#f1e3cb",
    borderTopColor: "#a6a6a6",
    borderTopWidth: 1,
  },
  indicatorStyle: {
    borderBottomColor: "#581c0c",
    backgroundColor: "#581c0c",
  },
};

export default function ({ setAmountLeft, setItems }: Props) {
  // load stuff from local storage
  useEffect(() => {
    getData()
      .then((data: StorageData) => {
        const currMonth = new Date().getMonth();

        if (data) {
          if (data.currMonth !== currMonth) {
            const { items, amountLeft } = data.items.reduce(
              (accu, curr) => {
                if (isCurrentMonth(curr.months)) {
                  accu.amountLeft += curr.amount;
                }

                return {
                  items: [...accu.items, { ...curr, isPaid: false }],
                  amountLeft: accu.amountLeft,
                };
              },
              { items: [], amountLeft: 0 },
            );

            setItems(items);
            setAmountLeft(amountLeft);
            updateCurrMonth(currMonth);
          } else {
            setAmountLeft(Number(data.amountLeft));
            setItems(data.items);
          }

          SplashScreen.hide();
          return;
        }

        updateCurrMonth(currMonth);
        SplashScreen.hide();
      })
      .catch((error) => {
        SplashScreen.hide();
        let err: string;
        try {
          err = JSON.stringify(error);
        } catch (ex) {
          err = error;
        }

        Alert.alert(
          "Error",
          `An unexpected error ocurred retrieving your expenses. \n\nIf it persists contact support with the following message: \n\n${err}`,
          [{ text: "Close" }],
        );
      });
  }, []);

  const buildStackNav = () => {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="ExpenseListing" component={AllExpensesScreen} />
        <Stack.Screen name="ExpenseForm" component={ExpenseFormScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={barOptions} tabBarPosition="bottom">
        <Tab.Screen name="Monthly expenses" component={MonthlyExpensesScreen} />
        <Tab.Screen name="All expenses" component={buildStackNav} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
