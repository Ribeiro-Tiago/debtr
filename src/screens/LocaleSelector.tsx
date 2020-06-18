import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Emoji from "react-native-emoji";
import { Picker } from "@react-native-community/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";

import { SupportedLocales } from "../types/context";
import { metadata as locales } from "../i18n";

interface Props {
  onLocaleSelect: (locale: SupportedLocales) => void;
}

export default function LocaleSelector({ onLocaleSelect }: Props) {
  const [locale, setLocale] = useState(SupportedLocales.en_GB);

  SplashScreen.hide();

  return (
    <SafeAreaView style={styles.wrapper}>
      <View>
        <View style={styles.headerContainer}>
          <Emoji name=":confused:" style={styles.emoji} />
          <Emoji name=":confused:" style={styles.emoji} />
        </View>
        <Text style={styles.header}>
          Uh oh... It seems <Text style={styles.italic}>Debtr </Text>
          doesn't support your device language
        </Text>
      </View>

      <View>
        <Text style={styles.pickerTitle}>
          Please select one of the available ones below:
        </Text>

        <Picker
          selectedValue={locale}
          onValueChange={(val) => setLocale(val as SupportedLocales)}>
          {locales.map(({ key, name }) => {
            return <Picker.Item key={key} label={name} value={key} />;
          })}
        </Picker>
      </View>

      <Text style={styles.button} onPress={() => onLocaleSelect(locale)}>
        Select
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignSelf: "center",
    color: "#333",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    fontSize: 18,
    width: "70%",
    textAlign: "center",
    paddingVertical: 10,
  },
  pickerTitle: {
    fontSize: 22,
    textAlign: "center",
  },
  header: {
    textAlign: "center",
    fontSize: 26,
    color: "#111",
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
    backgroundColor: "#f0f0f0",
    padding: 20,
    justifyContent: "space-evenly",
  },
});
