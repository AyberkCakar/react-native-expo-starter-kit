import React, { useEffect } from "react";
import { useTheme, useTranslation, useData } from "../hooks";
import { Block, Button, Image, Text } from "../components";
import { INotification } from "../models/notification.model";

import {
  doc,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "../../firebase";

const NotificationDetail = ({ route, navigation }) => {
  const { t } = useTranslation();

  useEffect(() => {
    navigation.addListener("focus", () => {
      async function notificationRead() {
        const batch = writeBatch(firestore);
        const notificationRef = doc(
          firestore,
          "notifications",
          notificationDetail.uid
        );
        batch.update(notificationRef, { is_read: true });
        await batch.commit();
      }

      notificationRead();
    });
  }, []);

  const { assets, colors, sizes } = useTheme();

  const notificationDetail: INotification = route.params;
  const created_date = new Date(notificationDetail?.created_at?.seconds * 1000);
  return (
    <Block safe marginTop={sizes.md}>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: sizes.padding }}
      >
        <Block flex={2}>
          <Block
            marginTop={sizes.sm}
            marginLeft={10}
            row
            style={{ justifyContent: "space-between" }}
          >
            <Button
              row
              flex={0}
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
                {t("notifications.notificationDetail")}
              </Text>
            </Button>
          </Block>
          <Block>
            <Block
              card
              marginTop={sizes.sm}
              marginLeft={sizes.s}
              marginRight={sizes.s}
            >
              <Block marginTop={sizes.m} paddingHorizontal={sizes.padding}>
                <Block marginBottom={sizes.xxl}>
                  {notificationDetail?.detail_image && (
                    <Image
                      source={{ uri: notificationDetail?.detail_image }}
                      style={{ width: "100%", height: 350 }}
                    />
                  )}

                  <Text color={"white"} p secondary marginTop={sizes.sm}>
                    {created_date.toDateString()}{" "}
                    {created_date.toLocaleTimeString("en-US")}
                  </Text>
                  <Text h4 marginVertical={sizes.s}>
                    {notificationDetail?.title}
                  </Text>
                  <Text p lineHeight={26}>
                    {notificationDetail?.detail}
                  </Text>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default NotificationDetail;
