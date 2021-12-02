import React, {useState} from "react";
import PickerSelect, {PickerStyle, Item} from "react-native-picker-select";

import {locales} from "../configs";
import {SupportedLocales} from "../types";

interface Props {
  initVal: SupportedLocales;
  onChange: (locale: SupportedLocales) => void;
  itemStyle?: PickerStyle;
}

export default function ({initVal, onChange, itemStyle = {}}: Props) {
  const [value, setValue] = useState(initVal);

  const onValChange = (val: SupportedLocales) => {
    setValue(val);
    onChange(val);
  };

  const items: Item[] = locales.map(({key, name}) => ({
    label: name,
    value: key,
  }));

  return (
    <PickerSelect
      onValueChange={onValChange}
      items={items}
      placeholder={{}}
      value={value}
      style={itemStyle}
      useNativeAndroidPickerStyle={true}
    />
  );
}
