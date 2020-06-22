import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Text, Switch } from "react-native";
import TimePicker from "react-native-modal-datetime-picker";
import DatePicker from "react-native-calendar-picker";

import FormLabel from "./FormLabel";
import { i18nContext } from "../contexts/i18n";
import { ItemNotification } from "../types";

interface Props {
  initValue?: ItemNotification;
  onChange: (date?: Date) => void;
}

// This is supposed to be a moment object but there's no reason
// to include that entire library for a simple typing.
// Comes from react-native-calendar-picker
type FakeMoment = any;

const getInitDate = (initVal?: { date: Date }) => {
  if (!!initVal) {
    return new Date(initVal.date);
  }

  const d = new Date();

  d.setHours(20);
  d.setMinutes(0);
  d.setSeconds(0);

  return d;
};

const dateLimits = () => {
  const date = new Date();
  const min = new Date(date.getFullYear(), date.getMonth(), 1);
  const max = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return { minDate: min, maxDate: max };
};

// TODO: add time picker
export default function ({ onChange, initValue }: Props) {
  const { i18n } = useContext(i18nContext);
  const [isSwitchEnabled, setSwitchEnabled] = useState(!!initValue);
  const [isDateSelected, setDateSelected] = useState(!!initValue);
  const [date, setDate] = useState(!!initValue ? initValue.date : null);

  const onDateChange = (newDate: FakeMoment) => {
    const d = new Date(
      newDate.year(),
      newDate.month(),
      newDate.date(),
      20,
      0,
      0,
    );
    setDate(d);
    onChange(d);
    !isDateSelected && setDateSelected(true);
  };

  const onSwitchChange = (newValue: boolean) => {
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
          onValueChange={onSwitchChange}
          value={isSwitchEnabled}
        />
      </View>

      {isSwitchEnabled && (
        <View>
          <Text style={styles.reminderText}>
            {isDateSelected ? i18n.reminderAt(date) : i18n.undefinedReminder}
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
            selectedStartDate={date}
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
