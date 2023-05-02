import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {spacing} from '../../../../theme';
import {COFFEE_NAME_HEIGHT} from '../constants';
import CoffeeNameItem from './CoffeeNameItem';

const CoffeeNamesList = ({data, activeIndex}) => {
  const viewStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          activeIndex.value,
          [0, 1],
          [0, -COFFEE_NAME_HEIGHT],
        ),
      },
    ],
  }));

  return (
    <View style={styles.wrapper}>
      <Animated.View style={viewStyles}>
        {data.map(item => (
          <CoffeeNameItem item={item} />
        ))}
      </Animated.View>
    </View>
  );
};

export default CoffeeNamesList;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: spacing.xxxl,
    left: spacing.xl,
    height: COFFEE_NAME_HEIGHT,
    // backgroundColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
  },
});
