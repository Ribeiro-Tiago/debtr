import React from "react";
import { StyleSheet, Text } from "react-native";

interface Props {
  error: string;
}

export default function ({ error }: Props) {
  return <Text style={styles.error}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: { marginTop: 5, color: "red" },
});
