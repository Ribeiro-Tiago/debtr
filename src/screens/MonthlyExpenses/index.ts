import { connect } from "react-redux";

import component from "./MonthlyExpenses";
import { StoreState } from "../../types/store";
import { Item } from "../../types";
import { toggleItemStatus, setItems } from "../../store/actions/items";
import { addAmount, subtractAmount } from "../../store/actions/amountLeft";
import { isCurrentMonth } from "../../utils";

const getMonthlyItems = (items: Item[]) => {
  return items.filter(({ months, toRemove }) => {
    return !toRemove && isCurrentMonth(months);
  });
};

const mapStateToProps = ({ items, amountLeft, currency }: StoreState) => {
  return {
    hasItems: !!items.length,
    items: getMonthlyItems(items),
    amountLeft: amountLeft,
    currCurrency: currency,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    togglePaidStatus: (id: string) => dispatch(toggleItemStatus(id)),
    reorderItems: (items: Item[]) => dispatch(setItems(items)),
    updateAmountLeft: (amount: number, isPaid: boolean) => {
      return isPaid
        ? dispatch(addAmount(amount))
        : dispatch(subtractAmount(amount));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(component);
