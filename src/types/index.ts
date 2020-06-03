export interface ItemCreation {
  description: string;
  amount: number;
  months: Month[];
}

export interface Item extends ItemCreation {
  id: string;
  isPaid: boolean;
}

export interface StorageData {
  amountLeft: number;
  items: Item[];
}

export interface Month {
  id: number;
  label: string;
}
