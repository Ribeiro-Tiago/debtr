import { Platform } from "react-native";

export * from "./formatters";

export const sanitizeAmount = (amount: any) => {
  try {
    const sanitized = Math.abs(Number(amount.toString().replace(",", ".")));

    return isNaN(sanitized) ? 0 : sanitized;
  } catch (ex) {
    return 0;
  }
};

export const isCurrentMonth = (months: number[]) => {
  const m = new Date().getMonth();

  return !months.length || months.length === 11 || !months.includes(m);
};

export const getPlatformIcon = (name: string) => {
  return Platform.OS === "ios" ? `ios-${name}` : `md-${name}`;
};

export const addLeadZero = (num: number) => `0${num}`.substr(-2);
