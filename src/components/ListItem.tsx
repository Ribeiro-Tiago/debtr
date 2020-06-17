import React, { useState } from "react";
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Text,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { Item } from "../types";
import { getPlatformIcon } from "../utils";

const primary = "#581c0c";
const secondary = "#ca5116";

interface Props {
  item: Item;
  iconName: string;
  hideIcon?: boolean;
  isBeingDragged: boolean;
  onPress: (item: Item) => void;
  onDrag: () => void;
  renderTags?: (item: Item) => React.ReactElement;
  onIconPress?: (item: Item) => void;
}
export default function ListItem({
  item,
  iconName,
  hideIcon,
  isBeingDragged,
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
      <View style={[styles.wrapper, wrapperColor]}>
        <Icon
          name={getPlatformIcon("reorder")}
          size={32}
          style={styles.reorder}
          color={iconColor}
        />

        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={[styles.item, itemColor]}>{item.description}</Text>
            <Text style={[styles.item, styles.amount, itemColor]}>
              {item.amount}€
            </Text>

            <Icon
              onPress={() => onIconPress(item)}
              name={iconName}
              size={32}
              color={hideIcon ? "transparent" : iconColor}
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
