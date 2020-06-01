import React from 'react';
import { View, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export default function TopBar({ children }) {
  return <View style={styles.container}>{children}</View>;
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
});
