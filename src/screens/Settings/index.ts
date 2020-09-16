import { connect } from "react-redux";

import Settings from "./Settings";
import { StoreState } from "../../types/store";
import { SupportedCurrencies } from "../../types";
import { updateCurrency } from "../../store/actions/currency";
import { updateResetDay } from "../../store/actions/settings";

const mapStateToProps = ({ currency }: StoreState) => ({
  initCurrency: currency,
});

const mapDispatchToProps = (dispatch: Function) => ({
  updateCurrency: (currency: SupportedCurrencies) => {
    return dispatch(updateCurrency(currency));
  },
  updateResetDay: (day: number) => dispatch(updateResetDay(day)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
