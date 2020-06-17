import React from "react";
import { TouchableWithoutFeedback, View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { Item } from "../types";

const primary = "#581c0c";
const secondary = "#ca5116";

interface Props {
  item: Item;
  isEven: boolean;
  iconName: string;
  hideIcon?: boolean;
  onPress: (item: Item) => void;
  renderTags?: (item: Item) => React.ReactElement;
  onIconPress?: (item: Item) => void;
}
export default function ListItem({
  item,
  isEven,
  iconName,
  hideIcon,
  onPress,
  renderTags,
  onIconPress,
}: Props) {
  const itemStyle = isEven ? styles.evenItem : styles.oddItem;

  return (
    <TouchableWithoutFeedback key={item.id} onPress={() => onPress(item)}>
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={itemStyle}>{item.description}</Text>
          <Text style={{ ...itemStyle, ...styles.amount }}>{item.amount}€</Text>

          <Icon
            onPress={() => onIconPress(item)}
            name={iconName}
            size={32}
            color={hideIcon ? "transparent" : isEven ? primary : secondary}
            style={styles.icon}
          />
        </View>

        {renderTags && renderTags(item)}
      </View>
    </TouchableWithoutFeedback>
  );
}

const infoItem = {
  fontSize: 18,
  flex: 1,
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f9b384",
  },
  evenItem: {
    ...infoItem,
    color: primary,
  },
  oddItem: {
    ...infoItem,
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
});
