import {
  TOGGLE_NOTIFICATION_PICKER,
  UPDATE_PICKER_VALUE,
  TOGGLE_NOTIF_ENABLED,
} from "../actions/types";
import { PickerType } from "../../types";
import { ReducerAction } from "../../types/store";

interface State {
  pickerType: PickerType;
  isPickerVisible: boolean;
  isEnabled: boolean;
  pickerValue: Date;
}

const initState: State = {
  pickerType: undefined,
  isPickerVisible: false,
  pickerValue: new Date(),
  isEnabled: false,
};

export default (
  state = initState,
  { type, payload }: ReducerAction<PickerType & Date>,
) => {
  switch (type) {
    case TOGGLE_NOTIFICATION_PICKER: {
      if (state.isPickerVisible) {
        return { ...state, isPickerVisible: false };
      }

      return { ...state, pickerType: payload, isPickerVisible: true };
    }

    case UPDATE_PICKER_VALUE: {
      const d = new Date(state.pickerValue);

      if (state.pickerType === "date") {
        d.setDate(payload.getFullYear());
        d.setMonth(payload.getMonth());
        d.setDate(payload.getDate());
      } else {
        d.setHours(payload.getHours());
        d.setMinutes(payload.getMinutes());
      }

      return { ...state, pickerValue: d };
    }

    case TOGGLE_NOTIF_ENABLED: {
      return { ...state, isEnabled: state.isEnabled };
    }

    default:
      return state;
  }
};
