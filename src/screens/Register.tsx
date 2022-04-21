import React, { useCallback, useEffect, useState } from "react";
import { Linking, Platform } from "react-native";
import { useNavigation } from "@react-navigation/core";
import Storage from "@react-native-async-storage/async-storage";

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

import { useTheme, useTranslation } from "../hooks/";
import * as regex from "../constants/regex";
import { Block, Button, Input, Image, Text, Checkbox } from "../components/";
import { Locale } from "../constants/types";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { firebaseError } from "../constants";

const isAndroid = Platform.OS === "android";

interface IRegistration {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
}

interface IRegistrationValidation {
  name: boolean;
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
  agreed: boolean;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Register = () => {
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    registerForPushNotificationsAsync().then((token: string | undefined) =>
      setExpoPushToken(token as string)
    );
  }, [expoPushToken]);

  const { t, locale } = useTranslation();
  const navigation = useNavigation();
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    agreed: false,
  });
  const [registration, setRegistration] = useState<IRegistration>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const { assets, colors, gradients, sizes } = useTheme();

  const handleChange = useCallback(
    (value) => {
      setRegistration((state) => ({ ...state, ...value }));
    },
    [setRegistration]
  );

  const addUserInCollection = async (user: any) => {
    try {
      await setDoc(doc(firestore, "users", user.uid), user);
    } catch (error) {}
  };

  const getUser = async (userId: string) => {
    const docRef = doc(firestore, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      Storage.setItem('user', JSON.stringify(docSnap.data()));
    } 
  };

  const handleSignUp = useCallback(async () => {
    if (!Object.values(isValid).includes(false)) {
      await createUserWithEmailAndPassword(
        auth,
        registration.email,
        registration.password
      )
        .then(async (state) => {
          addUserInCollection({
            name: registration.name,
            uid: state.user.uid,
            email: registration.email,
            expoToken: expoPushToken,
          });
          getUser(state.user.uid);
        })
        .catch((error) => {
          if (error.code === firebaseError.emailAlreadyInUse) {
            alert(t("firebase.error.emailAlreadyInUse"));
          }
        });
    }
  }, [isValid, registration]);

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      name: regex.name.test(registration.name),
      email: regex.email.test(registration.email),
      password: regex.password.test(registration.password),
      confirmPassword:
        regex.password.test(registration.confirmPassword) &&
        registration.password === registration.confirmPassword,
      agreed: registration.agreed,
    }));
  }, [registration, setIsValid]);

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{ zIndex: 0 }}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            radius={sizes.cardRadius}
            source={assets.background}
            height={sizes.height * 0.3}
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
                {t("common.goBack")}
              </Text>
            </Button>
            <Text h4 center white marginBottom={sizes.md}>
              {t("register.title")}
            </Text>
          </Image>
        </Block>
        <Block
          keyboard
          behavior={!isAndroid ? "padding" : "height"}
          marginTop={-(sizes.height * 0.2 - sizes.l)}
        >
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%"
            shadow={!isAndroid}
          >
            <Block
              blur
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}
            >
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
                <Text center marginHorizontal={sizes.s}>
                  {t("register.subtitle")}
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
              <Block paddingHorizontal={sizes.sm}>
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t("common.name")}
                  placeholder={t("common.namePlaceholder")}
                  success={Boolean(registration.name && isValid.name)}
                  danger={Boolean(registration.name && !isValid.name)}
                  onChangeText={(value) => handleChange({ name: value })}
                />
                <Input
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t("common.email")}
                  keyboardType="email-address"
                  placeholder={t("common.emailPlaceholder")}
                  success={Boolean(registration.email && isValid.email)}
                  danger={Boolean(registration.email && !isValid.email)}
                  onChangeText={(value) => handleChange({ email: value })}
                />
                <Input
                  password={true}
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t("common.password")}
                  placeholder={t("common.passwordPlaceholder")}
                  onChangeText={(value) => handleChange({ password: value })}
                  success={Boolean(registration.password && isValid.password)}
                  danger={Boolean(registration.password && !isValid.password)}
                />
                <Input
                  password={true}
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t("common.confirmPassword")}
                  placeholder={t("common.confirmPasswordPlaceholder")}
                  onChangeText={(value) =>
                    handleChange({ confirmPassword: value })
                  }
                  success={Boolean(
                    registration.confirmPassword && isValid.confirmPassword
                  )}
                  danger={Boolean(
                    registration.confirmPassword && !isValid.confirmPassword
                  )}
                />
              </Block>
              <Block row flex={0} align="center" paddingHorizontal={sizes.sm}>
                <Checkbox
                  marginRight={sizes.sm}
                  checked={registration?.agreed}
                  onPress={(value) => handleChange({ agreed: value })}
                />

                {locale === Locale.TR ? (
                  <Text paddingRight={sizes.s}>
                    <Text
                      semibold
                      onPress={() => {
                        Linking.openURL(
                          "https://github.com/AyberkCakar/react-native-expo-starter-kit"
                        );
                      }}
                    >
                      {t("common.terms")}
                    </Text>
                    {t("common.agree")}
                  </Text>
                ) : (
                  <Text paddingRight={sizes.s}>
                    {t("common.agree")}
                    <Text
                      semibold
                      onPress={() => {
                        Linking.openURL(
                          "https://github.com/AyberkCakar/react-native-expo-starter-kit"
                        );
                      }}
                    >
                      {t("common.terms")}
                    </Text>
                  </Text>
                )}
              </Block>
              <Button
                onPress={handleSignUp}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}
                disabled={Object.values(isValid).includes(false)}
              >
                <Text bold white transform="uppercase">
                  {t("common.signup")}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
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
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
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
};

export default Register;
