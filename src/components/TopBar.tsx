import React from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import { getPlatformIcon } from "../utils";

interface Props {
  children?: any;
  title?: string;
  hasBackButton?: boolean;
}

export default function TopBar({ children, title, hasBackButton }: Props) {
  const { goBack } = useNavigation();

  const renderBackButton = () => {
    return (
      <View style={styles.topbarContainer}>
        <TouchableWithoutFeedback onPress={goBack}>
          <Icon
            name={getPlatformIcon("arrow-back")}
            color="#581c0c"
            size={32}
            style={styles.backIcon}
          />
        </TouchableWithoutFeedback>

        <Text style={styles.title}>{title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {hasBackButton && renderBackButton()}

      {!!title && !hasBackButton && <Text style={styles.title}>{title}</Text>}
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
    position: "relative",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#581c0c",
  },
  topbarContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: {
    marginRight: 20,
    paddingTop: 5,
  },
});
