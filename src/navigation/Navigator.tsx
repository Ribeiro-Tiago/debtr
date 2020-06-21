import React, { useEffect, useContext } from "react";
import { Alert, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarOptions,
} from "@react-navigation/material-top-tabs";
import SplashScreen from "react-native-splash-screen";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {
  AllExpensesScreen,
  MonthlyExpensesScreen,
  ExpenseFormScreen,
  SettingsScreen,
} from "../screens";
import { getData, updateCurrMonth as setCurrMonth } from "../services/storage";
import setupNofis from "../services/notifications";
import { StorageData, Item, SupportedCurrencies } from "../types";
import { isCurrentMonth } from "../utils";
import { i18nContext } from "../contexts/i18n";
import { setAmount } from "../store/actions/amountLeft";
import { setItems } from "../store/actions/items";
import { setCurrency } from "../store/actions/currency";

interface Props {
  setAmountLeft: (amount: number) => void;
  setItems: (items: Item[]) => void;
  setCurrency: (currency: SupportedCurrencies) => void;
}

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const barOptions: MaterialTopTabBarOptions = {
  activeTintColor: "#581c0c",
  pressOpacity: 0.8,
  allowFontScaling: true,
  bounces: true,
  showIcon: true,
  showLabel: false,
  iconStyle: { width: 32, height: 32 },
  style: {
    backgroundColor: "#f1e3cb",
    borderTopColor: "#a6a6a6",
    borderTopWidth: 1,
  },
  indicatorStyle: {
    top: 0,
    backgroundColor: "#581c0c",
  },
};

function Navigator({ setAmountLeft, setItems, setCurrency }: Props) {
  const { i18n } = useContext(i18nContext);

  // load stuff from local storage
  // TODO: make this better
  useEffect(() => {
    getData()
      .then((data: StorageData) => {
        setupNofis();
        const currMonth = new Date().getMonth();

        if (!data) {
          setCurrMonth(currMonth);
          setCurrency(SupportedCurrencies.EUR);
          SplashScreen.hide();
          return;
        }

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
          setCurrMonth(currMonth);
        } else {
          setAmountLeft(Number(data.amountLeft));
          setItems(data.items);
        }

        setCurrency(data.currency);

        SplashScreen.hide();
        return;
      })
      .catch((error) => {
        SplashScreen.hide();
        let err: string;
        try {
          err = JSON.stringify(error);
        } catch (ex) {
          err = error;
        }

        console.error(error);
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

  const tabOptions = (icon: string, accessibilityLabel: string) => {
    return {
      tabBarAccessibilityLabel: accessibilityLabel,
      tabBarIcon: ({ focused }: { focused: boolean }) => (
        <Icon
          style={styles.barIcon}
          name={focused ? icon : `${icon}-outline`}
        />
      ),
    };
  };

  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={barOptions} tabBarPosition="bottom">
        <Tab.Screen
          key="monthly"
          name="monthly expenses"
          component={MonthlyExpensesScreen}
          options={tabOptions("home", "Monthly expenses")}
        />
        <Tab.Screen
          key="all"
          name="all expesnes"
          component={buildStackNav}
          options={tabOptions("calendar", "All expenses")}
        />
        <Tab.Screen
          key="settings"
          name="settings"
          component={buildSettingsNav}
          options={tabOptions("settings", "Settings")}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  barIcon: {
    color: "#581c0c",
    fontSize: 32,
  },
});

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setAmountLeft: (amount: number) => dispatch(setAmount(amount)),
    setItems: (items: Item[]) => dispatch(setItems(items)),
    setCurrency: (currency: SupportedCurrencies) => {
      return dispatch(setCurrency(currency));
    },
  };
};

export default connect(null, mapDispatchToProps)(Navigator);
