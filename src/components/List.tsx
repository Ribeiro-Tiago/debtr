import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';

import ListItem from './ListItem';
import { Item } from '../types';

interface Props {
  data: Item[];
  onItemPress: (item: Item) => void;
}
export default function List({ data, onItemPress }: Props) {
  const renderItem = ({ item, index }) => {
    return (
      <ListItem onPress={onItemPress} item={item} isEven={index % 2 === 0} />
    );
  };

  if (!data.length) {
    return (
      <View style={styles.noItems}>
        <Text>You have no expenses this month</Text>
      </View>
    );
  }

  return (
    <FlatList<Item>
      keyExtractor={({ id }) => id}
      data={data}
      renderItem={renderItem}
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#eaeaea' },
  noItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
