import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { TopBar, Webview, SettingsPicker } from "../../components";
import { i18nContext } from "../../contexts/i18n";
import { SupportedLocales } from "../../types/context";
import locales, { locales as localePickerData } from "../../i18n";
import { updateLocale } from "../../services/storage";
import pkgJson from "../../../package.json";

interface Props {}

const PDF_ASSET_URL = "https://tiago-ribeiro.com/debtr";

export default function Settings({}: Props) {
  const { i18n, setI18n } = useContext(i18nContext);
  const [locale, setLocale] = useState<SupportedLocales>(i18n._locale);
  const [webviewUri, setWebviewUri] = useState("");

  const renderSectionTitle = (title: string) => {
    return <Text style={styles.sectionTitle}>{title}</Text>;
  };

  const renderLanguage = () => {
    const onPickerClose = () => {
      setI18n(locales[locale]);
      updateLocale(locale);
    };

    return (
      <>
        {renderSectionTitle(i18n.langauge)}

        <SettingsPicker<SupportedLocales>
          onClose={onPickerClose}
          onChange={setLocale}
          value={locale}
          data={localePickerData.map((l) => ({
            key: l.key,
            value: l.key,
            label: l.name,
          }))}
        />
      </>
    );
  };

  const renderAbout = () => {
    const renderWebviewItem = (file: string, label: string) => {
      return (
        <TouchableWithoutFeedback
          onPress={() => setWebviewUri(`${PDF_ASSET_URL}/${file}`)}>
          <View style={styles.group}>
            <Text style={styles.groupText}>{label}</Text>
            <Icon name="ios-arrow-forward" size={24} />
          </View>
        </TouchableWithoutFeedback>
      );
    };

    return (
      <>
        {renderSectionTitle(i18n.about)}

        <View style={styles.group}>
          <Text style={styles.groupText}>{i18n.version}</Text>
          <Text style={styles.groupText}>{pkgJson.version}</Text>
        </View>

        {renderWebviewItem("pp.pdf", i18n.privacyPolicy)}

        {renderWebviewItem("tos.pdf", i18n.tos)}
      </>
    );
  };

      </>
    );
  };

  if (!!webviewUri) {
    return <Webview uri={webviewUri} onClose={() => setWebviewUri("")} />;
  }

  return (
    <>
      <TopBar title={i18n.settings} />

      <ScrollView bounces={false}>
        {renderLanguage()}
        {renderAbout()}
      </ScrollView>
    </>
  );
}

const localePickerStyles: PickerStyle = {
  placeholder: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputIOS: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputAndroid: {
    fontSize: 18,
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
  sectionTitle: {
    fontSize: 16,
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  group: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  groupText: {
    fontSize: 18,
  },
});
