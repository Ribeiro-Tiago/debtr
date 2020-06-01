import { SUBTRACT_AMOUNT_LEFT, ADD_AMOUNT_LEFT } from './types';

export const subtractAmount = (amount: number) => ({
  type: SUBTRACT_AMOUNT_LEFT,
  payload: amount,
});

export const addAmount = (amount: number) => ({
  type: ADD_AMOUNT_LEFT,
  payload: amount,
});
