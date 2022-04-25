import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { useToast } from "react-native-toast-notifications";
import { StorageService } from "../services";
import Icon from "@expo/vector-icons/FontAwesome5";

import { useTheme, useTranslation, useData } from "../hooks";
import { Block, Button, Input, Image, Text } from "../components";

import { setDoc, doc, getDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { TouchableOpacity } from "react-native";

const NotificationCard = ({ notification }) => {
  const { assets, colors, gradients, sizes } = useTheme();
  const { isDark } = useData();

  return (
    <TouchableOpacity
      disabled={!notification?.detail}
      onPress={() => {
        console.log("click");
      }}
    >
      <Block marginTop={5} paddingHorizontal={5}>
        <Block card row>
          <TouchableOpacity disabled={true}>
            {notification?.is_image ? (
              <Image
                width={50}
                height={50}
                marginTop={5}
                source={
                  notification?.image
                    ? {
                        uri: notification?.image,
                      }
                    : assets.anonymous
                }
                style={{ height: 70 }}
                radius={100}
              />
            ) : (
              <Icon
                name={notification?.image ? notification?.image : "bell"}
                style={{ marginTop: 12 }}
                size={40}
                color={isDark ? "white" : "black"}
              />
            )}

            <Block
              flex={0}
              right={0}
              width={sizes.s}
              height={sizes.s}
              radius={sizes.xs}
              position="absolute"
              gradient={gradients?.primary}
            />
          </TouchableOpacity>

          <Block marginLeft={sizes.sm}>
            <Text size={18} numberOfLines={1}>
              {"Test Title"}
              {notification?.title}
            </Text>
            <Text size={12} numberOfLines={2} lineHeight={15}>
              {
                "Test DescriptionDesc riptionDescrip tionDescri ptionDesc riptionDescriptionD escriptionDescriptionDescription"
              }

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

  const [notification, setNotification] = useState<any>({});

  const { assets, colors, gradients, sizes } = useTheme();

  const handleChange = useCallback(
    (value) => {
      setNotification((state) => ({ ...state, ...value }));
    },
    [notification]
  );

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
          <NotificationCard notification={null} />
          <NotificationCard notification={null} />
          <NotificationCard notification={null} />
          <NotificationCard notification={null} />
          <NotificationCard notification={null} />
          <NotificationCard notification={null} />
          <NotificationCard notification={null} />
          <NotificationCard notification={null} />
          <NotificationCard notification={null} />
          <NotificationCard notification={null} />
          <NotificationCard notification={null} />
          <NotificationCard notification={null} />
          <NotificationCard notification={null} />
          <NotificationCard notification={null} />
          <NotificationCard notification={null} />
          <NotificationCard notification={null} />
          <NotificationCard notification={null} />
          <NotificationCard notification={null} />
          <NotificationCard notification={null} />
          <NotificationCard notification={null} />
          <NotificationCard notification={null} />
        </Block>
      </Block>
    </Block>
  );
};

export default Notifications;
