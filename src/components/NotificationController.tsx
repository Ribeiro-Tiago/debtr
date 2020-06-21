import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Text, Switch } from "react-native";
import TimePicker from "react-native-modal-datetime-picker";
import DatePicker from "react-native-calendar-picker";

import FormLabel from "./FormLabel";
import { i18nContext } from "../contexts/i18n";
import CollapsableView from "./CollapsableView";
import { ItemNotification } from "../types";

interface Props {
  initValue?: ItemNotification;
  onChange: (date?: Date) => void;
}

// This is supposed to be a moment object but there's no reason
// to include that entire library for a simple typing.
// Comes from react-native-calendar-picker
type FakeMoment = any;

export default function ({ onChange, initValue }: Props) {
  const [isSwitchEnabled, setSwitchEnabled] = useState(!!initValue);
  const [isTimeVisible, setTimeVisible] = useState(false);
  const { i18n } = useContext(i18nContext);
  const [datetime, setDatetime] = useState(
    initValue ? new Date(initValue.date) : new Date(),
  );
  const [isDateSelected, setDateSelected] = useState(!!initValue);

  const dateLimits = () => {
    const date = new Date();
    const min = new Date(date.getFullYear(), date.getMonth(), 1);
    const max = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return { minDate: min, maxDate: max };
  };

  const onDateChange = (date: FakeMoment) => {
    setTimeVisible(true);
    datetime.setDate(new Date(date).getDate());
    setDatetime(datetime);
    onChange(datetime);
    !isDateSelected && setDateSelected(true);
  };

  const onTimeSelect = (newTime: Date) => {
    datetime.setHours(newTime.getHours());
    datetime.setMinutes(newTime.getMinutes());
    setDatetime(datetime);
    setTimeVisible(false);
    onChange(datetime);
    !isDateSelected && setDateSelected(true);
  };

  const togglePickers = (newValue: boolean) => {
    if (!newValue) {
      onChange(undefined);
    }

    setSwitchEnabled(newValue);
  };

  return (
    <>
      <View style={styles.headerWrapper}>
        <FormLabel label={i18n.expenseNotif} />

        <Switch
          trackColor={{ false: "#ccc", true: "#581c0c" }}
          thumbColor={isSwitchEnabled ? "#f1e3cb" : "#f4f3f4"}
          ios_backgroundColor="#ccc"
          onValueChange={togglePickers}
          value={isSwitchEnabled}
        />
      </View>
      <TimePicker
        isVisible={isTimeVisible}
        mode="time"
        is24Hour={true}
        onConfirm={onTimeSelect}
        onCancel={() => setTimeVisible(false)}
        cancelTextIOS={i18n.cancel}
        confirmTextIOS={i18n.confirm}
        headerTextIOS={i18n.timePickerTitle}
      />
      {console.log(datetime)}
      {isSwitchEnabled && (
        <View>
          <Text style={styles.reminderText}>
            {isDateSelected
              ? i18n.reminderAt(datetime)
              : i18n.undefinedReminder}
          </Text>

          <DatePicker
            onDateChange={onDateChange}
            startFromMonday={true}
            restrictMonthNavigation={true}
            enableSwipe={false}
            selectedDayColor="#f1e3cb"
            selectedDayStyle={{ backgroundColor: "#f1e3cb" }}
            weekdays={i18n.weekDays}
            monthYearHeaderWrapperStyle={{ display: "none" }}
            initialDate={datetime}
            selectedStartDate={datetime}
            selectedEndDate={datetime}
            todayBackgroundColor="transparent"
            {...dateLimits()}
          />
        </View>
      )}
    </>
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
    top: 10,
    fontSize: 16,
  },
});
