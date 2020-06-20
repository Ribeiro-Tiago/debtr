import React, { useState } from "react";
import { StyleProp, TextStyle } from "react-native";
import { Picker } from "@react-native-community/picker";

import { locales } from "../configs";
import { SupportedLocales } from "../types";

interface Props {
  initVal: SupportedLocales;
  onChange: (locale: SupportedLocales) => void;
  itemStyle?: StyleProp<TextStyle>;
}

export default function ({ initVal, onChange, itemStyle = {} }: Props) {
  const [value, setValue] = useState(initVal);

  const onValChange = (val: SupportedLocales) => {
    setValue(val);
    onChange(val);
  };

  return (
    <Picker
      selectedValue={value}
      onValueChange={(val) => onValChange(val as SupportedLocales)}
      mode="dropdown"
      itemStyle={itemStyle}>
      {locales.map(({ key, name }) => {
        return <Picker.Item key={key} label={name} value={key} />;
      })}
    </Picker>
  );
}
