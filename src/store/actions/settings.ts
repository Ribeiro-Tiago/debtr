import {SET_RESET_DAY, UPDATE_RESET_DAY} from "./types";

export const setResetDay = (day: number) => ({
  type: SET_RESET_DAY,
  payload: day,
});

export const updateResetDay = (day: number) => ({
  type: UPDATE_RESET_DAY,
  payload: day,
});
