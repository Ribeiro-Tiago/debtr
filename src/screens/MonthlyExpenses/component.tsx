import React from 'react';
import { View } from 'react-native';

import { List, TopBar } from '../../components';
import { Item } from '../../types';

interface Props {
  items: Item[];
  togglePaidStatus: (id: string) => void;
}

export default function MonthlyExpenses({ items, togglePaidStatus }: Props) {
  return (
    <View style={styles.container}>
      <TopBar />

      <List data={items} onItemPress={togglePaidStatus} />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
  },
};
