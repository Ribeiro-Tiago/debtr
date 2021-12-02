import * as Sentry from "@sentry/react-native";
import DeviceInfo from "react-native-device-info";
import config from "react-native-config";
import pkg from "./package.json";

if (config.NODE_ENV !== "development") {
  Sentry.init({
    dsn: config.SENTRY_DSN,
    normalizeDepth: 10,
    debug: true,
    enableNative: true,
    attachStacktrace: true,
    release: pkg.version,
  });

  Sentry.setTags({
    appVersion: DeviceInfo.getVersion(),
    buildNumber: DeviceInfo.getBuildNumber(),
    systemName: DeviceInfo.getSystemName(),
    systemVersion: DeviceInfo.getSystemVersion(),
    deviceName: DeviceInfo.getDeviceNameSync(),
  });
}

export default Sentry;
