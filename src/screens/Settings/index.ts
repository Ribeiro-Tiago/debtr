import { connect } from "react-redux";

import Settings from "./Settings";
import { StoreState } from "../../types/store";
import { Item } from "../../types";
import { toggleItemStatus, setItems } from "../../store/actions/items";
import { addAmount, subtractAmount } from "../../store/actions/amountLeft";

const mapStateToProps = ({}: StoreState) => ({});

const mapDispatchToProps = (dispatch: Function) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
