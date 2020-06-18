import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Picker from "react-native-picker-select";

import { i18nContext } from "../../contexts/i18n";
import { TopBar, LocalePicker } from "../../components";
import { SupportedLocales } from "../../types/context";
import locales, { metadata as localesMetadata } from "../../i18n";
import { toggleItemStatus } from "src/store/actions/items";

interface Props {}

export default function MonthlyExpenses({}: Props) {
  const { i18n, setI18n } = useContext(i18nContext);

  const updateLocale = (val: SupportedLocales) => setI18n(locales[val]);

  return (
    <View style={{}}>
      <TopBar title={i18n.settings} />

      <ScrollView style={{}} bounces={false}>
        <Text
          style={{
            fontSize: 18,
            backgroundColor: "#e8e8e8",
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}>
          Language
        </Text>
        <LocalePicker
          initVal={i18n._locale}
          onChange={updateLocale}
          itemStyle={{
            fontSize: 16,
            height: 60,
          }}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#581c0c",
  },
});
