import React, { useState } from "react";
import { Picker } from "@react-native-community/picker";

import { metadata as locales } from "../i18n";
import { SupportedLocales } from "../types/context";

interface Props {
  initVal: SupportedLocales;
  onChange: (locale: SupportedLocales) => void;
}

export default function ({ initVal, onChange }: Props) {
  const [value, setValue] = useState(initVal);

  const onValChange = (val: React.ReactText) => {
    setValue(val as SupportedLocales);
    onChange(val as SupportedLocales);
  };

  return (
    <Picker selectedValue={value} onValueChange={onValChange}>
      {locales.map(({ key, name }) => {
        return <Picker.Item key={key} label={name} value={key} />;
      })}
    </Picker>
  );
}
