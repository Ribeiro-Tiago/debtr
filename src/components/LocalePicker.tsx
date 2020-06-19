import React, { useState } from "react";
import { StyleProp, TextStyle } from "react-native";
import { Picker } from "@react-native-community/picker";

import { locales } from "../i18n";
import { SupportedLocales } from "../types/context";

interface Props {
  initVal: SupportedLocales;
  onChange: (locale: SupportedLocales) => void;
  itemStyle?: StyleProp<TextStyle>;
}

export default function ({ initVal, onChange, itemStyle = {} }: Props) {
  const [value, setValue] = useState(initVal);

  const onValChange = (val: React.ReactText) => {
    setValue(val as SupportedLocales);
    onChange(val as SupportedLocales);
  };

  return (
    <Picker
      selectedValue={value}
      onValueChange={onValChange}
      mode="dropdown"
      itemStyle={itemStyle}>
      {locales.map(({ key, name }) => {
        return <Picker.Item key={key} label={name} value={key} />;
      })}
    </Picker>
  );
}
