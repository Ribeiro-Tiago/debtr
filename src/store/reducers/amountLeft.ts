import {
  SUBTRACT_AMOUNT_LEFT,
  ADD_AMOUNT_LEFT,
  SET_AMOUNT_LEFT,
import { AmountLeftReducerAction } from '../../types/store';

const initState = 0;

export default (
  state = initState,
  { type, payload }: AmountLeftReducerAction
) => {
  switch (type) {
    case SET_AMOUNT_LEFT: {
      return payload;
    }

    case ADD_AMOUNT_LEFT: {
      return Number(state) + Number(payload);
    }

    case SUBTRACT_AMOUNT_LEFT: {
      return Number(state) - Number(payload);
    }

    default:
      return state;
  }
};
