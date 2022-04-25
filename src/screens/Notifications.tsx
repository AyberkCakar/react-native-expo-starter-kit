import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { StorageService } from "../services";
import Icon from "@expo/vector-icons/FontAwesome5";

import { useTheme, useTranslation, useData } from "../hooks";
import { Block, Button, Image, Text } from "../components";
import { IUser } from "../models/user.model";

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

  async function notificationRead() {
    const batch = writeBatch(firestore);
    const notificationRef = doc(firestore, "notifications", notification.uid);
    batch.update(notificationRef, { is_read: true });
    await batch.commit();
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
                style={{ marginTop: 12 }}
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
            <Text size={18} numberOfLines={1}>
              {notification?.title}
            </Text>
            <Text marginTop={2} size={12} numberOfLines={2} lineHeight={15}>
              {notification?.description}
            </Text>
          </Block>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

const Notifications = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [notificationCard, setNotificationCard] = useState<any[]>([]);

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
          querySnapshot.forEach((doc) => {
            const notification = doc.data();
            notificationList.push(
              <NotificationCard
                key={doc.id}
                notification={{ ...notification, uid: doc.id }}
              />
            );
          });
          setNotificationCard(notificationList);
        });
      }
      getNotifications();
    });
  }, []);

  const { assets, colors, sizes } = useTheme();

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{ zIndex: 0 }}>
          <Button
            row
            flex={0}
            marginLeft={10}
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
        <Block
          scroll
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: sizes.padding }}
        >
          <Block>{notificationCard}</Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Notifications;
