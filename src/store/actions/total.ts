import { SET_AMOUNT_LEFT } from './types';

export const setAmountLeft = (amount: number) => ({
  type: SET_AMOUNT_LEFT,
  payload: amount,
});
