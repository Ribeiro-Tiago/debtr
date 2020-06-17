import React from "react";
import { View, Text, StyleSheet } from "react-native";
import dayjs from "dayjs";
import Emoji from "react-native-emoji";

import { List, TopBar, ListItem } from "../../components";
import { Item, RenderItemParams } from "../../types";

interface Props {
  items: Item[];
  amountLeft: number;
  reorderItems: (items: Item[]) => void;
  togglePaidStatus: (id: string) => void;
  updateAmountLeft: (amount: number, isPaid: boolean) => void;
}

export default function MonthlyExpenses({
  items,
  amountLeft,
  togglePaidStatus,
  updateAmountLeft,
  reorderItems,
}: Props) {
  const onItemPress = ({ id, isPaid, amount }: Item) => {
    togglePaidStatus(id);
    updateAmountLeft(amount, isPaid);
  };

  const renderItem = (props: RenderItemParams) => {
    return (
      <ListItem
        {...props}
        onPress={onItemPress}
        iconName="ios-checkmark"
        hideIcon={!props.item.isPaid}
      />
    );
  };

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>
          You have no expenses left this month <Emoji name="tada" />
          <Emoji name="tada" />
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TopBar>
        <Text style={styles.title}>{dayjs().format("MMMM YYYY")}</Text>
        <Text style={styles.leftover}>{amountLeft}€ Left</Text>
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
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#581c0c",
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
