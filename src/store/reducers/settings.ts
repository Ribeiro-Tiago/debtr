import { SET_RESET_DAY, UPDATE_RESET_DAY } from "../actions/types";
import { ReducerAction } from "../../types/store";
import { updateResetDay } from "../../services/storage";

const initState = 1;

export default (
  state = initState,
  { type, payload }: ReducerAction<number>,
) => {
  switch (type) {
    case SET_RESET_DAY: {
      return payload;
    }

    case UPDATE_RESET_DAY: {
      updateResetDay(payload);

      return payload;
    }

    default:
      return state;
  }
};
