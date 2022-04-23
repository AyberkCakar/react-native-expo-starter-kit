import * as Notifications from "expo-notifications";
import { IPushNotification } from "../models/notification.model";
import Storage from "@react-native-async-storage/async-storage";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export class NotificationService {

  static async getExpoToken()  {
    const user = await Storage.getItem("user");
    return JSON.parse(user as string)?.expoToken;
  }

  static async schedulePushNotification(pushNotification: IPushNotification) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: pushNotification.title + " 📬",
        body: pushNotification.body,
        data: {
          someData: pushNotification.someData,
          isUrl: pushNotification.isUrl,
          url: pushNotification.url,
        },
      },
      trigger: { seconds: pushNotification.trigger as number },
    });
  }

  static async sendPushNotification(
    pushNotification: IPushNotification,
    expoPushToken?: string
  ) {
    const message = {
      to:  expoPushToken ? expoPushToken : await this.getExpoToken(),
      sound: "default",
      title: pushNotification.title,
      body: pushNotification.body,
      data: {
        someData: pushNotification.someData,
        isUrl: pushNotification.isUrl,
        url: pushNotification.url,
      },
    };

    await this.apiFetchNotification(message);
  }

  static async apiFetchNotification(message: any) {
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

};

