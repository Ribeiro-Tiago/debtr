import React, { useState, useEffect, useContext } from "react";
import {
  Animated,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { PickerType } from "../../types";
import { i18nContext } from "../../contexts/i18n";

interface Props {
  isVisible: boolean;
  pickerType: PickerType;
  pickerDate: Date;
  updatePickerValue: (date: Date) => void;
  togglePicker: () => void;
}

const dateLimits = () => {
  const date = new Date();
  const min = new Date(date.getFullYear(), date.getMonth(), 1, 0);
  const max = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return { minimumDate: min, maximumDate: max };
};

export default function ({
  pickerType,
  pickerDate,
  isVisible,
  updatePickerValue,
  togglePicker,
}: Props) {
  const pickerHiddenPosition = Dimensions.get("window").height;

  const [date, setDate] = useState(pickerDate);
  const [top] = useState(new Animated.Value(pickerHiddenPosition));
  const { i18n } = useContext(i18nContext);

  const onConfirm = (d = date) => updatePickerValue(d);

  const onCancel = () => togglePicker();

  /* TODO: enable when deployed to ios as well
  useEffect(() => {
    const to = isVisible ? 20 : pickerHiddenPosition;
    const from = top;

    Animated.spring(from, {
      toValue: to,
      bounciness: 0,
      useNativeDriver: false,
      speed: 2,
    }).start();
  }, [isVisible]); */

  const onChangeAndroid = (date?: Date) => {
    if (date) {
      return onConfirm(date);
    }

    onCancel();
  };

  /* TODO: enable when deployed to ios as well
  const render = () => {
    if (Platform.OS === "ios") {
      return (
        <Animated.View style={[styles.wrapper, { top }]}>
          <View style={styles.buttonWrapper}>
            <Text onPress={onCancel} style={styles.button}>
              {i18n.cancel}
            </Text>
            <Text
              onPress={() => onConfirm()}
              style={[styles.button, { fontWeight: "bold" }]}>
              {i18n.confirm}
            </Text>
          </View>

          <DateTimePicker
            value={date}
            is24Hour={true}
            mode={pickerType}
            display="default"
            onChange={(ev, d) => setDate(d)}
            {...(pickerType === "date" && dateLimits())}
          />
        </Animated.View>
      );
    }

    return (
      <DateTimePicker
        value={date}
        is24Hour={true}
        mode={pickerType}
        display="default"
        onChange={(ev, d) => onChangeAndroid(d)}
        {...(pickerType === "date" && dateLimits())}
      />
    );
  }; */

  return (
    <DateTimePicker
      value={date}
      is24Hour={true}
      mode={pickerType}
      display="default"
      onChange={(ev, d) => onChangeAndroid(d)}
      {...(pickerType === "date" && dateLimits())}
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#f1f1f1",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    borderTopColor: "#000",
    borderTopWidth: 0.5,
  },
  button: {
    color: "#581c0c",
    fontSize: 20,
  },
  buttonWrapper: {
    marginTop: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
});
