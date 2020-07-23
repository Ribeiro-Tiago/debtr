import {
  UPDATE_PICKER_VALUE,
  TOGGLE_NOTIFICATION_PICKER,
  TOGGLE_NOTIF_ENABLED,
} from "./types";
import { PickerType } from "../../types";

export const toggleNotificationPicker = (payload?: PickerType) => ({
  type: TOGGLE_NOTIFICATION_PICKER,
  payload,
});

export const updatePickerValue = (payload: Date) => ({
  type: UPDATE_PICKER_VALUE,
  payload,
});

export const toggleNotifEnabled = () => ({ type: TOGGLE_NOTIF_ENABLED });
