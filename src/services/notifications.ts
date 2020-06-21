import { Platform } from "react-native";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

interface Notification {
  title: string;
  message: string;
  date: Date;
}

export const registerNotif = (notification: Notification) => {
  PushNotification.localNotificationSchedule({
    playSound: true,
    priority: "high",
    repeatType: "month" as any,
    vibrate: true,
    visibility: "private",
    ...notification,
  });
};

export default () => {
  PushNotification.configure({
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: Platform.OS === "ios",
  });
};
