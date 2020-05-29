import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ListItem from './ListItem';
import { Item } from '../types';

interface Props {
  data: Item[];
}
export default function List({ data }) {
  const toggleItem = (id: string) => {};

  const renderItem = ({ item, index }) => {
    return (
      <ListItem onPress={toggleItem} item={item} isEven={index % 2 === 0} />
    );
  };

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
});
