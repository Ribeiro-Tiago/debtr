export const name = "Português (Portugal)";

export default {
  monthlyTabName: "Despesas mensais",
  allTabName: "Todas as despesas",
  errTitle: "Erro",
  errMsg: (err: string) => {
    return `Ocorreu um erro inesperado a obter as suas despesas. \n\nSe o problema persistir contacte-nos com a seguinte mensagem: \n\n${err}`;
  },
  close: "Fechar",
  emptyMonthlyExpenses: "You have no expenses left this month",
  amountLeft: (amount: number, currency: string) => {
    return `${amount}${currency} Restante`;
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
};
