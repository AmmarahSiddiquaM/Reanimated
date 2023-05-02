import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {cards, CARD_HEIGHT, CARD_WIDTH} from '../constants';

const Card = ({item, index, progress}) => {
  const inputRange = [0, cards.length - 1];
  const outputRange = [-24, 24];

  const rotate = useDerivedValue(
    () => interpolate(index, inputRange, outputRange, Extrapolate.CLAMP),
    [progress],
  );

  const viewStyles = useAnimatedStyle(() => ({
    transform: [
      {translateY: CARD_HEIGHT / 2},
      {
        rotate: `${interpolate(
          progress.value,
          [0, 1],
          [0, rotate.value],
          Extrapolate.CLAMP,
        )}deg`,
      },
      {translateY: -CARD_HEIGHT / 2},
    ],
  }));
  return (
    <Animated.View style={[styles.container, viewStyles]}>
      <FastImage source={item.image} style={styles.image} />
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
