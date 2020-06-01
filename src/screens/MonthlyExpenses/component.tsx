import React from 'react';
import { View } from 'react-native';

import { List, TopBar } from '../../components';
import { Item } from '../../types';

interface Props {
  items: Item[];
  togglePaidStatus: (id: string) => void;
  updateAmountLeft: (amount: number, isPaid: boolean) => void;
}

export default function MonthlyExpenses({
  items,
  togglePaidStatus,
  updateAmountLeft,
}: Props) {
  const onItemPress = ({ id, isPaid, amount }: Item) => {
    togglePaidStatus(id);
    updateAmountLeft(amount, isPaid);
  };

  return (
    <View style={styles.container}>
      <TopBar />

      <List data={items} onItemPress={onItemPress} />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
  },
};
