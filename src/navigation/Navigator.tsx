import React, { useEffect, useContext } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import SplashScreen from "react-native-splash-screen";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Sentry from "@sentry/react-native";
import Animated from "react-native-reanimated";

import {
  AllExpensesScreen,
  MonthlyExpensesScreen,
  ExpenseFormScreen,
  SettingsScreen,
} from "../screens";
import { getData, updateCurrMonth as setCurrMonth } from "../services/storage";
import setupNofis, {
  checkNotifsForReschedule,
} from "../services/notifications";
import { TabBarButton } from "../components";
import { StorageData, Item, SupportedCurrencies } from "../types";
import { isCurrentMonth } from "../utils";
import { i18nContext } from "../contexts/i18n";
import { setAmount } from "../store/actions/amountLeft";
import { setItems } from "../store/actions/items";
import { setCurrency } from "../store/actions/currency";
import { ROUTES } from "./routes";
import { navigationRef, navigate } from "./externalNavigate";

interface Props {
  setAmountLeft: (amount: number) => void;
  setItems: (items: Item[]) => void;
  setCurrency: (currency: SupportedCurrencies) => void;
}

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const renderTabBar = ({
  state,
  navigation,
  position,
}: MaterialTopTabBarProps) => {
  const icons: any = { expenses: "home", settings: "cog" };
  const inputRange = state.routes.map((_, i) => i);

  console.log(
    "render tabbar",
    state.routes.map((r) => r.state),
  );

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        console.log(route);

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map((i: number) => (i === index ? 1 : 0.6)),
        });

        const isActive = index === state.index;

        // type as any to avoid unnecessary import.
        // typing is StyleProp<ViewStyle>
        const viewStyle: any = {
          flexDirection: "row-reverse",
          justifyContent: "flex-end",
        };

        const isSecondTab = index === 1;

        return (
          <TouchableWithoutFeedback
            key={route.key}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            onPress={onPress}>
            <Animated.View
              style={[styles.tab, isSecondTab && viewStyle, { opacity }]}>
              <Icon
                style={styles.barIcon}
                name={
                  isActive ? icons[route.name] : `${icons[route.name]}-outline`
                }
              />

              <Text
                style={[
                  styles.tabText,
                  isSecondTab && { marginRight: 10, marginLeft: 0 },
                ]}>
                {route.name}
              </Text>
            </Animated.View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

function Navigator({ setAmountLeft, setItems, setCurrency }: Props) {
  const { i18n } = useContext(i18nContext);

  // load stuff from local storage
  // TODO: make this better
  useEffect(() => {
    getData()
      .then((data: StorageData) => {
        setupNofis();
        checkNotifsForReschedule();
        const currMonth = new Date().getMonth();

        if (!data) {
          setCurrMonth(currMonth);
          setCurrency(SupportedCurrencies.EUR);
          SplashScreen.hide();
          return;
        }

        data.items = data.items.filter((i) => !i.toRemove);

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
        Sentry.captureException(error);
        SplashScreen.hide();
        Alert.alert(i18n.errTitle, i18n.errMsg, [{ text: i18n.close }]);
      });
  }, []);

  const buildTabNav = () => {
    return (
      <>
        <TabBarButton />

        <Tab.Navigator tabBarPosition="bottom" tabBar={renderTabBar}>
          <Tab.Screen name="expenses" component={MonthlyExpensesScreen} />

          <Tab.Screen name="settings" component={SettingsScreen} />
        </Tab.Navigator>
      </>
    );
  };

  const buildStackNav = () => {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name={ROUTES.MONHTLY_EXPENSES} component={buildTabNav} />

        <Stack.Screen
          name={ROUTES.ALL_EXPENSES}
          component={AllExpensesScreen}
        />
        <Stack.Screen
          name={ROUTES.EXPENSE_FORM}
          component={ExpenseFormScreen}
        />
      </Stack.Navigator>
    );
  };

  // const buildSettingsNav = () => {
  //   return buildStackNav(
  //     () => <Stack.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />,
  //     ROUTES.SETTINGS,
  //   );
  // };

  // const buildExpensesNav = () => {
  //   return buildStackNav(
  //     () => (
  //       <Stack.Screen
  //         name={ROUTES.MONHTLY_EXPENSES}
  //         component={MonthlyExpensesScreen}
  //       />
  //     ),
  //     ROUTES.MONHTLY_EXPENSES,
  //   );
  // };

  return (
    <Sentry.ErrorBoundary>
      <NavigationContainer ref={navigationRef}>
        {buildStackNav()}
      </NavigationContainer>
    </Sentry.ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    backgroundColor: "#f1e3cb",
    borderTopColor: "#a6a6a6",
    borderTopWidth: 1,
    zIndex: 9999,
  },
  tab: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  barIcon: {
    color: "#581c0c",
    fontSize: 32,
  },
  tabText: {
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "400",
    marginLeft: 10,
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
