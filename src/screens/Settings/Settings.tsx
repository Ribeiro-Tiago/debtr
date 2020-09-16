import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

import locales from "../../i18n";
import pkgJson from "../../../package.json";
import { i18nContext } from "../../contexts/i18n";
import { updateLocale } from "../../services/storage";
import { TopBar, Webview, SettingsPicker } from "../../components";
import { SupportedCurrencies, SupportedLocales } from "../../types";
import { locales as localePickerData, currencies } from "../../configs";
import { TextInput } from "react-native-gesture-handler";

interface Props {
  initCurrency: SupportedCurrencies;
  updateCurrency: (currency: SupportedCurrencies) => void;
  updateResetDay: (day: number) => void;
}

const PDF_ASSET_URL = process.env.PDF_ASSET_URL;

export default function Settings({
  initCurrency,
  updateCurrency,
  updateResetDay,
}: Props) {
  const { i18n, setI18n } = useContext(i18nContext);
  const [locale, setLocale] = useState(i18n._locale as SupportedLocales);
  const [currency, setCurrency] = useState(initCurrency);
  const [webviewUri, setWebviewUri] = useState("");
  const [resetDay, setResetDay] = useState("1");
  const [isEditable, setEditable] = useState(false);
  const [isHelperVisible, setHelperVisible] = useState(false);

  if (!!webviewUri) {
    return <Webview uri={webviewUri} onClose={() => setWebviewUri("")} />;
  }

  const renderSectionTitle = (title: string) => {
    return <Text style={styles.sectionTitle}>{title}</Text>;
  };

  const renderLanguage = () => {
    /* TODO: IOS 
      const onPickerClose = () => {
      setI18n(locales[locale]);
      updateLocale(locale);
    }; */

    const onChange = (locale: SupportedLocales) => {
      // setLocale(locale);
      setI18n(locales[locale]);
      updateLocale(locale);
    };

    return (
      <>
        {renderSectionTitle(i18n.langauge)}

        <SettingsPicker<SupportedLocales>
          // onClose={onPickerClose} TODO: IOS
          onChange={onChange}
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
            <Icon name="ios-chevron-forward" size={24} />
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

  const renderCurrency = () => {
    // const onPickerClose = () => updateCurrency(currency); // TODO: IOS

    const onChange = (currency: SupportedCurrencies) => {
      updateCurrency(currency);
      setCurrency(currency);

      // TODO: activate when published to ios
      // if (Platform.OS === "android") {
      // onPickerClose();
      // }
    };

    return (
      <>
        {renderSectionTitle(i18n.currency)}

        <SettingsPicker<SupportedCurrencies>
          // onClose={onPickerClose} TODO: ios
          onChange={onChange}
          value={currency}
          data={currencies.map((c) => ({
            key: c.key,
            value: c.key,
            label: c.label,
          }))}
        />
      </>
    );
  };

  const renderResetDayChange = () => {
    const onChange = (editing: boolean) => {
      if (!editing) {
        setResetDay(`${resetDay}st`);
      } else {
        setResetDay(resetDay.replace(/\D/g, ""));
      }
    };

    const toggleHelper = () => setHelperVisible(!isHelperVisible);

    return (
      <>
        {renderSectionTitle(i18n.resetDay)}

        <View style={styles.group}>
          <Text style={styles.groupText}>
            Reset day{" "}
            <Icon
              name="ios-help-circle-outline"
              size={18}
              onPress={toggleHelper}
            />
          </Text>
          {/* <Icon
            name="ios-today-outline"
            size={24}
            onPress={() => setIsVisible(true)}
          /> */}
          <TextInput
            value={resetDay}
            onChangeText={setResetDay}
            keyboardType="number-pad"
            allowFontScaling={true}
            style={
              isEditable
                ? [
                    { borderBottomColor: "#000", borderBottomWidth: 1 },
                    { fontSize: 18 },
                  ]
                : { fontSize: 18 }
            }
            onFocus={() => onChange(true)}
            onBlur={() => onChange(false)}
          />
        </View>

        {/* {isVisible && (
          <DateTimePicker
            mode="date"
            value={resetDay}
            display="calendar"
            onChange={(ev, d) => onChange(d)}
            maximumDate={new Date(2020, 0, 31)}
            minimumDate={new Date(2020, 0, 1)}
          />
        )} */}
      </>
    );
  };

  return (
    <>
      <TopBar title={i18n.settings} />

      <ScrollView bounces={false}>
        {renderLanguage()}

        {renderCurrency()}

        {renderResetDayChange()}

        {renderAbout()}
      </ScrollView>
    </>
  );
}

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
