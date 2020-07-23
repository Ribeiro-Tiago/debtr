import { connect } from "react-redux";

import NotificationController from "./NotificationController";
import { PickerType } from "../../types";
import {
  toggleNotificationPicker,
  toggleNotifEnabled,
} from "../../store/actions/notification";
import { StoreState } from "../../types/store";

const mapStatetoProps = ({ notification }: StoreState) => ({
  pickerDate: notification.pickerValue,
  isPickerVisible: notification.isPickerVisible,
});

const mapDispatchToProps = (dispatch: Function) => ({
  togglePicker: (type: PickerType) => dispatch(toggleNotificationPicker(type)),
  toggleNotifStatus: () => dispatch(toggleNotifEnabled()),
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps,
)(NotificationController);
