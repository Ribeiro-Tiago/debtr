import { AppRegistry, Platform } from "react-native";

import App from "./App";
import { iosName, androidName } from "./app.json";
import setupSentry from "./sentry.config";

setupSentry();

AppRegistry.registerComponent(
  Platform.OS === "ios" ? iosName : androidName,
  () => App,
);
