import { connect } from "react-redux";

import component from "./ExpenseForm";
import { StoreState } from "../../types/store";
import { addItem, updateItem, removeItem } from "../../store/actions/items";
import { Item, ItemCreation, ItemNotification } from "../../types";
import { addAmount, subtractAmount } from "../../store/actions/amountLeft";
import { isCurrentMonth } from "../../utils";
import { registerNotif } from "../../services/notifications";
import { NotificationTexts } from "../../types/notification";

const mapStateToProps = (state: StoreState) => {
  const item = state.current.item;

  return {
    item,
    isNew: !item,
    selectedMonths: state.current.months,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    create: (item: ItemCreation, notifTexts: NotificationTexts) => {
      dispatch(addItem(item));

      if (isCurrentMonth(item.months)) {
        dispatch(addAmount(item.amount));
      }

      if (item.notification) {
        registerNotif({ ...item.notification, ...notifTexts }, item.months);
      }
    },
    update: (item: Item, oldAmount: number, oldNotif: ItemNotification) => {
      dispatch(updateItem(item));

      if (isCurrentMonth(item.months) && oldAmount !== undefined) {
        dispatch(addAmount(item.amount));
        dispatch(subtractAmount(oldAmount));
      }
    },
    remove: (id: string, months: number[], amount: number) => {
      dispatch(removeItem(id));

      if (isCurrentMonth(months)) {
        dispatch(subtractAmount(amount));
      }
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(component);
