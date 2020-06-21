import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Animated,
  LayoutChangeEvent,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import FormLabel from "../FormLabel";
import MonthSelectorItem from "../MonthSelectorItem";
import { i18nContext } from "../../contexts/i18n";

interface Props {
  selectedMonths: number[];
  updateSelected: (months: number[]) => void;
}

const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function MonthSelector({
  selectedMonths,
  updateSelected,
}: Props) {
  const [height, setHeight] = useState<Animated.Value>();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [maxHeight, setMaxHeight] = useState<number>(-1);
  const { i18n } = useContext(i18nContext);

  const onUnselect = (month: number) => {
    updateSelected(selectedMonths.filter((item) => item !== month));
  };

  const onSelect = (month: number) => {
    updateSelected([...selectedMonths, month]);
  };

  const toggleHelper = () => {
    const final = isOpen ? 0 : maxHeight;

    setOpen(!isOpen);
    Animated.spring(height as Animated.Value, {
      toValue: final,
      bounciness: 0,
      useNativeDriver: false,
    }).start();
  };

  const _setMaxHeight = (event: LayoutChangeEvent) => {
    if (maxHeight === -1) {
      setMaxHeight(event.nativeEvent.layout.height + 10);
      setHeight(new Animated.Value(0));
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <FormLabel label={i18n.months} />
        <Icon
          name="ios-help-circle-outline"
          size={26}
          color="#ca5116"
          onPress={toggleHelper}
        />
      </View>

      <Animated.View
        style={
          maxHeight !== -1
            ? { height, overflow: "hidden" }
            : { overflow: "hidden" }
        }
        onLayout={_setMaxHeight}>
        <Text style={styles.helper}>{i18n.monthsHelper}</Text>
      </Animated.View>

      <View style={styles.monthWrapper}>
        {months.map((m) => (
          <MonthSelectorItem
            key={m}
            label={i18n.monthNames[m]}
            initialSelected={!!selectedMonths.includes(m)}
            onUnselect={() => onUnselect(m)}
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
