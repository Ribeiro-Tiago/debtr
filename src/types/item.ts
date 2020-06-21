import { NotificationTexts } from "./notification";
import { Item, ItemCreation, ItemNotification } from "./";

export interface UpdateItemParams {
  item: Item;
  oldAmount: number;
  oldNotif: ItemNotification;
  notifTexts: NotificationTexts;
}

export interface RemoveItemParams {
  id: string;
  months: number[];
  amount: number;
  notifId: string;
}

export interface CreateItemParams {
  item: ItemCreation;
  notifTexts: NotificationTexts;
}
