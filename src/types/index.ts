export interface Item {
  id: string;
  isPaid: boolean;
  desc: string;
  amount: number;
  months: number[];
  isVisible: boolean;
}

export interface StorageData {
  amountLeft: number;
  items: Item[];
}
