import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import Storage from "@react-native-async-storage/async-storage";

import { useTheme, useTranslation } from "../hooks";
import { Block, Button, Input, Image, Text } from "../components";

import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { firebaseError } from "../constants";

interface IUser {
  name: string;
  email: string;
  twitter: string;
  instagram: string;
  github: string;
  title: string;
  aboutMe: string;
}

const EditUser = () => {
  const { t, locale } = useTranslation();
  const navigation = useNavigation();

  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    twitter: "",
    instagram: "",
    github: "",
    title: "",
    aboutMe: "",
  });
  const { assets, colors, gradients, sizes } = useTheme();

  const handleChange = useCallback(
    (value) => {
      setUser((state) => ({ ...state, ...value }));
    },
    [setUser]
  );

  const handleEditUser = useCallback(async () => {}, [user]);

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
              {t("user.editUser")}
            </Text>
          </Button>
        </Block>
        <Block
          scroll
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: sizes.padding }}
        >
          <Block paddingHorizontal={sizes.sm}>
            <Input
              autoCapitalize="none"
              marginBottom={sizes.sm}
              label={t("common.name") + "*"}
              placeholder={t("common.namePlaceholder") + "*"}
              disabled
              value={user.name}
            />
            <Input
              autoCapitalize="none"
              marginBottom={sizes.sm}
              label={t("common.email") + "*"}
              placeholder={t("common.emailPlaceholder") + "*"}
              value={user.email}
              disabled
            />
            <Input
              autoCapitalize="none"
              marginBottom={sizes.sm}
              label={t("common.title")}
              placeholder={t("common.titlePlaceholder")}
              value={user.title}
              onChangeText={(value) => handleChange({ title: value })}
            />
            <Input
              autoCapitalize="none"
              marginBottom={sizes.sm}
              label={t("common.instagram")}
              placeholder={t("common.instagramPlaceholder")}
              value={user.instagram}
              onChangeText={(value) => handleChange({ instagram: value })}
            />
            <Input
              autoCapitalize="none"
              marginBottom={sizes.sm}
              label={t("common.twitter")}
              placeholder={t("common.twitterPlaceholder")}
              value={user.twitter}
              onChangeText={(value) => handleChange({ twitter: value })}
            />
            <Input
              autoCapitalize="none"
              marginBottom={sizes.sm}
              label={t("common.github")}
              placeholder={t("common.githubPlaceholder")}
              value={user.github}
              onChangeText={(value) => handleChange({ github: value })}
            />
            <Input
              autoCapitalize="none"
              marginBottom={sizes.sm}
              multiline={true}
              numberOfLines={10}
              style={{ height: 200, textAlignVertical: "top" }}
              label={t("common.aboutMe")}
              placeholder={t("common.aboutMePlaceholder")}
              value={user.aboutMe}
              onChangeText={(value) => handleChange({ aboutMe: value })}
            />
            <Button
              onPress={handleEditUser}
              marginVertical={sizes.sm}
              marginHorizontal={sizes.sm}
              gradient={gradients.primary}
            >
              <Text bold white transform="uppercase">
                {t("common.saveChanges")}
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default EditUser;
