import React, { useCallback } from "react";
import { Platform, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

import { Block, Button, Image, Text } from "../components/";
import { useTheme, useTranslation } from "../hooks/";

const isAndroid = Platform.OS === "android";

const Profile = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { assets, colors, sizes } = useTheme();

  const handleSocialLink = useCallback(
    (type: "twitter" | "facebook" | "github" | "instagram") => {
      let url: string = "";

      switch (type) {
        case "twitter":
          url = "http://twitter.com";
          break;
        case "facebook":
          url = "http://facebook.com";
          break;
        case "github":
          url = "http://github.com";
          break;
        case "instagram":
          url = "http://instagram.com";
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
        <Block flex={0}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            paddingBottom={sizes.l}
            radius={sizes.cardRadius}
            source={assets.background}
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
                {t("profile.title")}
              </Text>
            </Button>
            <Block flex={0} align="center">
              <Image
                width={150}
                height={150}
                marginBottom={sizes.sm}
                radius={100}
                source={{
                  uri: "https://instagram.fadb1-2.fna.fbcdn.net/v/t51.2885-19/275042291_439450227926760_4169598370527625396_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fadb1-2.fna.fbcdn.net&_nc_cat=100&_nc_ohc=g69_xZwHHt0AX-Rb2g0&tn=giVexEfV6Xxp1mEZ&edm=ABfd0MgBAAAA&ccb=7-4&oh=00_AT-BWwLaMREbnAhcTTBMwdnnkC2uBuYcaEX92XJFFoU4QA&oe=626865C3&_nc_sid=7bff83",
                }}
              />
              <Text h5 center white>
                {"Ayberk Çakar"}
              </Text>
              <Text p center white>
                {"Full Stack Developer"}
              </Text>
              <Block row marginVertical={sizes.m}>
                <Button
                  shadow={false}
                  radius={sizes.m}
                  marginHorizontal={sizes.sm}
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
                <Button
                  shadow={false}
                  radius={sizes.m}
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
                <Button
                  shadow={false}
                  radius={sizes.m}
                  marginHorizontal={sizes.sm}
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
                <Button
                  shadow={false}
                  radius={sizes.m}
                  color="rgba(255,255,255,0.2)"
                  outlined={String(colors.white)}
                  onPress={() => handleSocialLink("github")}
                >
                  <Ionicons size={18} name="logo-github" color={colors.white} />
                </Button>
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
                <Text h5>{1}</Text>
                <Text>{t("profile.posts")}</Text>
              </Block>
              <Block align="center">
                <Text h5>321</Text>
                <Text>{t("profile.followers")}</Text>
              </Block>
              <Block align="center">
                <Text h5>122</Text>
                <Text>{t("profile.following")}</Text>
              </Block>
            </Block>
          </Block>

          <Block paddingHorizontal={sizes.sm}>
            <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
              {t("profile.aboutMe")}
            </Text>
            <Text p lineHeight={26}>
              {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`}
            </Text>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Profile;
