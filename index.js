import { AppRegistry, YellowBox, Platform } from "react-native";

import App from "./App";
import { iosName, androidName } from "./app.json";
import setupSentry from "./sentry.config";

// temporary until react-native-picker-select merges PR#303
YellowBox.ignoreWarnings(["Picker has been extracted"]);

setupSentry();

AppRegistry.registerComponent(
  Platform.OS === "ios" ? iosName : androidName,
  () => App,
);
