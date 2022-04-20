import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useAuthentication } from "../hooks/useAuthentication";
import Icon from "@expo/vector-icons/FontAwesome5";

import {
  useIsDrawerOpen,
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
} from "@react-navigation/drawer";

import Screens from "./Screens";
import { StackActions } from "@react-navigation/native";

import { Block, Text, Switch, Button, Image } from "../components";
import { ILocale } from "../constants/types/index";
import { useData, useTheme, useTranslation } from "../hooks";
import DropDownPicker from "react-native-dropdown-picker";

const Drawer = createDrawerNavigator();

const ScreensStack = () => {
  const { colors } = useTheme();
  const isDrawerOpen = useIsDrawerOpen();
  const animation = useRef(new Animated.Value(0)).current;

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.88],
  });

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {
    borderRadius: borderRadius,
    transform: [{ scale: scale }],
  };

  useEffect(() => {
    Animated.timing(animation, {
      duration: 200,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0,
    }).start();
  }, [isDrawerOpen, animation]);

  return (
    <Animated.View
      style={StyleSheet.flatten([
        animatedStyle,
        {
          flex: 1,
          overflow: "hidden",
          borderColor: colors.card,
          borderWidth: isDrawerOpen ? 1 : 0,
        },
      ])}
    >
      <Screens />
    </Animated.View>
  );
};

const DrawerContent = (
  props: DrawerContentComponentProps<DrawerContentOptions>
) => {
  const { navigation } = props;
  const { t, locale, setLocale } = useTranslation();
  const { isDark, handleIsDark } = useData();
  const [active, setActive] = useState("Home");
  const { assets, colors, gradients, sizes, icons } = useTheme();
  const labelColor = colors.text;

  // language dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(locale);
  const [items, setItems] = useState([] as Array<ILocale>);

  useEffect(() => {
    setItems([
      {
        label: t("language.tr"),
        value: "tr",
        icon: () => <Image width={20} height={20} source={assets.tr} />,
      },
      {
        label: t("language.en"),
        value: "en",
        icon: () => <Image width={20} height={20} source={assets.en} />,
      },
    ]);
  }, [locale]);

  const handleNavigation = useCallback(
    (to) => {
      setActive(to);
      navigation.navigate(to);
    },
    [navigation, setActive]
  );

  async function handleSignOut() {
    await signOut(auth);
    await navigation.dispatch(await StackActions.replace("Auth"));
  }

  const screens = [
    { name: t("screens.home"), to: "Home", icon: assets.home },
    {
      name: t("screens.notification"),
      to: "Notification",
      icon: assets.notification,
    },
    {
      name: t("screens.componentExamples"),
      to: "ComponentExamples",
      icon: assets.components,
    },
    { name: t("screens.map"), to: "Map", icon: 'map', iconComponent: true }
  ];
  useAuthentication();

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled
      removeClippedSubviews
      renderToHardwareTextureAndroid
      contentContainerStyle={{ paddingBottom: sizes.padding }}
    >
      <Block paddingHorizontal={sizes.padding}>
        <Block flex={0} row align="center" marginBottom={sizes.l}>
          <Image
            radius={0}
            width={35}
            height={35}
            color={colors.text}
            source={assets.logo}
            marginRight={sizes.sm}
          />
          <Block>
            <Text size={12} semibold>
              {t("app.name")}
            </Text>
            <Text size={12} semibold>
              {t("app.native")}
            </Text>
          </Block>
        </Block>

        {screens?.map((screen, index) => {
          const isActive = active === screen.to;
          return (
            <Button
              row
              justify="flex-start"
              marginBottom={sizes.s}
              key={`menu-screen-${screen.name}-${index}`}
              onPress={() => handleNavigation(screen.to)}
            >
              <Block
                flex={0}
                radius={6}
                align="center"
                justify="center"
                width={sizes.md}
                height={sizes.md}
                marginRight={sizes.s}
                gradient={gradients[isActive ? "primary" : "white"]}
              >
                {screen.iconComponent ? (
                  <Icon
                    name={screen.icon}
                    size={15}
                    color={colors[isActive ? "white" : "black"]}
                  />
                ) : (
                  <Image
                    radius={0}
                    width={14}
                    height={14}
                    source={screen.icon}
                    color={colors[isActive ? "white" : "black"]}
                  />
                )}
              </Block>
              <Text p semibold={isActive} color={labelColor}>
                {screen.name}
              </Text>
            </Button>
          );
        })}

        <Button
          row
          justify="flex-start"
          marginBottom={sizes.s}
          onPress={() => handleSignOut()}
        >
          <Block
            flex={0}
            radius={6}
            align="center"
            justify="center"
            width={sizes.md}
            height={sizes.md}
            marginRight={sizes.s}
            gradient={gradients["white"]}
          >
            <Image
              radius={0}
              width={14}
              height={14}
              source={icons.close}
              color={colors["black"]}
            />
          </Block>
          <Text p color={labelColor}>
            {t("common.signOut")}
          </Text>
        </Button>

        <Block
          flex={0}
          height={1}
          marginRight={sizes.md}
          marginVertical={sizes.sm}
          gradient={gradients.menu}
        />

        <Text semibold transform="uppercase" opacity={0.5}>
          {t("menu.settings")}
        </Text>

        <Block row justify="space-between" marginTop={sizes.sm}>
          <Text color={labelColor}>{t("darkMode")}</Text>
          <Switch
            checked={isDark}
            onPress={(checked) => {
              handleIsDark(checked);
            }}
          />
        </Block>

        <Block row marginTop={sizes.sm} style={styles.dropDownPickerBlock}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onSelectItem={(item) => {
              setLocale(item.value);
            }}
            theme={isDark ? "DARK" : "LIGHT"}
            listMode="SCROLLVIEW"
          />
        </Block>
      </Block>
    </DrawerContentScrollView>
  );
};

export default function Menu() {
  const { gradients } = useTheme();

  return (
    <Block gradient={gradients.light}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        sceneContainerStyle={{ backgroundColor: "transparent" }}
        drawerContent={(props) => <DrawerContent {...props} />}
        drawerStyle={{
          flex: 1,
          width: "60%",
          borderRightWidth: 0,
          backgroundColor: "transparent",
        }}
      >
        <Drawer.Screen name="Screens" component={ScreensStack} />
      </Drawer.Navigator>
    </Block>
  );
}

const styles = StyleSheet.create({
  dropDownPickerBlock: {
    minHeight: 130,
  },
});
