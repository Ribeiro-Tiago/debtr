import {
  SUBTRACT_AMOUNT_LEFT,
  ADD_AMOUNT_LEFT,
  SET_AMOUNT_LEFT,
} from '../actions/types';
import { AmountLeftReducerAction } from '../../types/store';
import { updateAmount } from '../../services/storage/storage';

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
      const amount = Number(state) + Number(payload);

      updateAmount(amount);

      return amount;
    }

    case SUBTRACT_AMOUNT_LEFT: {
      const amount = Number(state) - Number(payload);

      updateAmount(amount);

      return amount;
    }

    default:
      return state;
  }
};
