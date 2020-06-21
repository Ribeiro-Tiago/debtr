import { connect } from "react-redux";

import component from "./ExpenseForm";
import { StoreState } from "../../types/store";
import { addItem, updateItem, removeItem } from "../../store/actions/items";
import { Item, ItemCreation } from "../../types";
import { addAmount, subtractAmount } from "../../store/actions/amountLeft";
import { isCurrentMonth } from "../../utils";

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
    create: (item: ItemCreation) => {
      dispatch(addItem(item));

      if (isCurrentMonth(item.months)) {
        dispatch(addAmount(item.amount));
      }
    },
    update: (item: Item, oldAmount: number) => {
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
