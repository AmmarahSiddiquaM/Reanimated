import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {ITEM_SIZE} from '.';
import {spacing} from '../../../theme';

const DocItem = ({item, size, index, currentIndex, isGestureActive}) => {
  const viewStyles = useAnimatedStyle(() => {
    if (isGestureActive.value === 0) {
      return {
        width: withTiming(ITEM_SIZE),
        height: withTiming(ITEM_SIZE),
        transform: [{translateY: withTiming(0)}],
      };
    }
    const viewSize = interpolate(
      currentIndex.value - 0.5,
      [index - 2, index - 1, index, index + 1, index + 2],
      [
        0.8 * ITEM_SIZE,
        1.2 * ITEM_SIZE,
        1.8 * ITEM_SIZE,
        1.2 * ITEM_SIZE,
        0.8 * ITEM_SIZE,
      ],
      Extrapolate.CLAMP,
    );
    return {
      width: viewSize,
      height: viewSize,
      transform: [{translateY: (-viewSize / ITEM_SIZE) * 6}],
    };
  });

  return (
    <Animated.View style={[styles.dockItem(size), viewStyles]}>
      <FastImage source={item.image} style={styles.image} />
    </Animated.View>
  );
};

export default DocItem;

const styles = StyleSheet.create({
  dockItem: size => ({
    width: size,
    height: size,
    padding: spacing.xxs,
  }),
  image: {
    width: '100%',
    height: '100%',
  },
});
