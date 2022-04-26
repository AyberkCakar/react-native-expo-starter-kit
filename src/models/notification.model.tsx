export interface IPushNotification {
  title: string;
  body: string;
  someData?: string;
  isUrl?: string;
  url?: string;
  trigger?: number;
}

export interface INotification {
  uid: string;
  is_read?: boolean;
  is_image?: boolean;
  description?: string;
  title?: string;
  image?: string;
  user_uid?: string;
  detail?: string;
  created_at?: Date;
}
