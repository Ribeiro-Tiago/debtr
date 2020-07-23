import React, { useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import FormLabel from "../FormLabel";
import MonthSelectorItem from "../MonthSelectorItem";
import CollapsableView from "../CollapsableView";
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
  const [isOpen, setOpen] = useState<boolean>(false);
  const { i18n } = useContext(i18nContext);

  const onUnselect = (month: number) => {
    updateSelected(selectedMonths.filter((item) => item !== month));
  };

  const onSelect = (month: number) => {
    updateSelected([...selectedMonths, month]);
  };

  const toggleHelper = () => setOpen(!isOpen);

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

      <CollapsableView isOpen={isOpen}>
        <Text style={styles.helper}>{i18n.monthsHelper}</Text>
      </CollapsableView>

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

      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
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
  divider: {
    borderBottomColor: "#581c0c",
    borderBottomWidth: 0.5,
    marginTop: 5,
  },
});
