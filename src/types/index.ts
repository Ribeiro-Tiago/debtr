export interface Item {
  id: string;
  isPaid: boolean;
  desc: string;
  price: number;
  months: number[];
  isVisible: boolean;
}

export interface StorageData {
  currMonth: number;
  items: Item[];
}
