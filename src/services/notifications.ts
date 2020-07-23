import { Platform } from "react-native";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

import { Notification } from "../types/notification";
import { removeNotif, addNotif, getNotifs } from "./storage";
import { isCurrentMonth, isMonthly } from "../utils";

interface NotifData {
  id: string;
  notif: Notification;
  months: number[];
}

const getNextNotifDate = (notifDate: Date, months: number[]) => {
  const nextDate = new Date(notifDate);
  const currMonth = new Date().getMonth();

  // if it happens in every month, there's no need to calculate
  // the next recurring month
  if (isMonthly(months)) {
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

export const registerNotif = (
  notification: Notification,
  months: number[],
  isReschedule = false,
) => {
  // we'll update date if we're rescheduling a notif, it doesn't happen on this month
  // or if it happens on this month but at a time that already passed
  const date =
    isReschedule ||
    !isCurrentMonth(months) ||
    notification.date.getTime() < Date.now()
      ? getNextNotifDate(notification.date, months)
      : notification.date;

  PushNotification.localNotificationSchedule({
    playSound: true,
    vibrate: true,
    userInfo: {
      id: notification.id,
      notif: { ...notification, date: date.toString() },
      months,
    },
    ...notification,
    date, //: new Date(Date.now() + 5 * 1000),
  });

  if (isReschedule) {
    removeNotif(notification.id).then(() => {
      addNotif({ notif: notification, months });
    });
  } else {
    addNotif({ notif: notification, months });
  }
};

export const unregisterNotif = (id: string) => {
  try {
    PushNotification.cancelLocalNotifications({ id });

    removeNotif(id);
  } catch (err) {}
};

export const checkNotifsForReschedule = async () => {
  const notifs = await getNotifs();

  if (!notifs.length) {
    return;
  }

  let notif;
  const now = Date.now();
  for (notif of notifs) {
    if (new Date(notif.notif.date).getTime() < now) {
      registerNotif(notif.notif, notif.months, true);
    }
  }
};

export default () => {
  PushNotification.configure({
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      const data: NotifData = (notification as any).userInfo;

      if (!data?.id) {
        return;
      }

      registerNotif(data.notif, data.months, true);

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
