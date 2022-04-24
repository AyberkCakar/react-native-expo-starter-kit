import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/core";

import { useTheme, useTranslation } from "../hooks";
import { Block, Button, Image, Text, Title } from "../components";

const UserCard = () => {
  const { assets, colors, gradients, sizes } = useTheme();
  const { t } = useTranslation();
  const user = {
    name: "Ayberk Çakar",
    company: "Supply Chain Wizard",
    title: "Full Stack Developer",
  };

  return (
    <Block marginTop={sizes.s} paddingHorizontal={15}>
      <Block>
        <Block card row>
          <Image
            width={100}
            height={100}
            source={assets?.card1}
            style={styles.cardHeight}
            radius={100}
          />
          <Block padding={sizes.s} justify="space-between">
            <Text h5 white numberOfLines={1}>
              {user?.name}
            </Text>
            {user?.company && (
              <Text p white numberOfLines={1}>
                {user?.company ? user?.company : "-"}
              </Text>
            )}
            <Text white numberOfLines={1}>
              {user?.title}
            </Text>
          </Block>
          <Button row justify="center" marginBottom={sizes.s}>
            <Image
              width={20}
              height={40}
              source={assets.arrow}
              color={colors.primary}
            />
          </Button>
        </Block>
      </Block>
    </Block>
  );
};

const Users = () => {
  const { assets, sizes } = useTheme();
  const navigation = useNavigation();

  return (
    <Block safe>
      <Block
        scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: sizes.padding }}
      >
        <Block>
          <UserCard />
          <UserCard />
          <UserCard />
          <UserCard />
        </Block>
      </Block>
    </Block>
  );
};

export default Users;

const styles = StyleSheet.create({
  modal: {
    maxHeight: 250,
    height: 250,
  },
  cardHeight: {
    height: 114,
  },
  cardWidth100: {
    width: "100%",
  },
  carouselWitdh: {
    width: "100%",
  },
});
