import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import PickerSelect, { PickerStyle } from "react-native-picker-select";

import { i18nContext } from "../../contexts/i18n";
import { TopBar } from "../../components";
import { SupportedLocales } from "../../types/context";
import locales, { metadata as localePickerData } from "../../i18n";

interface Props {}

export default function MonthlyExpenses({}: Props) {
  const { i18n, setI18n } = useContext(i18nContext);
  const [locale, setLocale] = useState<SupportedLocales>(i18n._locale);

  const updateLocale = () => setI18n(locales[locale]);

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

        <PickerSelect
          onClose={updateLocale}
          onValueChange={setLocale}
          items={localePickerData.map((l) => ({
            key: l.key,
            value: l.key,
            label: l.name,
          }))}
          style={localePickerStyles}
          placeholder={{}}
          value={locale}
          useNativeAndroidPickerStyle={true}
        />
      </ScrollView>
    </View>
  );
}

const localePickerStyles: PickerStyle = {
  placeholder: {
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputIOS: {
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputAndroid: {
    fontSize: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  chevronDown: {
    display: "none",
  },
  chevronUp: {
    display: "none",
  },
};
const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#581c0c",
  },
});
