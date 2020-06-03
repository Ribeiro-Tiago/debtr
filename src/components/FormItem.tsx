import React from 'react';
import { Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';

interface Props {
  label: string;
  error: string;
  placeholder: string;
  hasErr: boolean;
  onChange: (val: string | number) => void;
  keyboard?: KeyboardTypeOptions;
}

export default function FormItem({
  label,
  error,
  hasErr,
  placeholder,
  onChange,
  keyboard = 'default',
}: Props) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboard}
      />
      {hasErr && <Text style={styles.error}>{error}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    height: 30,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    color: '#ca5116',
  },
  input: {
    fontSize: 18,
    paddingBottom: 10,
    paddingTop: 5,
    borderBottomColor: '#581c0c',
    borderBottomWidth: 0.5,
    color: '#581c0c',
  },
  error: { marginTop: 5, color: 'red' },
});
