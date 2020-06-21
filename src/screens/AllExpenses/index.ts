import { connect } from "react-redux";

import component from "./AllExpenses";
import { StoreState } from "../../types/store";
import { Item } from "../../types";
import { updateSelected } from "../../store/actions/current";
import { removeItem, setItems } from "../../store/actions/items";
import { subtractAmount } from "../../store/actions/amountLeft";
import { isCurrentMonth } from "../../utils";

const mapStateToProps = ({ items, currency }: StoreState) => ({
  items,
  currCurrency: currency,
});

const mapDispatchToProps = (dispatch: Function) => ({
  updateCurrent: (item?: Item) => dispatch(updateSelected(item)),
  reorderItems: (items: Item[]) => dispatch(setItems(items)),
  removeItem: (id: string, months: number[], amount: number) => {
    dispatch(removeItem(id));

    if (isCurrentMonth(months)) {
      dispatch(subtractAmount(amount));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(component);
