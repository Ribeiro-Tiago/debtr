import React, { useContext } from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icon from "react-native-vector-icons/Ionicons";
import { WebView } from "react-native-webview";

import { getPlatformIcon } from "../utils";
import { i18nContext } from "../contexts/i18n";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface Props {
  uri: string;
  onClose: () => void;
}

export default ({ uri, onClose }: Props) => {
  const { i18n } = useContext(i18nContext);

  const renderLoading = () => {
    return <ActivityIndicator size="large" color="#f1e3cb" />;
  };

  const renderError = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.errText}>{i18n.webviewLoadErr}</Text>
      </View>
    );
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.topBar}>
          <Icon name={getPlatformIcon("arrow-back")} size={24} />
          <Text style={styles.text}>{i18n.back}</Text>
        </View>
      </TouchableWithoutFeedback>

      <WebView
        source={{ uri }}
        renderLoading={renderLoading}
        renderError={renderError}
      />
    </>
  );
};

const paddingTop = Platform.OS === "ios" ? getStatusBarHeight() : 0;
const styles = StyleSheet.create({
  topBar: {
    paddingTop,
    height: 40 + paddingTop,
    backgroundColor: "#f1e3cb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 2.2,
    elevation: 5,
    display: "flex",
    paddingLeft: 10,
    alignItems: "center",
    flexDirection: "row",
    zIndex: 999,
  },
  text: {
    marginLeft: 5,
    fontSize: 20,
    marginBottom: 2,
    color: "#581c0c",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errText: {
    fontSize: 24,
    textAlign: "center",
  },
});
