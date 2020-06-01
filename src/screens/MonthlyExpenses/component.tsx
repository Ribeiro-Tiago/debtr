import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

import { List, TopBar } from '../../components';
import { Item } from '../../types';

interface Props {
  items: Item[];
  amountLeft: number;
  togglePaidStatus: (id: string) => void;
  updateAmountLeft: (amount: number, isPaid: boolean) => void;
}

export default function MonthlyExpenses({
  items,
  amountLeft,
  togglePaidStatus,
  updateAmountLeft,
}: Props) {
  const onItemPress = ({ id, isPaid, amount }: Item) => {
    togglePaidStatus(id);
    updateAmountLeft(amount, isPaid);
  };

  return (
    <View style={styles.container}>
      <TopBar>
        <Text style={styles.title}>{dayjs().format('MMMM YYYY')}</Text>
        <Text style={styles.leftover}>{amountLeft}€ Left</Text>
      </TopBar>

      <List data={items} onItemPress={onItemPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#581c0c',
  },
  leftover: {
    fontSize: 16,
    color: '#581c0c',
  },
});
