import { formatCurrency, addLeadZero } from "../utils";
import { SupportedCurrencies } from "../types";

export const getDayTh = (digit: string) => {
  switch (digit) {
    case "1": {
      return "st";
    }
    case "2": {
      return "nd";
    }
    case "3": {
      return "rd";
    }
    default: {
      return "th";
    }
  }
};

export const name = "English";

export default {
  _locale: "en",
  errTitle: "Error",
  errMsg: (err: string) => {
    return `An unexpected error ocurred retrieving your expenses. \n\nIf it persists contact support with the following message: \n\n${err}`;
  },
  close: "Close",
  emptyMonthlyExpenses: "You have no expenses left this month",
  amountLeft: (amount: number, currency: SupportedCurrencies) => {
    return `${formatCurrency(amount, currency)} left`;
  },
  confirmDeleteTitle: "Confirm delete?",
  confirmDeleteDesc:
    "You are about to delete this expense. This action is irreversable",
  confirm: "Confirm",
  cancel: "Cancel",
  back: "Back",
  createExpenseTitle: "Creating expense",
  updateExpenseTitle: "Updating expense",
  submit: "Submit",
  delete: "Delete",
  description: "Description",
  descriptionErr: "Description is required",
  descriptionPlaceholder: "E.g.: Netflix",
  amount: "Amount",
  amountErr: "Amount must be a valid number",
  amountPlaceholder: "E.g.: 14 (Just a number)",
  emptyAllExpenses: "Create your first expense",
  monthlyExpense: "Happens every month",
  allExpensesTitle: "All monthly expenses",
  months: "Months",
  monthsHelper:
    "Does this expense only happen in certain months ? Leaving all unselected means it happens every month",
  settings: "Settings",
  create: "Create",
  langauge: "Language",
  about: "About",
  version: "App version",
  privacyPolicy: "Privacy Policy",
  tos: "Terms of Service",
  webviewLoadErr:
    "An error ocurred trying to load the file. \n\nTry again later and if the issue persists, please contact us",
  currency: "Currency",
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  expenseNotif: "Notification reminder",
  weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  timePickerTitle: "Pick a times for the notification to go off",
  undefinedReminder:
    "Select the day and time you'd like to be reminded of this expense",
  reminderAt: (date: Date, time: Date) => {
    const day = addLeadZero(date.getDate());
    const hours = `${addLeadZero(time.getHours())}:${addLeadZero(
      time.getMinutes(),
    )}`;
    const dayTh = getDayTh(day.split("").pop());

    return `You'll be reminded on the ${day}${dayTh} at ${hours} of every month this expense happens`;
  },
  getNotifTitle: (expense: string) => `${expense} payment reminder`,
  getNotifDesc: (expense: string) => `Don't forget to pay ${expense}`,
};
