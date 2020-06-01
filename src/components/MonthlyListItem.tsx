import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { Item } from '../types';

const primary = '#581c0c';
const secondary = '#ca5116';

interface Props {
  item: Item;
  onPress: (item: Item) => void;
  isEven: boolean;
}
export default function MonthlyListItem({ item, onPress, isEven }: Props) {
  return (
    <TouchableWithoutFeedback key={item.id} onPress={() => onPress(item)}>
      <View style={styles.container}>
        <Text style={isEven ? styles.evenItem : styles.oddItem}>
          {item.desc}
        </Text>
        <Text style={isEven ? styles.evenItem : styles.oddItem}>
          {item.amount}€
        </Text>

        <Icon
          name="ios-checkmark"
          size={48}
          color={!item.isPaid ? 'transparent' : isEven ? primary : secondary}
          style={styles.icon}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f9b384',
  },
  evenItem: {
    color: primary,
    fontSize: 18,
  },
  oddItem: {
    color: secondary,
    fontSize: 18,
  },
  icon: {
    textAlign: 'right',
  },
});
