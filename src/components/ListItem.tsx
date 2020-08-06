import React from "react";
import { TouchableWithoutFeedback, View, StyleSheet, Text } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicon from "react-native-vector-icons/Ionicons";

import { Item, SupportedCurrencies } from "../types";
import { formatCurrency } from "../utils/formatters";

const primary = "#581c0c";
const secondary = "#ca5116";

interface Props {
  item: Item;
  iconName: string;
  isBeingDragged: boolean;
  currency: SupportedCurrencies;
  halfVisible?: boolean;
  onPress: (item: Item) => void;
  onDrag: () => void;
  renderTags?: (item: Item) => React.ReactElement;
  onIconPress?: (item: Item) => void;
}
export default function ListItem({
  item,
  iconName,
  isBeingDragged,
  currency,
  halfVisible = false,
  onPress,
  onDrag,
  renderTags,
  onIconPress,
}: Props) {
  let wrapperColor = {};
  let itemColor = {};
  let iconColor = inactiveIcon;

  if (isBeingDragged) {
    wrapperColor = styles.activeWrapper;
    itemColor = styles.activeItem;
    iconColor = activeIcon;
  }

  return (
    <TouchableWithoutFeedback
      key={item.id}
      onLongPress={onDrag}
      onPress={() => onPress(item)}>
      <View
        style={[styles.wrapper, wrapperColor, halfVisible && { opacity: 0.5 }]}>
        <MaterialIcon
          name="drag"
          size={32}
          style={styles.reorder}
          color={iconColor}
        />

        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={[styles.item, itemColor]}>{item.description}</Text>
            <Text style={[styles.item, styles.amount, itemColor]}>
              {formatCurrency(item.amount, currency)}
            </Text>

            <Ionicon
              onPress={() => onIconPress && onIconPress(item)}
              name={iconName}
              size={32}
              color={iconColor}
              style={styles.icon}
            />
          </View>

          {renderTags && renderTags(item)}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const inactiveIcon = primary;
const activeIcon = secondary;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f9b384",
  },
  item: {
    fontSize: 18,
    flex: 1,
    color: primary,
  },
  activeItem: {
    color: secondary,
  },
  amount: {
    width: "25%",
    textAlign: "right",
  },
  icon: {
    width: "20%",
    textAlign: "right",
  },
  infoContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  reorder: {
    marginLeft: 10,
    width: "5%",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
  activeWrapper: {
    backgroundColor: "#f0f0f0",
  },
});
