import { Platform } from "react-native";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

import { Notification } from "../types/notification";

interface RescheduleParams {
  data: Notification;
  months: number[];
}

const getNextNotifDate = (notifDate: Date, months: number[]) => {
  const nextDate = new Date(notifDate);
  const currMonth = new Date().getMonth();

  // if it happens in every month, there's no need to calculate
  // the next recurring month
  if (!months.length || months.length === 11) {
    if (currMonth === 11) {
      nextDate.setMonth(0);
      nextDate.setFullYear(notifDate.getFullYear() + 1);
      return nextDate;
    }

    nextDate.setMonth(currMonth + 1);
    return nextDate;
  }

  months.sort();

  const currIndex = months.findIndex((m) => m === currMonth);

  // last month of the year this expense could happen
  if (currIndex === months.length) {
    nextDate.setMonth(months[0]);
  } else {
    nextDate.setMonth(months[currIndex + 1]);
  }

  if (notifDate.getMonth() <= nextDate.getMonth()) {
    nextDate.setFullYear(nextDate.getFullYear() + 1);
  }

  return nextDate;
};

const rescheduleNotification = ({ data, months }: RescheduleParams) => {
  const currMonth = new Date().getMonth();

  if (!months.length || months.length === 11 || months.includes(currMonth)) {
    return registerNotif(data, months);
  }

  const date = getNextNotifDate(data.date, months);

  registerNotif({ ...data, date }, months);
};

export const registerNotif = (notification: Notification, months: number[]) => {
  const date = getNextNotifDate(notification.date, months);

  PushNotification.localNotificationSchedule({
    playSound: true,
    priority: "high",
    vibrate: true,
    visibility: "private",
    importance: "high",
    // ignoreInForeground: false,
    userInfo: {
      id: notification.id, // used to cancel notif on ios
      data: notification,
      months,
    },
    ...notification,
    date,
  });
};

export const unregisterNotif = (id: string) => {
  PushNotification.cancelLocalNotifications({ id });
};

export const updateNotif = (notification: Notification, months: number[]) => {
  PushNotification.cancelLocalNotifications({ id: notification.id });

  registerNotif(notification, months);
};

export default () => {
  PushNotification.configure({
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("notification", notification.data);

      rescheduleNotification((notification.data as any).data);

      notification.finish(PushNotificationIOS.FetchResult.NewData);
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