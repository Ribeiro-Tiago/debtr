import React, { useEffect, useContext } from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarOptions,
} from "@react-navigation/material-top-tabs";
import SplashScreen from "react-native-splash-screen";
import { connect } from "react-redux";

import {
  AllExpensesScreen,
  MonthlyExpensesScreen,
  ExpenseFormScreen,
  SettingsScreen,
} from "../screens";
import { getData, updateCurrMonth } from "../services/storage/storage";
import { StorageData, Item } from "../types";
import { isCurrentMonth } from "../utils";
import { i18nContext } from "../contexts/i18n";
import { setAmount } from "../store/actions/amountLeft";
import { setItems } from "../store/actions/items";

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

function Navigator({ setAmountLeft, setItems }: Props) {
  const { i18n } = useContext(i18nContext);

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

        Alert.alert(i18n.errTitle, i18n.errMsg(err), [{ text: i18n.close }]);
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

  const buildSettingsNav = () => {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={barOptions} tabBarPosition="bottom">
        <Tab.Screen
          name={i18n.monthlyTabName}
          component={MonthlyExpensesScreen}
        />
        <Tab.Screen name={i18n.allTabName} component={buildStackNav} />
        <Tab.Screen name={i18n.settings} component={buildSettingsNav} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setAmountLeft: (amount: number) => dispatch(setAmount(amount)),
    setItems: (items: Item[]) => dispatch(setItems(items)),
  };
};

export default connect(null, mapDispatchToProps)(Navigator);
