import { connect } from "react-redux";

import Navigator from "./Navigator";
import { Item } from "../../types";
import { setAmount } from "../../store/actions/amountLeft";
import { setItems } from "../../store/actions/items";

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setAmountLeft: (amount: number) => dispatch(setAmount(amount)),
    setItems: (items: Item[]) => dispatch(setItems(items)),
  };
};

export default connect(null, mapDispatchToProps)(Navigator);
