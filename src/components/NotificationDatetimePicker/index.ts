import { connect } from "react-redux";

import NotificationDatetimePicker from "./NotificationDatetimePicker";
import {
  updatePickerValue,
  toggleNotificationPicker,
} from "../../store/actions/notification";
import { StoreState } from "../../types/store";

const mapStateToProps = ({ notification }: StoreState) => ({
  isVisible: notification.isPickerVisible,
  pickerType: notification.pickerType,
  pickerDate: notification.pickerValue,
});

const mapDispatchToProps = (dispatch: Function) => ({
  togglePicker: () => dispatch(toggleNotificationPicker()),
  updatePickerValue: (date: Date) => dispatch(updatePickerValue(date)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationDatetimePicker);
