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
  isEven: boolean;
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
  isEven,
  iconName,
  hideIcon,
  isBeingDragged,
  onPress,
  onDrag,
  renderTags,
  onIconPress,
}: Props) {
  const [animatedValue] = useState(new Animated.Value(0));
  const itemStyle = isEven ? styles.evenItem : styles.oddItem;

  const render = () => {
    return (
      <TouchableWithoutFeedback
        key={item.id}
        onLongPress={onDrag}
        onPress={() => onPress(item)}>
        <View style={styles.wrapper}>
          <Icon
            name={getPlatformIcon("reorder")}
            size={32}
            style={styles.reoder}
          />

          <View style={styles.container}>
            <View style={styles.infoContainer}>
              <Text style={itemStyle}>{item.description}</Text>
              <Text style={[itemStyle, styles.amount]}>{item.amount}€</Text>

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
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return render();
}

const infoItem = {
  fontSize: 18,
  flex: 1,
};

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
  reoder: {
    marginLeft: 10,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
});
