import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  LayoutChangeEvent,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import MonthSelectorItem from "../MonthSelectorItem";
import { Month } from "../../types";
import { months } from "../../utils";

interface Props {
  selectedMonths: Month[];
  updateSelected: (months: Month[]) => void;
}

export default function MonthSelector({
  selectedMonths,
  updateSelected,
}: Props) {
  const [height, setHeight] = useState<Animated.Value>();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [maxHeight, setMaxHeight] = useState<number>(undefined);

  const onUnselect = (id: number) => {
    updateSelected(selectedMonths.filter((item) => item.id !== id));
  };

  const onSelect = (month: Month) => {
    updateSelected([...selectedMonths, month]);
  };

  const toggleHelper = () => {
    const final = isOpen ? 0 : maxHeight;

    setOpen(!isOpen);
    Animated.spring(height, {
      toValue: final,
      bounciness: 0,
      useNativeDriver: false,
    }).start();
  };

  const _setMaxHeight = (event: LayoutChangeEvent) => {
    if (maxHeight === undefined) {
      setMaxHeight(event.nativeEvent.layout.height + 10);
      setHeight(new Animated.Value(0));
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.label}>Months</Text>
        <Icon
          name="ios-help-circle-outline"
          size={26}
          color="#ca5116"
          onPress={toggleHelper}
        />
      </View>

      <Animated.View
        style={maxHeight !== undefined ? { height } : {}}
        onLayout={_setMaxHeight}>
        <Text style={styles.helper}>
          Does this expense only happen in certain months ? Leaving all
          unselected means it happens every month
        </Text>
      </Animated.View>

      <View style={styles.monthWrapper}>
        {months.map((m) => (
          <MonthSelectorItem
            key={m.id}
            label={m.label}
            initialSelected={!!selectedMonths.find(({ id }) => id === m.id)}
            onUnselect={() => onUnselect(m.id)}
            onSelect={() => onSelect(m)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderBottomColor: "#581c0c",
    borderBottomWidth: 0.5,
  },
  container: {
    paddingTop: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    height: 30,
    fontSize: 20,
    fontWeight: "bold",
    color: "#ca5116",
    marginRight: 5,
  },
  monthWrapper: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  helper: {
    fontSize: 16,
    fontStyle: "italic",
  },
});
