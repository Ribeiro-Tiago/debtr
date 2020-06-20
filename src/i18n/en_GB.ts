import { formatCurrency } from "../utils/formatters";
import { SupportedCurrencies } from "../types";

export const name = "English (U.K.)";

export default {
  _locale: "en_GB",
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
};
