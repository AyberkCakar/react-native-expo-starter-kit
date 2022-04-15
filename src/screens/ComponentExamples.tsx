import React, { useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/core";
import { useHeaderHeight } from "@react-navigation/stack";

import { useTheme, useTranslation } from "../hooks/";
import {
  Block,
  Button,
  Image,
  Modal,
  Text,
  Title,
  Input,
  Switch,
} from "../components/";

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

const Inputs = () => {
  const { sizes } = useTheme();
  const [switchExample, setSwitchExample] = useState(true);
  const { t } = useTranslation();

  return (
    <Block
      marginTop={sizes.m}
      paddingTop={sizes.m}
      paddingHorizontal={sizes.padding}
    >
      <Title titleText={t("componentExamples.inputs.inputs")} />
      <Block>
        <Input
          search
          label={t("componentExamples.inputs.search")}
          marginBottom={sizes.sm}
          placeholder={t("componentExamples.inputs.searchWithLabel")}
        />
        <Input
          placeholder={t("componentExamples.inputs.input")}
          marginBottom={sizes.sm}
        />
        <Input
          success
          placeholder={t("componentExamples.inputs.success")}
          marginBottom={sizes.sm}
        />
        <Input
          danger
          placeholder={t("componentExamples.inputs.error")}
          marginBottom={sizes.sm}
        />
        <Input
          disabled
          placeholder={t("componentExamples.inputs.disabled")}
          marginBottom={sizes.sm}
        />
      </Block>

      <Block
        row
        flex={0}
        align="center"
        justify="space-between"
        marginBottom={sizes.m}
      >
        <Text>
          {t("componentExamples.inputs.switchIs")}{" "}
          {switchExample
            ? t("componentExamples.inputs.on")
            : t("componentExamples.inputs.off")}
        </Text>
        <Switch
          checked={switchExample}
          onPress={(checked) => setSwitchExample(checked)}
        />
      </Block>
    </Block>
  );
};

const Social = () => {
    const {sizes} = useTheme();
    const { t } = useTranslation();

    return (
      <Block paddingVertical={sizes.m} paddingHorizontal={sizes.padding}>
        <Title titleText={t("componentExamples.social.social")} />
        <Block row justify="space-evenly">
          <Button social="github" />
          <Button social="instagram" />
          <Button social="facebook" />
          <Button social="twitter" />
          <Button social="dribbble" />
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
          <Inputs />
          <Social />
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
