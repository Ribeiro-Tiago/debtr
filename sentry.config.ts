import * as Sentry from "@sentry/react-native";
import DeviceInfo from "react-native-device-info";

export default () => {
  Sentry.init({
    dsn: "<key>",
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
