import { AppRegistry } from "react-native";
import { YellowBox } from "react-native";

import App from "./App";
import { name as appName } from "./app.json";

// temporary until react-native-picker-select merges PR#303
YellowBox.ignoreWarnings(["Picker has been extracted"]);

AppRegistry.registerComponent(appName, () => App);
