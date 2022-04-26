import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { StorageService } from "../services";
import Icon from "@expo/vector-icons/FontAwesome5";
import { useToast } from "react-native-toast-notifications";

import { useTheme, useTranslation, useData } from "../hooks";
import { Block, Button, Image, Text } from "../components";
import { IUser } from "../models/user.model";
import { INotification } from "../models/notification.model";

import {
  collection,
  query,
  onSnapshot,
  where,
  doc,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "../../firebase";

import { TouchableOpacity } from "react-native";

const NotificationCard = ({ notification }) => {
  const { assets, gradients, sizes } = useTheme();
  const { isDark } = useData();
  const { t } = useTranslation();

  async function notificationRead() {
    const batch = writeBatch(firestore);
    const notificationRef = doc(firestore, "notifications", notification.uid);
    batch.update(notificationRef, { is_read: true });
    await batch.commit();
  }

  function getNotificationDateDiff(notification: any): string {
    const notificationDate = new Date(
      notification?.created_at?.seconds * 1000
    ).getTime();

    const diff = Math.abs(new Date().getTime() - notificationDate);

    const day = Math.floor(diff / (1000 * 60 * 60 * 24)) % 24;
    const hour = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const minute = Math.floor(diff / (1000 * 60)) % 60;

    let dateDiff: string = "";

    if (day === 0) {
      if (hour === 0) {
        dateDiff = minute + t("common.minuteShortName");
      } else {
        dateDiff = hour + t("common.hourShortName");
      }
    } else {
      dateDiff = day + t("common.dayShortName");
    }

    return dateDiff;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        !notification?.detail ? notificationRead() : console.log("go_detail");
      }}
    >
      <Block marginTop={5} paddingHorizontal={5}>
        <Block card row>
          <TouchableOpacity disabled={true}>
            {notification?.is_image ? (
              <Image
                width={45}
                height={45}
                source={
                  notification?.image
                    ? {
                        uri: notification?.image,
                      }
                    : assets.logo
                }
                radius={100}
              />
            ) : (
              <Icon
                name={notification?.image ? notification?.image : "bell"}
                size={38}
                color={isDark ? "white" : "black"}
              />
            )}

            {!notification?.is_read ? (
              <Block
                flex={0}
                right={0}
                width={sizes.s}
                height={sizes.s}
                radius={sizes.xs}
                position="absolute"
                gradient={gradients?.primary}
              />
            ) : (
              <Block />
            )}
          </TouchableOpacity>

          <Block marginLeft={sizes.sm}>
            <Text size={18} numberOfLines={1} marginRight={10}>
              {notification?.title}
            </Text>
            <Text marginTop={2} size={12} numberOfLines={2} lineHeight={15}>
              {notification?.description}
            </Text>
          </Block>
          <Text size={14} color={"gray"}>
            {getNotificationDateDiff(notification)}
          </Text>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

const Notifications = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [notificationCard, setNotificationCard] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const toast = useToast();

  async function markAllRead() {
    let id = toast.show(t("notifications.markAllRead"));

    const batch = writeBatch(firestore);

    notifications.forEach((notification) => {
      const notificationRef = doc(firestore, "notifications", notification.uid);
      batch.update(notificationRef, { is_read: true });
    });

    await batch
      .commit()
      .then(() => {
        toast.update(id, t("notifications.allMarkedAsRead"), {
          type: "success",
        });
      })
      .catch(() =>
        toast.update(id, t("notifications.failedToMarkAllAsRead"), {
          type: "danger",
        })
      );
  }

  async function deleteAll() {
    let id = toast.show(t("notifications.allBeginDeleted"));

    const batch = writeBatch(firestore);

    notifications.forEach((notification) => {
      const notificationRef = doc(firestore, "notifications", notification.uid);
      batch.delete(notificationRef);
    });

    await batch
      .commit()
      .then(() => {
        toast.update(id, t("notifications.allDeleted"), {
          type: "success",
        });
      })
      .catch(() =>
        toast.update(id, t("notifications.couldNotDeleteAll"), {
          type: "danger",
        })
      );
  }

  useEffect(() => {
    navigation.addListener("focus", () => {
      async function getNotifications() {
        const user: IUser = (await StorageService.getStorageObject(
          "user"
        )) as IUser;
        const q = query(
          collection(firestore, "notifications"),
          where("user_uid", "==", user.uid)
        );
        onSnapshot(q, (querySnapshot) => {
          const notificationList: any[] = [];
          const notificationArr: INotification[] = [];
          querySnapshot.forEach((doc) => {
            let notification: INotification = doc.data() as INotification;
            notification = { ...notification, uid: doc.id };
            notificationArr.push(notification);
            notificationList.push(
              <NotificationCard key={doc.id} notification={notification} />
            );
          });
          setNotificationCard(notificationList);
          setNotifications(notificationArr);
        });
      }
      getNotifications();
    });
  }, []);

  const { assets, colors, sizes } = useTheme();

  return (
    <Block safe marginTop={sizes.md}>
      <Block flex={0} style={{ zIndex: 0 }}>
        <Button
          row
          flex={0}
          marginLeft={15}
          justify="flex-start"
          onPress={() => navigation.goBack()}
        >
          <Image
            radius={0}
            width={10}
            height={18}
            color={colors.white}
            source={assets.arrow}
            transform={[{ rotate: "180deg" }]}
          />
          <Text p white marginLeft={sizes.s}>
            {t("notifications.notifications")}
          </Text>
        </Button>
      </Block>
      <Block flex={0} row justify="space-between">
        <TouchableOpacity
          disabled={notifications.length === 0}
          style={{ marginTop: sizes.s, alignItems: "flex-start" }}
          onPress={() => {
            markAllRead();
          }}
        >
          <Text marginLeft={sizes.sm}>{t("notifications.markAllRead")}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={notifications.length === 0}
          style={{ marginTop: sizes.s, marginRight: sizes.sm }}
          onPress={() => {
            deleteAll();
          }}
        >
          <Text marginLeft={sizes.sm}>{t("notifications.deleteAll")}</Text>
        </TouchableOpacity>
      </Block>
      <Block paddingHorizontal={sizes.s}>
        <Block
          scroll
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: sizes.s }}
        >
          <Block>{notificationCard}</Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Notifications;
