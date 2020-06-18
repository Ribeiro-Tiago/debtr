import React, { useEffect, useContext, useState } from "react";
import { Alert, View } from "react-native";
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
} from "../";
import { getData, updateCurrMonth } from "../../services/storage/storage";
import { StorageData, Item } from "../../types";
import { isCurrentMonth } from "../../utils";
import { i18nContext } from "../../contexts/i18n";

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
  const { i18n } = useContext(i18nContext);
  const [isLoading, setLoading] = useState(true);

  // load stuff from local storage
  // TODO: make this better
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
          setLoading(false);
          return;
        }

        updateCurrMonth(currMonth);
        SplashScreen.hide();
        setLoading(false);
      })
      .catch((error) => {
        SplashScreen.hide();
        setLoading(false);
        let err: string;
        try {
          err = JSON.stringify(error);
        } catch (ex) {
          err = error;
        }

        Alert.alert(i18n.errorTitle, i18n.errMsg(err), [{ text: i18n.close }]);
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

  if (isLoading) {
    return <View />;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={barOptions} tabBarPosition="bottom">
        <Tab.Screen
          name={i18n.monthlyTabName}
          component={MonthlyExpensesScreen}
        />
        <Tab.Screen name={i18n.allTabName} component={buildStackNav} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
