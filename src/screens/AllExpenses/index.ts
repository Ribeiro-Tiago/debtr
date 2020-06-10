import { connect } from "react-redux";

import component from "./component";
import { StoreState } from "../../types/store";
import { Item, Month } from "../../types";
import { updateSelected } from "../../store/actions/current";
import { removeItem } from "../../store/actions/items";
import { subtractAmount } from "../../store/actions/amountLeft";
import { isCurrentMonth } from "../../utils";

const mapStateToProps = (state: StoreState) => ({ items: state.items });

const mapDispatchToProps = (dispatch: Function) => ({
  updateCurrent: (item?: Item) => dispatch(updateSelected(item)),
  removeItem: (id: string, months: Month[], amount: number) => {
    dispatch(removeItem(id));

    if (isCurrentMonth(months)) {
      dispatch(subtractAmount(amount));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(component);
