import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";

import { i18nContext } from "../../contexts/i18n";

interface Props {}

export default function MonthlyExpenses({}: Props) {
  const { i18n } = useContext(i18nContext);

  return <View style={{}}></View>;
}

const styles = StyleSheet.create({});
