import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import dayjs from 'dayjs';

interface Props {
  amountLeft: number;
}

export default function TopBar({ amountLeft }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{dayjs().format('MMMM YYYY')}</Text>
      <Text style={styles.leftover}>{amountLeft}€ Left</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50 + getStatusBarHeight(),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 2.2,
    elevation: 5,
    backgroundColor: '#f1e3cb',
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    paddingTop: getStatusBarHeight(),
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
