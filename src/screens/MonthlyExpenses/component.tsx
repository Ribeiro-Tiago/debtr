import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

import { List, TopBar, ListItem } from '../../components';
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

  const renderItem = ({ item, index }) => {
    return (
      <ListItem
        onPress={onItemPress}
        item={item}
        isEven={index % 2 === 0}
        iconName="ios-checkmark"
        hideIcon={!item.isPaid}
      />
    );
  };

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={styles.emptyListText}>
          You have no expenses left this month 🥳🥳
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TopBar>
        <Text style={styles.title}>{dayjs().format('MMMM YYYY')}</Text>
        <Text style={styles.leftover}>{amountLeft}€ Left</Text>
      </TopBar>

      <List
        data={items}
        renderEmptyList={renderEmptyList}
        renderListItem={renderItem}
      />
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
  emptyListContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyListText: {
    fontSize: 26,
    textAlign: 'center',
    marginHorizontal: 30,
    lineHeight: 40,
  },
});
