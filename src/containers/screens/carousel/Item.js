import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import Svg, {Path} from 'react-native-svg';
import {Text} from '../../../components/atoms';

import {ITEM_HEIGHT, ITEM_SPACING, ITEM_WIDTH} from './constants';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedText = Animated.createAnimatedComponent(Text);

const Item = ({item, progress}) => {
  const leftQ = useDerivedValue(() =>
    interpolate(
      progress.value,
      [-1, 0, 1],
      [2 * ITEM_WIDTH, 1.5 * ITEM_WIDTH, ITEM_WIDTH],
      Extrapolate.CLAMP,
    ),
  );

  const rightQ = useDerivedValue(() =>
    interpolate(
      progress.value,
      [-1, 0, 1],
      [ITEM_WIDTH, ITEM_WIDTH / 2, 0],
      Extrapolate.CLAMP,
    ),
  );

  const animatedProps = useAnimatedProps(() => {
    const path = `M ${ITEM_WIDTH / 2},0 
    H ${1.5 * ITEM_WIDTH} 
    Q ${leftQ.value},${ITEM_HEIGHT / 2} 
    ${1.5 * ITEM_WIDTH},${ITEM_HEIGHT} 
    H ${ITEM_WIDTH / 2} 
    Q ${rightQ.value},${ITEM_HEIGHT / 2} 
    ${ITEM_WIDTH / 2},0`;
    return {
      d: path,
    };
  });

  const textStyles = useAnimatedStyle(() => ({
    transform: [
      {
        perspective: 50,
      },
      {
        translateX: interpolate(
          progress.value,
          [-1, 1],
          [50, -50],
          Extrapolate.CLAMP,
        ),
      },
      {
        rotateY: `${interpolate(
          progress.value,
          [-1, 1],
          [-10, 10],
          Extrapolate.CLAMP,
        )}deg`,
      },
    ],
  }));

  return (
    <Animated.View style={[styles.container]}>
      <AnimatedText size={100} color="white" style={[styles.text, textStyles]}>
        {item.id}
      </AnimatedText>
      <Svg
        height={ITEM_HEIGHT}
        width={2 * ITEM_WIDTH}
        viewBox={`0 0 ${2 * ITEM_WIDTH} ${ITEM_HEIGHT}`}>
        <AnimatedPath animatedProps={animatedProps} fill={item.color} />
      </Svg>
    </Animated.View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginHorizontal: ITEM_SPACING,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    zIndex: 999,
    position: 'absolute',
  },
});
