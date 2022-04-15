import React, { useCallback, useState, useEffect, useRef } from "react";

import { useTheme, useTranslation } from "../hooks";
import { Block, Button, Input, Title, Text } from "../components";
import * as regex from '../constants/regex';

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

interface INotification {
  title: string;
  body: string;
  someData: string;
}

const Notification = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const { t } = useTranslation();
  const { assets, colors, gradients, sizes } = useTheme();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token: string | undefined) =>
      setExpoPushToken(token as string)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const PushNotification = () => {
    const [pushNotification, setPushNotification] = useState<INotification>({
      title: "",
      body: "",
      someData: "",
    });

    interface INotificationValidation {
      title: boolean;
      body: boolean;
    }

    const [isValid, setIsValid] = useState<INotificationValidation>({
      title: false,
      body: false,
    });

    const handleChange = useCallback(
      (value) => {
        setPushNotification((state) => ({ ...state, ...value }));
      },
      [setPushNotification]
    );

    const handleSendNotification = useCallback(async () => {
      if (!Object.values(isValid).includes(false)) {
        await sendPushNotification(expoPushToken);
      }
    }, [isValid, pushNotification]);

    useEffect(() => {
      setIsValid((state) => ({
        ...state,
        body: regex.notification.test(pushNotification.body),
        title: regex.notification.test(pushNotification.title),
      }));
    }, [pushNotification, setIsValid]);

    async function sendPushNotification(expoPushToken: string) {
      const message = {
        to: expoPushToken,
        sound: "default",
        title: pushNotification.title,
        body: pushNotification.body,
        data: { someData: pushNotification.someData },
      };

      apiFetchNotification(message);
    }

    async function schedulePushNotification() {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: pushNotification.title + " 📬",
          body: pushNotification.body,
          data: { data: pushNotification.someData },
        },
        trigger: { seconds: 5 },
      });
    }

    return (
      <Block>
        <Title titleText={t("notification.pushNotificationTitle")} />
        <Block paddingHorizontal={sizes.sm}>
          <Input
            autoCapitalize="none"
            marginBottom={sizes.sm}
            label={t("notification.title") + "*"}
            placeholder={t("notification.titlePlaceholder") + "*"}
            success={Boolean(pushNotification.title && isValid.title)}
            danger={Boolean(pushNotification.title && !isValid.title)}
            onChangeText={(value) => handleChange({ title: value })}
          />
          <Input
            autoCapitalize="none"
            marginBottom={sizes.sm}
            label={t("notification.body") + "*"}
            placeholder={t("notification.bodyPlaceholder") + "*"}
            success={Boolean(pushNotification.body && isValid.body)}
            danger={Boolean(pushNotification.body && !isValid.body)}
            onChangeText={(value) => handleChange({ body: value })}
          />
          <Input
            autoCapitalize="none"
            marginBottom={sizes.sm}
            label={t("notification.someData")}
            placeholder={t("notification.someDataPlaceholder")}
            onChangeText={(value) => handleChange({ someData: value })}
          />
          <Block>
            <Text semibold>
            {t("notification.expoToken")}: <Text>{expoPushToken}</Text>
            </Text>
          </Block>
          <Block>
            <Text semibold>
            {t("notification.notificationTitle")}:{" "}
              <Text>{notification && notification.request.content.title}</Text>
            </Text>
          </Block>
          <Block>
            <Text semibold>
            {t("notification.notificationBody")}:{" "}
              <Text>{notification && notification.request.content.body}</Text>
            </Text>
          </Block>
          <Block>
            <Text semibold>
              {t("notification.notificationSomeData")}:{" "}
              <Text>
                {notification &&
                  JSON.stringify(notification.request.content.data.data)}
              </Text>
            </Text>
          </Block>
          <Button
            onPress={handleSendNotification}
            marginVertical={sizes.sm}
            marginHorizontal={sizes.sm}
            gradient={gradients.primary}
          >
            <Text bold white transform="uppercase">
              {t("notification.sendNotification")}
            </Text>
          </Button>

          <Button
            onPress={async () => {
              await schedulePushNotification();
            }}
            marginHorizontal={sizes.sm}
            gradient={gradients.secondary}
          >
            <Text bold white transform="uppercase">
              {t("notification.sendScheduleNotification")}
            </Text>
          </Button>
        </Block>
      </Block>
    );
  };

  return (
    <Block safe>
      <Block
        scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: sizes.padding }}
      >
        <PushNotification />
      </Block>
    </Block>
  );

  async function registerForPushNotificationsAsync() {
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
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
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

  async function apiFetchNotification(message: any) {
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

export default Notification;
