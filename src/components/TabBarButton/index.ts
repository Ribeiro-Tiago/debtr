import { connect } from "react-redux";

import TabBarButton from "./TabBarButton";
import { updateSelected } from "../../store/actions/current";

const mapDispatchtoProps = (dispatch: Function) => ({
  updateCurrItem: () => dispatch(updateSelected()),
});

export default connect(null, mapDispatchtoProps)(TabBarButton);
