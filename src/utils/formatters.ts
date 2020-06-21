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
