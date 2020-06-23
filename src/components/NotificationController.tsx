import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, Switch } from "react-native";
import DatePicker from "react-native-calendar-picker";

import FormLabel from "./FormLabel";
import { i18nContext } from "../contexts/i18n";
import { ItemNotification } from "../types";
import FormError from "./FormError";

interface Props {
  hasErr: boolean;
  onChange: (val: boolean) => void;
  onChangeDate: (date?: Date) => void;
  initValue?: ItemNotification;
}

// This is supposed to be a moment object but there's no reason
// to include that entire library for a simple typing.
// Comes from react-native-calendar-picker
type FakeMoment = any;

const dateLimits = () => {
  const date = new Date();
  const min = new Date(date.getFullYear(), date.getMonth(), 1);
  const max = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return { minDate: min, maxDate: max };
};

// TODO: add time picker > maybe with react-native-time-picker
export default function ({ onChange, initValue, onChangeDate, hasErr }: Props) {
  const { i18n } = useContext(i18nContext);
  const [isSwitchEnabled, setSwitchEnabled] = useState(!!initValue);
  const [isDateSelected, setDateSelected] = useState(!!initValue);
  const [date, setDate] = useState(
    !!initValue ? new Date(initValue.date) : null,
  );

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
    onChangeDate(d);
    !isDateSelected && setDateSelected(true);
  };

  const onSwitchChange = (newValue: boolean) => {
    onChange(newValue);

    if (!newValue) {
      onChangeDate(undefined);
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
        <>
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

          {hasErr && <FormError error={i18n.noNotifErr} />}
        </>
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
