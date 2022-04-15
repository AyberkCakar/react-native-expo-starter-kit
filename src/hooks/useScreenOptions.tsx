import React from "react";
import {
  StackHeaderTitleProps,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/core";
import { DrawerActions } from "@react-navigation/native";
import { StackHeaderOptions } from "@react-navigation/stack/lib/typescript/src/types";

import { useTranslation } from "./useTranslation";

import Image from "../components/Image";
import Text from "../components/Text";
import useTheme from "../hooks/useTheme";
import Button from "../components/Button";
import Block from "../components/Block";

export default () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { icons, colors, sizes } = useTheme();

  const menu = {
    headerStyle: { elevation: 0 },
    headerTitleAlign: "left",
    headerTitleContainerStyle: { marginLeft: -sizes.sm },
    headerLeftContainerStyle: { paddingLeft: sizes.s },
    headerRightContainerStyle: { paddingRight: sizes.s },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: ({ children }: StackHeaderTitleProps) => (
      <Text p>{children}</Text>
    ),
    headerLeft: () => (
      <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Image source={icons.menu} radius={0} color={colors.icon} />
      </Button>
    ),
    headerRight: () => (
      <Block row flex={0} align="center" marginRight={sizes.padding}></Block>
    ),
  } as StackHeaderOptions;

  const options = {
    stack: menu,
    componentExamples: {
      ...menu,
      headerTitle: () => (
        <Text p white>
          {t("navigation.componentExamples")}
        </Text>
      ),
      headerRight: () => null,
      headerLeft: () => (
        <Button
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Image source={icons.menu} radius={0} color={colors.white} />
        </Button>
      ),
    },
    back: {
      ...menu,
      headerRight: () => null,
      headerLeft: () => (
        <Button onPress={() => navigation.goBack()}>
          <Image
            radius={0}
            width={10}
            height={18}
            color={colors.icon}
            source={icons.arrow}
            transform={[{ rotate: "180deg" }]}
          />
        </Button>
      ),
    },
  };

  return options;
};
