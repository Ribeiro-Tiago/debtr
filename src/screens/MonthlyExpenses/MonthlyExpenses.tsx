import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Emoji from "react-native-emoji";

import { List, TopBar, ListItem } from "../../components";
import { Item, RenderItemParams, SupportedCurrencies } from "../../types";
import { i18nContext } from "../../contexts/i18n";
import { getPlatformIcon } from "../../utils";

interface Props {
  items: Item[];
  amountLeft: number;
  currCurrency: SupportedCurrencies;
  reorderItems: (items: Item[]) => void;
  togglePaidStatus: (id: string) => void;
  updateAmountLeft: (amount: number, isPaid: boolean) => void;
}

export default function MonthlyExpenses({
  items,
  amountLeft,
  currCurrency,
  togglePaidStatus,
  updateAmountLeft,
  reorderItems,
}: Props) {
  const { i18n } = useContext(i18nContext);

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
        iconName={getPlatformIcon(
          props.item.isPaid ? "checkbox-outline" : "square-outline",
        )}
        halfVisible={props.item.isPaid}
        currency={currCurrency}
      />
    );
  };

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>
          {i18n.emptyMonthlyExpenses}
          <Emoji name="tada" />
          <Emoji name="tada" />
        </Text>
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
    justifyContent: "center",
    flex: 1,
  },
  emptyListText: {
    fontSize: 26,
    textAlign: "center",
    marginHorizontal: 30,
    lineHeight: 40,
  },
});
