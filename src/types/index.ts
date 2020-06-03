export interface Item {
  id: string;
  isPaid: boolean;
  desc: string;
  amount: number;
  months: number[];
}

export interface StorageData {
  amountLeft: number;
  items: Item[];
}

export interface Month {
  id: number;
  label: string;
}
