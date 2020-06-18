import React, { useMemo, useState, useEffect } from "react";
import { NativeModules } from "react-native";
import { Provider } from "react-redux";

import store from "./src/store";
import locales from "./src/i18n";
import { i18nContext } from "./src/contexts/i18n";
import { I18n, SupportedLocales } from "./src/types/context";
import { getLocale, updateLocale } from "./src/services/storage/storage";
import { LocaleSelectorScreen } from "./src/screens";
import Navigator from "./src/navigation/Navigator";

export default function App() {
  const [i18n, setI18n] = useState<I18n>();
  const i18nProviderValue = useMemo(() => ({ i18n, setI18n }), [i18n]);

  useEffect(() => {
    const locale = NativeModules.SettingsManager.settings.AppleLocale;

    if (locale in SupportedLocales) {
      setI18n(locales[locale as SupportedLocales]);
      return;
    }

    getLocale().then((locale) => {
      if (locale) {
        setI18n(locales[locale]);
      }
    });
  }, []);

  const onLocaleSelect = (locale: SupportedLocales) => {
    setI18n(locales[locale]);
    updateLocale(locale);
  };

  if (!i18n) {
    return <LocaleSelectorScreen onLocaleSelect={onLocaleSelect} />;
  }

  return (
    <Provider store={store}>
      <i18nContext.Provider value={i18nProviderValue}>
        <Navigator />
      </i18nContext.Provider>
    </Provider>
  );
}
