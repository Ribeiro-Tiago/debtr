import { SupportedCurrencies } from "../types";

export const formatDecimal = (number: number) => Number(number.toFixed(2));

export const formatCurrency = (
  amount: number,
  currency: SupportedCurrencies,
) => {
  switch (currency) {
    case SupportedCurrencies.EUR: {
      return `${amount}€`;
    }
    case SupportedCurrencies.GBP: {
      return `${amount}£`;
    }
    case SupportedCurrencies.USD: {
      return `$${amount}`;
    }

    default: {
      return `${amount}€`;
    }
  }
};

export const formatDatetime = (date: Date) => {
  const addLeadZero = (num: number) => `0${num}`.substr(-2);

  return {
    day: addLeadZero(date.getDate()),
    time: `${addLeadZero(date.getHours())}:${addLeadZero(date.getMinutes())}`,
  };
};
