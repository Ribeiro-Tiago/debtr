import {SET_RESET_DAY, UPDATE_RESET_DAY} from "../actions/types";
import {ReducerAction} from "../../types/store";
import {updateResetDay} from "../../services/storage";

const initState = {resetDay: 1};

export default (state = initState, {type, payload}: ReducerAction<number>) => {
  switch (type) {
    case SET_RESET_DAY: {
      return {...state, resetDay: payload};
    }

    case UPDATE_RESET_DAY: {
      updateResetDay(payload);

      return {...state, resetDay: payload};
    }

    default:
      return state;
  }
};
