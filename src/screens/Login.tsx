import React, { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { StackActions } from "@react-navigation/native";
import Storage from "@react-native-async-storage/async-storage";

import { useTheme, useTranslation } from "../hooks";
import * as regex from "../constants/regex";
import { Block, Button, Input, Image, Text } from "../components";

import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../firebase";
import { firebaseError } from "../constants";

const isAndroid = Platform.OS === "android";

interface ILogin {
  email: string;
  password: string;
}
interface ILoginValidation {
  email: boolean;
  password: boolean;
}

const Login = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [isValid, setIsValid] = useState<ILoginValidation>({
    email: false,
    password: false,
  });
  const [login, setLogin] = useState<ILogin>({
    email: "",
    password: "",
  });
  const { assets, colors, gradients, sizes } = useTheme();

  const handleChange = useCallback(
    (value) => {
      setLogin((state) => ({ ...state, ...value }));
    },
    [setLogin]
  );

  const getUser = async (userId: string) => {
    const docRef = doc(firestore, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      Storage.setItem('user', JSON.stringify(docSnap.data()));
    } 
  };

  const handleLogin = useCallback(async () => {
    if (!Object.values(isValid).includes(false)) {
      await signInWithEmailAndPassword(auth, login.email, login.password)
        .then(async (state) => {
          getUser(state.user.uid);
          await navigation.dispatch(await StackActions.replace("Menu"));
        })
        .catch((error) => {
          if (error.code === firebaseError.userNotFound) {
            alert(t("firebase.error.userNotFound"));
          } else if (error.code === firebaseError.wrongPassword) {
            alert(t("firebase.error.wrongPassword"));
          }
        });
    }
  }, [isValid, login]);

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      email: regex.email.test(login.email),
      password: regex.password.test(login.password),
    }));
  }, [login, setIsValid]);

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
            <Text h4 center white marginTop={sizes.xl} marginBottom={sizes.md}>
              {t("login.title")}
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
              <Text p semibold center>
                {t("login.subtitle")}
              </Text>
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
                  label={t("common.email")}
                  keyboardType="email-address"
                  placeholder={t("common.emailPlaceholder")}
                  success={Boolean(login.email && isValid.email)}
                  danger={Boolean(login.email && !isValid.email)}
                  onChangeText={(value) => handleChange({ email: value })}
                />
                <Input
                  password={true}
                  autoCapitalize="none"
                  marginBottom={sizes.m}
                  label={t("common.password")}
                  placeholder={t("common.passwordPlaceholder")}
                  onChangeText={(value) => handleChange({ password: value })}
                  success={Boolean(login.password && isValid.password)}
                  danger={Boolean(login.password && !isValid.password)}
                />
              </Block>
              <Button
                onPress={handleLogin}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}
                disabled={Object.values(isValid).includes(false)}
              >
                <Text bold white transform="uppercase">
                  {t("login.button")}
                </Text>
              </Button>
              <Button
                primary
                outlined
                shadow={!isAndroid}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text bold primary transform="uppercase">
                  {t("common.signup")}
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Login;
