import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Emoji from "react-native-emoji";
import { useNavigation } from "@react-navigation/native";

import { List, TopBar, ListItem } from "../../components";
import { Item, RenderItemParams, SupportedCurrencies } from "../../types";
import { i18nContext } from "../../contexts/i18n";
import { getPlatformIcon } from "../../utils";
import { ROUTES } from "../../navigation/routes";

interface Props {
  items: Item[];
  amountLeft: number;
  currCurrency: SupportedCurrencies;
  hasItems: boolean;
  reorderItems: (items: Item[]) => void;
  togglePaidStatus: (id: string) => void;
  updateAmountLeft: (amount: number, isPaid: boolean) => void;
}

export default function MonthlyExpenses({
  items,
  amountLeft,
  currCurrency,
  hasItems,
  togglePaidStatus,
  updateAmountLeft,
  reorderItems,
}: Props) {
  const { i18n } = useContext(i18nContext);
  const { navigate } = useNavigation();

  const onItemPress = ({ id, isPaid, amount }: Item) => {
    togglePaidStatus(id);
    updateAmountLeft(amount, isPaid);
  };

  const getTitle = () => {
    const d = new Date();

    return `${i18n.monthNames[d.getMonth()]} ${d.getFullYear()}`;
  };

  const renderItem = (props: RenderItemParams) => {
    return (
      <ListItem
        {...props}
        onPress={onItemPress}
        onIconPress={onItemPress}
        iconName={getPlatformIcon(
          props.item.isPaid ? "checkbox-outline" : "square-outline",
        )}
        halfVisible={props.item.isPaid}
        currency={currCurrency}
      />
    );
  };

  const renderEmptyList = () => {
    if (hasItems) {
      return (
        <View style={styles.emptyListContainer}>
          <Text style={styles.emptyListText}>
            {i18n.emptyMonthlyExpenses}&nbsp;
            <Emoji name="tada" />
            <Emoji name="tada" />
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.noExpensesEmptyListContainer}>
        <Text style={styles.emptyListText}>{i18n.noMonthlyExpenses}</Text>

        <TouchableWithoutFeedback onPress={() => navigate(ROUTES.EXPENSE_FORM)}>
          <View style={styles.createExpenseContainer}>
            <Text style={styles.createExpenseText}>
              {i18n.emptyAllExpenses}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TopBar title={getTitle()}>
        <Text style={styles.leftover}>
          {i18n.amountLeft(amountLeft, currCurrency)}
        </Text>
      </TopBar>

      <List
        data={items}
        onItemReorder={reorderItems}
        renderEmptyList={renderEmptyList}
        renderListItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  leftover: {
    fontSize: 16,
    color: "#581c0c",
  },
  emptyListContainer: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  noExpensesEmptyListContainer: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-evenly",
  },
  emptyListText: {
    fontSize: 26,
    textAlign: "center",
    marginHorizontal: 30,
    lineHeight: 40,
  },
  createExpenseContainer: {
    borderRadius: 10,
    backgroundColor: "#f1e3cb",
    padding: 10,
    borderColor: "#581c0c",
    borderWidth: 1,
  },
  createExpenseText: {
    fontSize: 24,
    textAlign: "center",
    lineHeight: 40,
    color: "#581c0c",
  },
});
