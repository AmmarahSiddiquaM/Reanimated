import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {dimensions} from '../../../theme';

export const COLOR_WIDTH = dimensions.screenWidth / 3;

const RADIUS = 45;

const Color = ({color, index, translateX, onPress}) => {
  const viewStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          translateX.value,
          [
            (index + 1) * -COLOR_WIDTH,
            index * -COLOR_WIDTH,
            (index - 1) * -COLOR_WIDTH,
          ],
          [100, 0, -100],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={[styles.container, viewStyle]}>
        <LinearGradient
          colors={[color.start, color.end]}
          style={styles.gradient}
        />
      </Animated.View>
    </Pressable>
  );
};

export default Color;

const styles = StyleSheet.create({
  container: {
    width: COLOR_WIDTH,
    alignItems: 'center',
  },
  gradient: {
    width: 2 * RADIUS,
    height: 2 * RADIUS,
    borderRadius: RADIUS,
    borderWidth: 6,
    borderColor: 'white',
  },
});
