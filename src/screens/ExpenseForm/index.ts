import { connect } from "react-redux";

import component from "./ExpenseForm";
import { StoreState } from "../../types/store";
import {
  addItem,
  updateItem,
  removeItem,
  undoRemoval,
  hideForRemoval,
} from "../../store/actions/items";
import { Item, ItemCreation, ItemNotification } from "../../types";
import { addAmount, subtractAmount } from "../../store/actions/amountLeft";
import { isCurrentMonth } from "../../utils";
import { registerNotif, unregisterNotif } from "../../services/notifications";
import { NotificationTexts, Notification } from "../../types/notification";
import {
  CreateItemParams,
  UpdateItemParams,
  RemoveItemParams,
} from "../../types/item";

const mapStateToProps = ({ current, notification }: StoreState) => {
  const { item, months } = current;

  return {
    item,
    isNew: !item,
    selectedMonths: months,
    isPickerVisible: notification.isPickerVisible,
    pickerDate: notification.pickerValue,
    isNotifEnabled: notification.isEnabled,
  };
};

const mapDispatchToProps = (dispatch: Function) => ({
  create: ({ item, notifTexts }: CreateItemParams) => {
    dispatch(addItem(item));

    if (isCurrentMonth(item.months)) {
      dispatch(addAmount(item.amount));
    }

    if (item.notification) {
      registerNotif({ ...item.notification, ...notifTexts }, item.months);
    }
  },
  update: ({ item, oldAmount, oldNotif, notifTexts }: UpdateItemParams) => {
    dispatch(updateItem(item));

    if (isCurrentMonth(item.months) && oldAmount !== undefined) {
      dispatch(addAmount(item.amount));
      dispatch(subtractAmount(oldAmount));
    }

    if (JSON.stringify(item.notification) !== JSON.stringify(oldNotif)) {
      /* updateNotif({ ...item.notification, ...notifTexts }, item.months); */
    }
  },
  remove: ({ id, months, amount, notifId }: RemoveItemParams) => {
    dispatch(removeItem(id));

    if (isCurrentMonth(months)) {
      dispatch(subtractAmount(amount));
    }

    if (notifId) {
      unregisterNotif(notifId);
    }
  },
  undoRemoval: (id: string) => dispatch(undoRemoval(id)),
  hideForRemoval: (id: string) => dispatch(hideForRemoval(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(component);
