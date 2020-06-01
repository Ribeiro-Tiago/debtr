import { SUBTRACT_AMOUNT_LEFT, ADD_AMOUNT_LEFT } from '../actions/types';
import { AmountLeftReducerAction } from '../../types/store';

const initState = 0;

export default (
  state = initState,
  { type, payload }: AmountLeftReducerAction
) => {
  switch (type) {
    case ADD_AMOUNT_LEFT: {
      return state + payload;
    }

    case SUBTRACT_AMOUNT_LEFT: {
      return state - payload;
    }

    default:
      return state;
  }
};
