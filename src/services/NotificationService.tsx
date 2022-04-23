import * as Notifications from "expo-notifications";
import { IPushNotification } from "../models/notification.model";
import Storage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import { Platform } from "react-native";

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
        title: pushNotification.title,
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
      trigger: { seconds: 10  },
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

  static async registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

};

