export interface NotificationTexts {
  title: string;
  message: string;
}

export interface Notification extends NotificationTexts {
  date: Date;
  id: string;
}
