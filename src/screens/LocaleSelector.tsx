import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Emoji from "react-native-emoji";
import { SafeAreaView } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";

import { SupportedLocales } from "../types";
import { LocalePicker } from "../components";
import locales from "../i18n";

interface Props {
  onLocaleSelect: (locale: SupportedLocales) => void;
}

export default function LocaleSelector({ onLocaleSelect }: Props) {
  const [locale, setLocale] = useState(SupportedLocales.en);

  const text = (key: string) => (locales[locale] as any)[key];

  SplashScreen.hide();

  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <View style={styles.headerContainer}>
          <Emoji name=":confused:" style={styles.emoji} />
          <Emoji name=":confused:" style={styles.emoji} />
        </View>
        <Text style={styles.header}>
          {text("languageNotFound")}
          <Text style={styles.italic}>Debtr </Text>
          {text("languageNotFound2")}
        </Text>
      </View>

      <View>
        <Text style={styles.pickerTitle}>{text("selectLanguage")}</Text>

        <LocalePicker initVal={locale} onChange={setLocale} />
      </View>

      <Text style={styles.button} onPress={() => onLocaleSelect(locale)}>
        {text("select")}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignSelf: "center",
    color: "#581c0c",
    borderWidth: 1,
    borderColor: "#581c0c",
    borderRadius: 10,
    fontSize: 18,
    width: "70%",
    textAlign: "center",
    paddingVertical: 10,
  },
  pickerTitle: {
    fontSize: 22,
    textAlign: "center",
    color: "#581c0c",
  },
  header: {
    textAlign: "center",
    fontSize: 26,
    color: "#581c0c",
    fontWeight: "bold",
  },
  emoji: {
    fontSize: 32,
  },
  italic: {
    fontStyle: "italic",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  wrapper: {
    flex: 1,
    backgroundColor: "#f1e3cb",
    padding: 20,
    justifyContent: "space-evenly",
  },
});
