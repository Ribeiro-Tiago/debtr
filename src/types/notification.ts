export interface NotificationTexts {
  title: string;
  message: string;
}

export interface Notification extends NotificationTexts {
  date: Date;
  id: string;
}

export interface StoredNotification extends Notification {
  months: number[];
}
