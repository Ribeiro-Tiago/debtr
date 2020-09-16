import { SET_RESET_DAY } from "./types";

export const updateResetDay = (day: number) => ({
  type: SET_RESET_DAY,
  payload: day,
});
