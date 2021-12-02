import {connect} from "react-redux";

import Settings from "./Settings";
import {StoreState} from "../../types/store";
import {SupportedCurrencies} from "../../types";
import {updateCurrency} from "../../store/actions/currency";
import {updateResetDay} from "../../store/actions/settings";

const mapStateToProps = ({currency, settings}: StoreState) => {
  const date = new Date();
  const resetDay = settings.resetDay;

  if (resetDay) {
    date.setDate(resetDay);

    if (date.getMonth() !== new Date().getMonth()) {
      date.setMonth(date.getMonth() - 1);
      date.setDate(resetDay - 1);
    }
  }

  return {initCurrency: currency, initResetDay: date};
};

const mapDispatchToProps = (dispatch: Function) => ({
  updateCurrency: (currency: SupportedCurrencies) => {
    return dispatch(updateCurrency(currency));
  },
  updateResetDay: (day: number) => dispatch(updateResetDay(day)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
