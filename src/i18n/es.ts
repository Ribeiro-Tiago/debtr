import { formatCurrency, addLeadZero } from "../utils";
import { SupportedCurrencies } from "../types";

export const name = "Español";

export default {
  _locale: "es",
  errTitle: "Error",
  errMsg: `Se ha producido un error inesperado al recuperar sus gastos. \n\nSi persiste, póngase en contacto con el servicio de asistencia técnica`,
  close: "Cerrar",
  noMonthlyExpenses: "Todavía no has creado ningún gasto",
  emptyMonthlyExpenses: "No tiene gastos este mes",
  amountLeft: (amount: number, currency: SupportedCurrencies) => {
    return `te quedan ${formatCurrency(amount, currency)}`;
  },
  confirm: "Confirmar",
  cancel: "Cancelar",
  back: "Volver",
  createExpenseTitle: "Crear gasto",
  updateExpenseTitle: "Actualizar gasto",
  submit: "Enviar",
  delete: "Borrar",
  description: "Descripción",
  descriptionErr: "La descripción es necesaria",
  descriptionPlaceholder: "E.g.: Netflix",
  amount: "Cantidad",
  amountErr: "Cantidad debe ser un número válido",
  amountPlaceholder: "E.g.: 14 (Sólo un número)",
  emptyAllExpenses: "Cree su primer gasto",
  monthlyExpense: "Sucede todos los meses",
  allExpensesTitle: "All expensTodos los gastos",
  months: "Meses",
  monthsHelper:
    "¿Este gasto sólo se produce en determinados meses? Si se deja todo sin seleccionar, significa que ocurre todos los meses",
  settings: "Ajustes",
  expenses: "Gstos",
  create: "Crear",
  langauge: "Idioma",
  about: "Acerca",
  version: "Versión de la aplicación",
  privacyPolicy: "Política de privacidad",
  tos: "Condiciones de servicio",
  webviewLoadErr:
    "Se ha producido un error al intentar cargar el archivo. \n\nVuelva a intentarlo más tarde y, si el problema persiste, póngase en contacto con nosotros",
  currency: "Moneda",
  monthNames: [
    "Enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ],
  expenseNotif: "Recordatorio de notificación",
  weekDays: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
  timePickerTitle: "Escoge un horario para que la notificación se active",
  undefinedReminder:
    "Seleccione el día en que desea que se le recuerde este gasto",
  reminderAt: (date: Date) => {
    const day = addLeadZero(date.getDate());
    const hours = `${addLeadZero(date.getHours())}:${addLeadZero(
      date.getMinutes(),
    )}`;

    return `El día ${day} a las ${hours} de cada mes se le recordará este gasto`;
  },
  getNotifTitle: `Recordatorio de pago`,
  getNotifDesc: (expense: string) => `No olvides pagar ${expense}`,
  noNotifErr:
    "Si quieres activar la notificación tienes que seleccionar un día",
  reminderChooseDate: "Cambiar el día",
  reminderChooseHour: "Cambio de hora",
  undo: "Deshacer",
  snackbarDeletedText: "Borrado con éxito",
  select: "Seleccione",
  selectLanguage: "Seleccione uno de los idiomas admitidos:",
  languageNotFound: "Uh oh... Parece que ",
  languageNotFound2: " no es compatible con el idioma de su dispositivo",
  resetDay: "Reiniciar el día",
  resetDayHelper:
    'Determina cuándo es el día de "fin de mes". Este día es cuando el mes "comienza" y los gastos se reinician',
};
