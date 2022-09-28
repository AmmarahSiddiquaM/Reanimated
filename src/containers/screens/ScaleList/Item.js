import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Text from '../../../components/atoms/text';
import {dimensions} from '../../../theme/sizes';
import {spacing} from '../../../theme/spacing';
import {randomInteger} from '../../../utils/number';

export const Item = ({item, index, measurements, scrollY}) => {
  const height = randomInteger(50, 200);

  const viewStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [
            measurements.y.value,
            measurements.y.value + measurements.height.value + spacing.s,
          ],
          [0, (measurements.height.value + spacing.s) / 2],
          Extrapolate.CLAMP,
        ),
      },
      {
        scale: interpolate(
          scrollY.value,
          [
            measurements.y.value,
            measurements.y.value + measurements.height.value + spacing.s,
          ],
          [1, 0],
          Extrapolate.CLAMP,
        ),
      },
      {
        translateY: interpolate(
          scrollY.value,
          [
            measurements.y.value,
            measurements.y.value + measurements.height.value + spacing.s,
          ],
          [0, -((measurements.height.value + spacing.s) / 2)],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.item(item, height), viewStyles]}>
      <Text color="white" weight="semibold" style={styles.text}>
        rgb({item})
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  item: (color, height) => ({
    borderRadius: 10,
    width: dimensions.screenWidth - 2 * spacing.s,
    height,
    marginBottom: spacing.s,
    backgroundColor: `rgb(${color})`,
    alignSelf: 'center',
  }),
  text: {
    position: 'absolute',
    bottom: spacing.s,
    right: spacing.s,
  },
});
