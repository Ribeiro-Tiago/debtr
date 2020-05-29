import React from 'react';
import { View } from 'react-native';
import { nanoid } from 'nanoid/non-secure';

import { List, TopBar } from '../components';

export default function MonthlyExpenses() {
  const data = [
    {
      id: nanoid(),
      isPaid: false,
      desc: 'something',
      price: 10,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
    {
      id: nanoid(),
      isPaid: false,
      desc: 'something',
      price: 10,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
    {
      id: nanoid(),
      isPaid: false,
      desc: 'something',
      price: 10,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
    {
      id: nanoid(),
      isPaid: false,
      desc: 'something',
      price: 10,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
    {
      id: nanoid(),
      isPaid: false,
      desc: 'something',
      price: 10,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
    {
      id: nanoid(),
      isPaid: false,
      desc: 'something',
      price: 10,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
    {
      id: nanoid(),
      isPaid: false,
      desc: 'something',
      price: 10,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
    {
      id: nanoid(),
      isPaid: false,
      desc: 'something',
      price: 10,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
    {
      id: nanoid(),
      isPaid: false,
      desc: 'something',
      price: 10,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
    {
      id: nanoid(),
      isPaid: false,
      desc: 'something',
      price: 10,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
    {
      id: nanoid(),
      isPaid: false,
      desc: 'something',
      price: 10,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
    {
      id: nanoid(),
      isPaid: false,
      desc: 'something',
      price: 10,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
    {
      id: nanoid(),
      isPaid: false,
      desc: 'something',
      price: 10,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
    {
      id: nanoid(),
      isPaid: false,
      desc: 'something',
      price: 10,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
    {
      id: nanoid(),
      isPaid: false,
      desc: 'something',
      price: 10,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
    {
      id: nanoid(),
      isPaid: false,
      desc: 'something',
      price: 10,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
    {
      id: nanoid(),
      isPaid: false,
      desc: 'something',
      price: 10,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
    {
      id: nanoid(),
      isPaid: false,
      desc: 'something',
      price: 10,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
    {
      id: nanoid(),
      isPaid: false,
      desc: 'something',
      price: 10,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
  ];
  const short = [
    {
      id: nanoid(),
      isPaid: false,
      desc: 'something',
      price: 1321.3,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
    {
      id: nanoid(),
      isPaid: true,
      desc: 'something',
      price: 10,
      months: [1, 2, 3, 4],
      isVisible: true,
    },
  ];

  return (
    <View style={styles.container}>
      <TopBar />

      <List data={short} />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  itemWrapperDisabled: {},
  itemWrapper: {},
  textWhite: {},
};
