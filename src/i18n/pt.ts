import { SupportedCurrencies } from "../types";
import { formatCurrency } from "../utils/formatters";
import { addLeadZero } from "../utils";

export const name = "Português";

export default {
  _locale: "pt",
  errTitle: "Erro",
  errMsg: (err: string) => {
    return `Ocorreu um erro inesperado a obter as suas despesas. \n\nSe o problema persistir contacte-nos com a seguinte mensagem: \n\n${err}`;
  },
  close: "Fechar",
  emptyMonthlyExpenses: "You have no expenses left this month",
  amountLeft: (amount: number, currency: SupportedCurrencies) => {
    return `${formatCurrency(amount, currency)} restante`;
  },
  confirmDeleteTitle: "Confirmar remoção?",
  confirmDeleteDesc:
    "Está prestos a remover esta desepsa. Esta ação é irreversível",
  confirm: "Confirmar",
  cancel: "Cancelar",
  back: "Voltar",
  createExpenseTitle: "Criar despesa",
  updateExpenseTitle: "Atualizar despesa",
  submit: "Submeter",
  delete: "Remover",
  description: "Descrição",
  descriptionErr: "Descrição é obrigatória",
  descriptionPlaceholder: "E.g.: Netflix",
  amount: "Quantia",
  amountErr: "Quantia tem que ser um número válido",
  amountPlaceholder: "E.g.: 14 (Apenas o número)",
  emptyAllExpenses: "Crie a sua primeira despesa",
  monthlyExpense: "Acontece todos os meses",
  allExpensesTitle: "Todas as despesas mensais",
  months: "Meses",
  monthsHelper:
    "Esta só existe nalguns meses ? Não selecionar nenhum significa que acontece em todos",
  settings: "Definições",
  create: "Criar",
  about: "About",
  langauge: "Linguagem",
  version: "Versão da aplicação",
  privacyPolicy: "Política de privacidade",
  tos: "Termos de utilização",
  webviewLoadErr:
    "Ocorreu um erro ao tentar carregar o ficheiro. \n\nTente novamente mais tarde e se o problema persistir por favor entre em contacto connosco",
  currency: "Moeda",
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novemmbro",
    "Dezembro",
  ],
  expenseNotif: "Notificação de lembrete",
  weekDays: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
  timePickerTitle: "Escolha uma hora para a notificação",
  undefinedReminder: "Escolha o dia que gostaria para a notificação",
  reminderAt: (date: Date) => {
    const day = addLeadZero(date.getDate());
    const hours = `${addLeadZero(date.getHours())}:${addLeadZero(
      date.getMinutes(),
    )}`;

    return `Será lembrado no dia ${day} às ${hours} de todos os meses que esta despesa aconteça`;
  },
  getNotifTitle: `Lembrete de pagamento`,
  getNotifDesc: (expense: string) => `Não se esqueça de pagar ${expense}`,
  noNotifErr: "Se quer ativar notificação, tem que escolher um dia",
};
