import React from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

interface Props {
  children?: any;
  title: string;
}

export default function TopBar({ children, title }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

const paddingTop = Platform.OS === "ios" ? getStatusBarHeight() : 0;
const styles = StyleSheet.create({
  container: {
    height: 50 + paddingTop,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 2.2,
    elevation: 5,
    backgroundColor: "#f1e3cb",
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 15,
    paddingTop: paddingTop,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#581c0c",
  },
});
