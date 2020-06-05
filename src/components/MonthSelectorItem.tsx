import React, { useState } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

interface Props {
  label: string;
  initialSelected: boolean;
  onUnselect: () => void;
  onSelect: () => void;
}

export default function MonthSelectorItem({
  label,
  initialSelected,
  onUnselect,
  onSelect,
}: Props) {
  const [isActive, setActive] = useState<boolean>(initialSelected);

  const onChange = () => {
    if (isActive) {
      onUnselect();
    } else {
      onSelect();
    }

    setActive(!isActive);
  };

  return (
    <Text
      onPress={onChange}
      style={isActive ? styles.activeLabel : styles.label}
    >
      {label}
    </Text>
  );
}

const label: TextStyle = {
  borderWidth: 1,
  borderColor: '#000',
  padding: 5,
  borderRadius: 5,
  fontSize: 18,
  marginRight: 15,
  marginBottom: 15,
  minWidth: 70,
  textAlign: 'center',
  color: '#581c0c',
};

const styles = StyleSheet.create({
  label,
  activeLabel: {
    ...label,
    backgroundColor: '#f1e3cb',
    color: '#581c0c',
    borderColor: '#581c0c',
  },
});
