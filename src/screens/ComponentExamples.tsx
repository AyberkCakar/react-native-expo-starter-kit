import React, {useLayoutEffect} from 'react';

import {useNavigation} from '@react-navigation/core';
import {useHeaderHeight} from '@react-navigation/stack';

import {useTheme} from '../hooks/';
import {Block, Image} from '../components/';


const ComponentExamples = () => {
    const {assets, sizes} = useTheme();
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
          contentContainerStyle={{paddingVertical: sizes.padding}}>
          <Block>
          </Block>
        </Block>
      </Block>
    );
  };
  
  export default ComponentExamples;
  