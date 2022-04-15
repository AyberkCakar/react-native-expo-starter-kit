import React, { useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/core";
import { useHeaderHeight } from "@react-navigation/stack";

import { useTheme, useTranslation } from "../hooks/";
import { Block, Button, Image, Modal, Text, Title } from "../components/";

const Buttons = () => {
  const [showModal, setModal] = useState(false);
  const [quantity, setQuantity] = useState("01");
  const { assets, colors, gradients, sizes } = useTheme();
  const { t } = useTranslation();

  return (
    <Block paddingHorizontal={sizes.padding}>
      <Title titleText={t("componentExamples.buttons.buttons")} />

      <Block>
        <Button flex={1} gradient={gradients.primary} marginBottom={sizes.base}>
          <Text white bold transform="uppercase">
            {t("componentExamples.buttons.primary")}
          </Text>
        </Button>
        <Button
          flex={1}
          gradient={gradients.secondary}
          marginBottom={sizes.base}
        >
          <Text white bold transform="uppercase">
            {t("componentExamples.buttons.secondary")}
          </Text>
        </Button>
        <Button flex={1} gradient={gradients.info} marginBottom={sizes.base}>
          <Text white bold transform="uppercase">
            {t("componentExamples.buttons.info")}
          </Text>
        </Button>
        <Button flex={1} gradient={gradients.success} marginBottom={sizes.base}>
          <Text white bold transform="uppercase">
            {t("componentExamples.buttons.success")}
          </Text>
        </Button>
        <Button flex={1} gradient={gradients.warning} marginBottom={sizes.base}>
          <Text white bold transform="uppercase">
            {t("componentExamples.buttons.warning")}
          </Text>
        </Button>
        <Button flex={1} gradient={gradients.danger} marginBottom={sizes.base}>
          <Text white bold transform="uppercase">
            {t("componentExamples.buttons.danger")}
          </Text>
        </Button>
        <Button flex={1} gradient={gradients.dark} marginBottom={sizes.base}>
          <Text white bold transform="uppercase">
            {t("componentExamples.buttons.dark")}
          </Text>
        </Button>
        <Block row justify="space-between" marginBottom={sizes.base}>
          <Button
            flex={1}
            row
            gradient={gradients.dark}
            onPress={() => setModal(true)}
          >
            <Block
              row
              align="center"
              justify="space-between"
              paddingHorizontal={sizes.sm}
            >
              <Text white bold transform="uppercase" marginRight={sizes.sm}>
                {quantity}
              </Text>
              <Image
                source={assets.arrow}
                color={colors.white}
                transform={[{ rotate: "90deg" }]}
              />
            </Block>
          </Button>
          <Button flex={5} gradient={gradients.dark} marginHorizontal={sizes.s}>
            <Text white bold transform="uppercase" marginHorizontal={sizes.s}>
              {t("componentExamples.buttons.delete")}
            </Text>
          </Button>
        </Block>
      </Block>
      <Modal visible={showModal} onRequestClose={() => setModal(false)}>
        <FlatList
          keyExtractor={(index) => `${index}`}
          style={styles.modal}
          data={[
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
            "13",
            "14",
          ]}
          renderItem={({ item }) => (
            <Button
              marginBottom={sizes.sm}
              onPress={() => {
                setQuantity(item);
                setModal(false);
              }}
            >
              <Text p white semibold transform="uppercase">
                {item}
              </Text>
            </Button>
          )}
        />
      </Modal>
    </Block>
  );
};

const Typography = () => {
  const { sizes } = useTheme();
  const { t } = useTranslation();

  return (
    <Block marginTop={sizes.m} paddingHorizontal={sizes.padding}>
      <Title titleText={t("componentExamples.typography.typography")} />

      <Block>
        <Text h1>{t("componentExamples.typography.heading1")}</Text>
        <Text h2>{t("componentExamples.typography.heading2")}</Text>
        <Text h3>{t("componentExamples.typography.heading3")}</Text>
        <Text h4>{t("componentExamples.typography.heading4")}</Text>
        <Text h5>{t("componentExamples.typography.heading5")}</Text>
        <Text p>{t("componentExamples.typography.paragraph")}</Text>
        <Text marginBottom={sizes.xs}>
          {t("componentExamples.typography.text")}
        </Text>
      </Block>
    </Block>
  );
};

const ComponentExamples = () => {
  const { assets, sizes } = useTheme();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Image
          radius={0}
          resizeMode="cover"
          width={sizes.width}
          height={headerHeight}
          source={assets.header}
        />
      ),
    });
  }, [assets.header, navigation, sizes.width, headerHeight]);

  return (
    <Block safe>
      <Block
        scroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: sizes.padding }}
      >
        <Block>
          <Buttons />
          <Typography />
        </Block>
      </Block>
    </Block>
  );
};

export default ComponentExamples;

const styles = StyleSheet.create({
  modal: {
    maxHeight: 250,
    height: 250,
  },
});
