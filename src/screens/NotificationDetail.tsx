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

const NotificationDetail = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [notification, setNotification] = useState<INotification>(null);

  const { assets, colors, sizes } = useTheme();

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
                {t("detail.notification")}
              </Text>
            </Button>
          </Block>
          <Block>
            <Block
              card
              row
              marginTop={sizes.sm}
              marginLeft={sizes.s}
              marginRight={sizes.s}
            >
              <Block marginTop={sizes.m} paddingHorizontal={sizes.padding}>
                <Block marginBottom={sizes.xxl}>
                  <Image
                    resizeMode="cover"
                    source={assets.carousel1}
                    style={{ width: "100%" }}
                  />
                  <Text color={"white"} p secondary marginTop={sizes.sm}>
                    Private Room • 1 Guests • 1 Sofa
                  </Text>
                  <Text h4 marginVertical={sizes.s}>
                    Single room in center
                  </Text>
                  <Text p lineHeight={26}>
                    As Uber works through a huge amount of internal management
                    turmoil, the company is also consolidating.
                    As Uber works through a huge amount of internal management
                    turmoil, the company is also consolidating.
                    As Uber works through a huge amount of internal management
                    turmoil, the company is also consolidating.
                    As Uber works through a huge amount of internal management
                    turmoil, the company is also consolidating.
                    As Uber works through a huge amount of internal management
                    turmoil, the company is also consolidating.
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
