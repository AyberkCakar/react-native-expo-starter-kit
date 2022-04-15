import React, { useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";

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
  const { sizes } = useTheme();
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

const Cards = () => {
  const { assets, colors, gradients, sizes } = useTheme();
  const { t } = useTranslation();

  return (
    <Block marginTop={sizes.m} paddingHorizontal={sizes.padding}>
      <Title titleText={t("componentExamples.cards.cards")} />

      <Block>
        <Block card row>
          <Image
            resizeMode="contain"
            source={assets?.card1}
            style={styles.cardHeight}
          />
          <Block padding={sizes.s} justify="space-between">
            <Text p>Adventures - Multi day trips with meals and stays.</Text>
            <TouchableOpacity>
              <Block row align="center">
                <Text p semibold marginRight={sizes.s} color={colors.link}>
                  {t("componentExamples.cards.readArticle")}
                </Text>
                <Image source={assets.arrow} color={colors.link} />
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>

      <Block row marginTop={sizes.sm}>
        <Block card marginRight={sizes.sm}>
          <Image
            resizeMode="cover"
            source={assets?.card2}
            style={{ width: "100%" }}
          />
          <Block padding={sizes.s} justify="space-between">
            <Text p marginBottom={sizes.s}>
              New ways to meet your business goals.
            </Text>
            <TouchableOpacity>
              <Block row align="center">
                <Text p semibold marginRight={sizes.s} color={colors.link}>
                  {t("componentExamples.cards.readArticle")}
                </Text>
                <Image source={assets.arrow} color={colors.link} />
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>

        <Block card>
          <Image
            resizeMode="cover"
            source={assets?.card3}
            style={{ width: "100%" }}
          />
          <Block padding={sizes.s} justify="space-between">
            <Text p marginBottom={sizes.s}>
              The highest status people.
            </Text>
            <TouchableOpacity>
              <Block row align="center">
                <Text p semibold marginRight={sizes.s} color={colors.link}>
                  {t("componentExamples.cards.readArticle")}
                </Text>
                <Image source={assets.arrow} color={colors.link} />
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>

      <Block card marginTop={sizes.sm}>
        <Image
          resizeMode="cover"
          source={assets?.card4}
          style={{ width: "100%" }}
        />
        <Text
          h5
          bold
          transform="uppercase"
          gradient={gradients.primary}
          marginTop={sizes.sm}
        >
          Trending
        </Text>
        <Text
          p
          marginTop={sizes.s}
          marginLeft={sizes.xs}
          marginBottom={sizes.sm}
        >
          The most beautiful and complex UI Kits built by Creative Tim.
        </Text>
        <Block row marginLeft={sizes.xs} marginBottom={sizes.xs}>
          <Image
            source={assets.avatar1}
            style={{ width: sizes.xl, height: sizes.xl, borderRadius: sizes.s }}
          />
          <Block marginLeft={sizes.s}>
            <Text p semibold>
              Mathew Glock
            </Text>
            <Text p gray>
              Posted on 28 February
            </Text>
          </Block>
        </Block>
      </Block>

      <Block card padding={0} marginTop={sizes.sm}>
        <Image
          background
          resizeMode="cover"
          source={assets.card5}
          radius={sizes.cardRadius}
        >
          <Block color="rgba(0,0,0,0.3)" padding={sizes.padding}>
            <Text h4 white marginBottom={sizes.sm}>
              Flexible office space means growth.
            </Text>
            <Text p white>
              Rather than worrying about switching offices every couple years,
              you can instead stay in the same location.
            </Text>
            <Block row marginLeft={sizes.xs} marginTop={sizes.xxl}>
              <Image
                source={assets.avatar2}
                style={{
                  width: sizes.xl,
                  height: sizes.xl,
                  borderRadius: sizes.s,
                }}
              />
              <Block marginLeft={sizes.s}>
                <Text p white semibold>
                  Devin Coldewey
                </Text>
                <Text p white>
                  Marketing Manager
                </Text>
              </Block>
            </Block>
          </Block>
        </Image>
      </Block>
    </Block>
  );
};

const Carousel = () => {
  const { assets, sizes } = useTheme();
  const { t } = useTranslation();

  return (
    <Block marginTop={sizes.m} paddingHorizontal={sizes.padding}>
      <Title titleText={t("componentExamples.carousel.carousel")} />
      <Block marginBottom={sizes.xxl}>
        <Image
          resizeMode="cover"
          source={assets.carousel1}
          style={styles.carouselWitdh}
        />
        <Text color={"#363636"} p secondary marginTop={sizes.sm}>
          Private Room • 1 Guests • 1 Sofa
        </Text>
        <Text h4 marginVertical={sizes.s}>
          Single room in center
        </Text>
        <Text p lineHeight={26}>
          As Uber works through a huge amount of internal management turmoil,
          the company is also consolidating.
        </Text>
      </Block>
    </Block>
  );
};

const Gallery = () => {
  const { assets, sizes } = useTheme();
  const { t } = useTranslation();

  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;

  return (
    <Block marginTop={sizes.m} paddingHorizontal={sizes.padding}>
      <Title titleText={t("componentExamples.album.album")} />
      <Block>
        <Block row align="center" justify="space-between">
          <Text h5 semibold>
            {t("componentExamples.album.album")}
          </Text>
          <Button>
            <Text p primary semibold>
              {t("componentExamples.album.viewAll")}
            </Text>
          </Button>
        </Block>
        <Block row justify="space-between" wrap="wrap">
          <Image
            resizeMode="cover"
            source={assets?.photo1}
            marginBottom={IMAGE_MARGIN}
            style={{
              height: IMAGE_SIZE,
              width: IMAGE_SIZE,
            }}
          />
          <Image
            resizeMode="cover"
            source={assets?.photo2}
            marginBottom={IMAGE_MARGIN}
            style={{
              height: IMAGE_SIZE,
              width: IMAGE_SIZE,
            }}
          />
          <Image
            resizeMode="cover"
            source={assets?.photo3}
            marginBottom={IMAGE_MARGIN}
            style={{
              height: IMAGE_SIZE,
              width: IMAGE_SIZE,
            }}
          />
          <Image
            resizeMode="cover"
            source={assets?.photo4}
            marginBottom={IMAGE_MARGIN}
            style={{
              height: IMAGE_SIZE,
              width: IMAGE_SIZE,
            }}
          />
          <Image
            resizeMode="cover"
            source={assets?.photo5}
            marginBottom={IMAGE_MARGIN}
            style={{
              height: IMAGE_SIZE,
              width: IMAGE_SIZE,
            }}
          />
          <Image
            resizeMode="cover"
            source={assets?.photo6}
            marginBottom={IMAGE_MARGIN}
            style={{
              height: IMAGE_SIZE,
              width: IMAGE_SIZE,
            }}
          />
        </Block>
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
          <Cards />
          <Carousel />
          <Gallery />
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
  cardHeight: {
    height: 114,
  },
  carouselWitdh: {
    width: "100%",
  },
});
