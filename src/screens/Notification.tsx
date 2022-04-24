import React, { useCallback, useState, useEffect, useRef } from "react";
import { IPushNotification } from "../models/notification.model";
import { useTheme, useTranslation } from "../hooks";
import { Block, Button, Input, Title, Text } from "../components";
import * as regex from "../constants/regex";

import * as Notifications from "expo-notifications";

import { NotificationService } from "../services";

const Notification = () => {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const { t } = useTranslation();
  const { gradients, sizes } = useTheme();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const PushNotification = () => {
    const [pushNotification, setPushNotification] = useState<IPushNotification>(
      {
        title: "",
        body: "",
        someData: "",
      }
    );

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
        NotificationService.sendPushNotification(pushNotification);
      }
    }, [isValid, pushNotification]);

    useEffect(() => {
      setIsValid((state) => ({
        ...state,
        body: regex.notification.test(pushNotification.body),
        title: regex.notification.test(pushNotification.title),
      }));
    }, [pushNotification, setIsValid]);

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
              NotificationService.schedulePushNotification({...pushNotification, trigger: 5});
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
};

export default Notification;
