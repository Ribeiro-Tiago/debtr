import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, Switch } from "react-native";

import FormLabel from "../FormLabel";
import NotificationDatetimePicker from "../NotificationDatetimePicker";
import { i18nContext } from "../../contexts/i18n";
import { PickerType } from "../../types";

interface Props {
  pickerDate: Date;
  initSwitchValue: boolean;
  togglePicker: (type: PickerType) => void;
  toggleNotifStatus: () => void;
}

export default function ({
  initSwitchValue,
  pickerDate,
  togglePicker,
  toggleNotifStatus,
}: Props) {
  const { i18n } = useContext(i18nContext);
  const [isSwitchEnabled, setSwitchEnabled] = useState(initSwitchValue);

  let isDatePicker = false;

  const toggleDatePicker = () => {
    togglePicker("date");
    isDatePicker = true;
  };

  const toggleTimePicker = () => {
    togglePicker("time");
    isDatePicker = false;
  };

  const onSwitchChange = () => {
    toggleNotifStatus();
    setSwitchEnabled(!isSwitchEnabled);
  };

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View style={styles.headerWrapper}>
        <FormLabel label={i18n.expenseNotif} />

        <Switch
          trackColor={{ false: "#ccc", true: "#581c0c" }}
          thumbColor={isSwitchEnabled ? "#f1e3cb" : "#f4f3f4"}
          ios_backgroundColor="#ccc"
          onValueChange={onSwitchChange}
          value={isSwitchEnabled}
        />
      </View>

      {isSwitchEnabled && (
        <>
          <Text style={styles.reminderText}>{i18n.reminderAt(pickerDate)}</Text>

          <View style={styles.buttonWrapper}>
            <Text style={styles.button} onPress={toggleDatePicker}>
              {i18n.reminderChooseDate}
            </Text>

            <Text style={styles.button} onPress={toggleTimePicker}>
              {i18n.reminderChooseHour}
            </Text>
          </View>

          <NotificationDatetimePicker />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  reminderText: {
    marginTop: 10,
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 5,
    borderRadius: 5,
    fontSize: 18,
    marginRight: 15,
    marginBottom: 15,
    minWidth: 70,
    textAlign: "center",
    color: "#581c0c",
  },
  buttonWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 20,
  },
});
