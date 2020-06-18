import React, { useMemo, useState } from "react";

import { Provider } from "react-redux";

import store from "./src/store";
import Navigator from "./src/screens/Navigator";
import { i18nContext } from "./src/contexts/i18n";
import { I18n } from "./src/types/context";
import { enGB } from "./src/i18n";

export default function App() {
  const [i18n, setI18n] = useState<I18n>(enGB);
  const i18nProviderValue = useMemo(() => ({ i18n, setI18n }), [i18n, setI18n]);

  return (
    <Provider store={store}>
      <i18nContext.Provider value={i18nProviderValue}>
        <Navigator />
      </i18nContext.Provider>
    </Provider>
  );
}
