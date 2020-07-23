import React from "react";
import { StyleSheet, Text } from "react-native";

export default function () {
  return <Text style={styles.label}>BETA</Text>;
}

const styles = StyleSheet.create({
  label: {
    paddingHorizontal: 5,
    fontSize: 12,
    fontWeight: "bold",
    backgroundColor: "#ca5116",
    color: "#f1f1f1",
    marginRight: 5,
    marginVertical: 10,
    borderRadius: 5,
  },
});
