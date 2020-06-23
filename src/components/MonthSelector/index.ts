import { connect } from "react-redux";

import MonthSelector from "./MonthSelector";
import { StoreState } from "../../types/store";
import { updateSelectedMonths } from "../../store/actions/current";

const mapStateToProps = (state: StoreState) => ({
  selectedMonths: state.current.months,
});

const mapDispatchtoProps = (dispatch: Function) => ({
  updateSelected: (payload: number[]) => {
    return dispatch(updateSelectedMonths(payload));
  },
});

export default connect(mapStateToProps, mapDispatchtoProps)(MonthSelector);
