import React, { useCallback, useState, useEffect, useRef } from "react";

import { useTheme, useTranslation, useData } from "../hooks";
import { Block, Button, Input, Image, Text } from "../components";

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

  const Title = ({ titleText }) => {
    return (
      <Block
        row
        flex={0}
        align="center"
        justify="center"
        marginBottom={sizes.sm}
        paddingHorizontal={sizes.xxl}
      >
        <Block
          flex={0}
          height={1}
          width="50%"
          end={[1, 0]}
          start={[0, 1]}
          gradient={gradients.divider}
        />
        <Text h5 center marginHorizontal={sizes.s}>
          {titleText}
        </Text>

        <Block
          flex={0}
          height={1}
          width="50%"
          end={[0, 1]}
          start={[1, 0]}
          gradient={gradients.divider}
        />
      </Block>
    );
  };

  const PushNotification = () => {
    const [pushNotification, setPushNotification] = useState<INotification>({
      title: "",
      body: "",
      someData: "",
    });

    const handleChange = useCallback(
      (value) => {
        setPushNotification((state) => ({ ...state, ...value }));
      },
      [setPushNotification]
    );

    const handleSendNotification = useCallback(async () => {
      await sendPushNotification(expoPushToken);
    }, [pushNotification]);

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
        trigger: { seconds: 10 },
      });
    }

    return (
      <Block>
        <Title titleText="Push Notification" />
        <Block paddingHorizontal={sizes.sm}>
          <Input
            autoCapitalize="none"
            marginBottom={sizes.sm}
            label={t("notification.title")}
            placeholder={t("notification.titlePlaceholder")}
            onChangeText={(value) => handleChange({ title: value })}
          />
          <Input
            autoCapitalize="none"
            marginBottom={sizes.sm}
            label={t("notification.body")}
            placeholder={t("notification.bodyPlaceholder")}
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
              Expo Token: <Text>{expoPushToken}</Text>
            </Text>
          </Block>
          <Block>
            <Text semibold>
              Title:{" "}
              <Text>{notification && notification.request.content.title}</Text>
            </Text>
          </Block>
          <Block>
            <Text semibold>
              Body:{" "}
              <Text>{notification && notification.request.content.body}</Text>
            </Text>
          </Block>
          <Block>
            <Text semibold>
              Some Data:{" "}
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
              {t("notification.sendNotification")}
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
