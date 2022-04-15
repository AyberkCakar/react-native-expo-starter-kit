import React from "react";

import { useTheme } from "../hooks";
import { Block, Text } from "../components";

const Title = ({ titleText }) => {
  const { gradients, sizes } = useTheme();

  return (
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
      <Text h5 center marginHorizontal={sizes.s}>
        {titleText}
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
  );
};

export default Title;
