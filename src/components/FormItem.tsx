import React from "react";
import { Text, TextInput, StyleSheet, KeyboardTypeOptions } from "react-native";
import FormLabel from "./FormLabel";
import FormError from "./FormError";

interface Props {
  label: string;
  error: string;
  placeholder: string;
  hasErr: boolean;
  onChange: (val: string) => void;
  keyboard?: KeyboardTypeOptions;
  initialValue?: string;
}

export default function FormItem({
  label,
  error,
  hasErr,
  placeholder,
  onChange,
  initialValue,
  keyboard = "default",
}: Props) {
  return (
    <>
      <FormLabel label={label} />
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboard}
        defaultValue={initialValue}
        returnKeyType="next"
      />
      {hasErr && <FormError error={error} />}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 5,
    borderBottomColor: "#581c0c",
    borderBottomWidth: 0.5,
    color: "#581c0c",
  },
});
