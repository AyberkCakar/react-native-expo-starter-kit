import React from "react";

import { useTheme, useTranslation } from "../hooks/";
import { Block, Input } from "../components/";

const Home = () => {
  const { t } = useTranslation();
  const { colors, sizes } = useTheme();

  return (
    <Block>
      <Block color={colors.card} flex={0} padding={sizes.padding}>
        <Input search placeholder={t("common.search")} />
      </Block>
      <Block
        scroll
        paddingHorizontal={sizes.padding}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: sizes.l }}
      ></Block>
    </Block>
  );
};

export default Home;
