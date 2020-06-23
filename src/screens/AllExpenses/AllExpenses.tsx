import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { TopBar, List, ListItem } from "../../components";
import {
  Item,
  RenderItemParams,
  SupportedCurrencies,
  RemoveItemParams,
} from "../../types";
import { i18nContext } from "../../contexts/i18n";
import { isMonthly } from "../../utils";

interface Props {
  items: Item[];
  currCurrency: SupportedCurrencies;
  reorderItems: (items: Item[]) => void;
  updateCurrent: (item?: Item) => void;
  removeItem: (params: RemoveItemParams) => void;
}

export default function AllExpenses({
  items,
  currCurrency,
  reorderItems,
  updateCurrent,
  removeItem,
}: Props) {
  const { i18n } = useContext(i18nContext);
  const navigation = useNavigation();

  const goToForm = (item?: Item) => {
    updateCurrent(item);
    navigation.navigate("ExpenseForm");
  };

  const onRemove = ({ id, months, amount, notification }: Item) => {
    Alert.alert(
      i18n.confirmDeleteTitle,
      i18n.confirmDeleteDesc,
      [
        {
          text: i18n.confirm,
          onPress: () => {
            return removeItem({
              id,
              months,
              amount,
              notifId: notification && notification.id,
            });
          },
        },
        { text: i18n.cancel },
      ],
      { cancelable: true },
    );
  };

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyContainer}>
        <TouchableWithoutFeedback onPress={() => goToForm()}>
          <View style={styles.createExpenseContainer}>
            <Text style={styles.createExpenseText}>
              {i18n.emptyAllExpenses}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const renderMonths = (months: number[]) => {
    if (isMonthly(months)) {
      return <Text style={styles.tag}>{i18n.monthlyExpense}</Text>;
    }

    return months.map((m) => (
      <Text key={m} style={styles.tag}>
        {i18n.monthNames[m]}
      </Text>
    ));
  };

  const renderListItem = (props: RenderItemParams) => {
    return (
      <ListItem
        {...props}
        onIconPress={onRemove}
        iconName="ios-trash"
        currency={currCurrency}
        onPress={() => goToForm(props.item)}
        renderTags={({ months }) => (
          <View style={styles.tags}>{renderMonths(months)}</View>
        )}
      />
    );
  };

  const renderHeaderButton = () => {
    if (items.length) {
      return (
        <Text onPress={() => goToForm()} style={styles.button}>
          {i18n.create}
        </Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      <TopBar title={i18n.allExpensesTitle}>{renderHeaderButton()}</TopBar>

      <List
        data={items}
        onItemReorder={reorderItems}
        renderEmptyList={renderEmptyList}
        renderListItem={renderListItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    fontSize: 20,
    color: "#581c0c",
  },
  tags: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    fontSize: 12,
    marginRight: 5,
  },
  emptyContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
