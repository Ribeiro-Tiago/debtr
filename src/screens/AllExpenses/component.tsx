import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import TopBar from '../../components/TopBar/component';
import { List } from '../../components';

export default function AllExpenses({ items }) {
  const renderEmptyList = () => {
    return (
      <View>
        <Text>Empty list</Text>
      </View>
    );
  };

  const renderListItem = ({ item }) => {
    return (
      <View>
        <Text>Text item </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TopBar>
        <Text style={styles.title}>All monthly expenses</Text>
      </TopBar>

      <List
        data={items}
        renderEmptyList={renderEmptyList}
        renderListItem={renderListItem}
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
});
