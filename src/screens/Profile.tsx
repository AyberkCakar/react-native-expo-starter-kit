import React, { useCallback, useState, useEffect } from "react";
import { Platform, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { StorageService } from "../services";
import Icon from "@expo/vector-icons/FontAwesome5";

import { IUser } from "../models/user.model";
import { Block, Button, Image, Text } from "../components/";
import { useTheme, useTranslation } from "../hooks/";

const isAndroid = Platform.OS === "android";

const Profile = () => {
  const [user, setUser] = useState({} as IUser);

  const { t } = useTranslation();
  const navigation = useNavigation();
  const { assets, colors, sizes } = useTheme();

  useEffect(() => {
    async function getUser() {
      const userStore: IUser = (await StorageService.getStorageObject(
        "user"
      )) as IUser;

      if (userStore?.github) {
        getGithubFromApiAsync(userStore);
        return;
      }

      setUser(userStore);
    }

    async function getGithubFromApiAsync(user: IUser) {
      return fetch("https://api.github.com/users/" + user.github)
        .then((response) => response.json())
        .then((responseJson) => {
          setUser({
            ...user,
            following: responseJson.following,
            followers: responseJson.followers,
            repos: responseJson.public_repos,
            company: responseJson.company,
          });
        });
    }

    navigation.addListener("focus", () => {
      getUser();
    });
  }, []);

  const handleSocialLink = useCallback(
    (type: "twitter" | "facebook" | "github" | "instagram") => {
      let url: string = "";

      switch (type) {
        case "twitter":
          url = ("https://twitter.com/" + user?.twitter) as string;
          break;
        case "facebook":
          url = ("https://facebook.com/" + user?.facebook) as string;
          break;
        case "github":
          url = ("https://github.com/" + user?.github) as string;
          break;
        case "instagram":
          url = ("https://instagram.com/" + user?.instagram) as string;
          break;
      }
      Linking.openURL(url);
    },
    []
  );

  return (
    <Block safe marginTop={sizes.md}>
      <Block
        scroll
        paddingHorizontal={sizes.s}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: sizes.padding }}
      >
        <Block flex={2}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            paddingBottom={sizes.l}
            radius={sizes.cardRadius}
            source={assets.background}
          >
            <Block row style={{ justifyContent: "space-between" }}>
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
                  {t("profile.title")}
                </Text>
              </Button>

              <Button
                row
                flex={0}
                justify="flex-end"
                onPress={() => navigation.navigate("EditUser")}
              >
                <Icon name={"user"} size={15} color={"white"} />
                <Text p white marginLeft={sizes.s}>
                  {t("profile.editUser")}
                </Text>
              </Button>
            </Block>
            <Block flex={0} align="center">
              <Image
                width={150}
                height={150}
                marginBottom={sizes.sm}
                radius={100}
                source={
                  user?.image
                    ? {
                        uri: user?.image,
                      }
                    : assets.anonymous
                }
              />
              <Text h5 center white>
                {user?.name}
              </Text>
              {user?.company && (
                <Text p center white>
                  {user?.company ? user?.company : "-"}
                </Text>
              )}
              <Text center white>
                {user?.title ? user?.title : "-"}
              </Text>
              <Block row marginVertical={sizes.m}>
                {user?.twitter && (
                  <Button
                    shadow={false}
                    radius={sizes.m}
                    marginHorizontal={sizes.s}
                    color="rgba(255,255,255,0.2)"
                    outlined={String(colors.white)}
                    onPress={() => handleSocialLink("twitter")}
                  >
                    <Ionicons
                      size={18}
                      name="logo-twitter"
                      color={colors.white}
                    />
                  </Button>
                )}
                {user?.facebook && (
                  <Button
                    shadow={false}
                    radius={sizes.m}
                    marginHorizontal={sizes.s}
                    color="rgba(255,255,255,0.2)"
                    outlined={String(colors.white)}
                    onPress={() => handleSocialLink("facebook")}
                  >
                    <Ionicons
                      size={18}
                      name="logo-facebook"
                      color={colors.white}
                    />
                  </Button>
                )}
                {user?.instagram && (
                  <Button
                    shadow={false}
                    radius={sizes.m}
                    marginHorizontal={sizes.s}
                    color="rgba(255,255,255,0.2)"
                    outlined={String(colors.white)}
                    onPress={() => handleSocialLink("instagram")}
                  >
                    <Ionicons
                      size={18}
                      name="logo-instagram"
                      color={colors.white}
                    />
                  </Button>
                )}
                {user?.github && (
                  <Button
                    shadow={false}
                    radius={sizes.m}
                    marginHorizontal={sizes.s}
                    color="rgba(255,255,255,0.2)"
                    outlined={String(colors.white)}
                    onPress={() => handleSocialLink("github")}
                  >
                    <Ionicons
                      size={18}
                      name="logo-github"
                      color={colors.white}
                    />
                  </Button>
                )}
              </Block>
            </Block>
          </Image>

          <Block
            flex={0}
            radius={sizes.sm}
            shadow={!isAndroid}
            marginTop={-sizes.l}
            marginHorizontal="8%"
            color="rgba(255,255,255,0.2)"
          >
            <Block
              row
              blur
              flex={0}
              intensity={100}
              radius={sizes.sm}
              overflow="hidden"
              tint={colors.blurTint}
              justify="space-evenly"
              paddingVertical={sizes.sm}
              renderToHardwareTextureAndroid
            >
              <Block align="center">
                <Text h5>{user?.repos ? user?.repos : "-"}</Text>
                <Text>{t("profile.repos")}</Text>
              </Block>

              <Block align="center">
                <Text h5>{user?.followers ? user?.followers : "-"}</Text>
                <Text>{t("profile.followers")}</Text>
              </Block>

              <Block align="center">
                <Text h5>{user?.following ? user?.following : "-"}</Text>
                <Text>{t("profile.following")}</Text>
              </Block>
            </Block>
          </Block>

          {user?.aboutMe && (
            <Block paddingHorizontal={sizes.sm}>
              <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
                {t("profile.aboutMe")}
              </Text>
              <Text p lineHeight={26}>
                {user?.aboutMe}
              </Text>
            </Block>
          )}
        </Block>
      </Block>
    </Block>
  );
};

export default Profile;
