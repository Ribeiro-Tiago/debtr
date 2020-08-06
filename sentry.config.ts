import * as Sentry from "@sentry/react-native";
import DeviceInfo from "react-native-device-info";
import Config from "react-native-config";

export default () => {
  if (process.env.NODE_ENV !== "production") {
    return;
  }

  Sentry.init({
    dsn: Config.SENTRY_DSN,
    normalizeDepth: 10,
    debug: process.env.NODE_ENV !== "production",
  });

  Sentry.setTags({
    appVersion: DeviceInfo.getVersion(),
    buildNumber: DeviceInfo.getBuildNumber(),
    systemName: DeviceInfo.getSystemName(),
    systemVersion: DeviceInfo.getSystemVersion(),
    deviceName: DeviceInfo.getDeviceNameSync(),
  });
};
