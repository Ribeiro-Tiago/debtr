import { formatCurrency, addLeadZero } from "../utils";
import { SupportedCurrencies } from "../types";

const getDayTh = (digit: string) => {
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
  errMsg: `An unexpected error ocurred retrieving your expenses. \n\nIf it persists contact support.`,
  close: "Close",
  noMonthlyExpenses: "You haven't created any expenses yet",
  emptyMonthlyExpenses: "You have no expenses this month",
  amountLeft: (amount: number, currency: SupportedCurrencies) => {
    return `${formatCurrency(amount, currency)} left`;
  },
  confirm: "Confirm",
  cancel: "Cancel",
  back: "Back",
  createExpenseTitle: "Create expense",
  updateExpenseTitle: "Update expense",
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
  allExpensesTitle: "All expenses",
  months: "Months",
  monthsHelper:
    "Does this expense only happen in certain months ? Leaving all unselected means it happens every month",
  settings: "Settings",
  expenses: "Expenses",
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
  undefinedReminder: "Select the day you'd like to be reminded of this expense",
  reminderAt: (date: Date) => {
    const day = addLeadZero(date.getDate());
    const hours = `${addLeadZero(date.getHours())}:${addLeadZero(
      date.getMinutes(),
    )}`;
    const dayTh = getDayTh(day.split("").pop());

    return `You'll be reminded on the ${day}${dayTh} at ${hours} of every month this expense happens`;
  },
  getNotifTitle: `Payment reminder`,
  getNotifDesc: (expense: string) => `Don't forget to pay ${expense}`,
  noNotifErr: "If you want to enable the notification you have to select a day",
  reminderChooseDate: "Change day",
  reminderChooseHour: "Change hour",
  undo: "Undo",
  snackbarDeletedText: "Deleted successfully",
  select: "Select",
  selectLanguage: "Select one of the supported languages:",
  languageNotFound: "Uh oh... It seems ",
  languageNotFound2: " doesn't support your device language",
  resetDay: "Reset day",
  resetDayHelper:
    'Determines when is your "end of the month" day. This day is when the month "starts" and expenses reset',
};
