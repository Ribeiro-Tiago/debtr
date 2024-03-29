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
import { addAmount, subtractAmount } from "../../store/actions/amountLeft";
import { isCurrentMonth } from "../../utils";
import { registerNotif, unregisterNotif } from "../../services/notifications";
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

    if (
      isCurrentMonth(item.months) &&
      oldAmount !== undefined &&
      !item.isPaid
    ) {
      dispatch(addAmount(item.amount));
      dispatch(subtractAmount(oldAmount));
    }

    if (JSON.stringify(item.notification) !== JSON.stringify(oldNotif)) {
      unregisterNotif(oldNotif.id);

      if (item.notification || item.notification.id) {
        registerNotif({ ...item.notification, ...notifTexts }, item.months);
      }
    }
  },
  remove: (id: string, notifId?: string) => {
    dispatch(removeItem(id));

    if (notifId) {
      unregisterNotif(notifId);
    }
  },
  undoRemoval: ({ id, months, amount }: RemoveItemParams) => {
    dispatch(undoRemoval(id));

    if (isCurrentMonth(months)) {
      dispatch(addAmount(amount));
    }
  },
  hideForRemoval: ({ id, months, amount }: RemoveItemParams) => {
    dispatch(hideForRemoval(id));

    if (isCurrentMonth(months)) {
      dispatch(subtractAmount(amount));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(component);
