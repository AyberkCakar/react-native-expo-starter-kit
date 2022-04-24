export interface IPushNotification {
  title: string;
  body: string;
  someData?: string;
  isUrl?: string;
  url?: string;
  trigger?: number;
}
