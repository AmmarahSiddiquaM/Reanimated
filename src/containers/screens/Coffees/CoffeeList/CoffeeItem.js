import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {COFFEE_IMAGE__SIZE} from '../constants';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const CoffeeItem = ({item, index, activeIndex}) => {
  const inputRange = [index - 1, index, index + 1];
  const scaleOutputRange = [0.5, 1, 0.5];

  const viewStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(activeIndex.value, inputRange, scaleOutputRange),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.container, viewStyles]}>
      <FastImage source={item.image} style={styles.image} />
    </Animated.View>
  );
};

export default CoffeeItem;

const styles = StyleSheet.create({
  image: {
    width: COFFEE_IMAGE__SIZE,
    height: COFFEE_IMAGE__SIZE,
  },
});
