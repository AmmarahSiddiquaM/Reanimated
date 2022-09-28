import React from 'react';
import {StyleSheet} from 'react-native';

import Home from './Home';
import BookShelf from './BookShelf';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {clamp, snapPoint} from '../../../utils/animation';
import {CONTAINER_WIDTH, SCREEN_OFFSET, SCREEN_WIDTH} from './constants';

const Container3d = () => {
  const translateX = useSharedValue(0);
  const contextX = useSharedValue(0);

  const progress = useDerivedValue(() => -translateX.value / SCREEN_WIDTH);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      contextX.value = translateX.value;
    })
    .onUpdate(({translationX}) => {
      translateX.value = clamp(translationX + contextX.value, -SCREEN_WIDTH, 0);
    })
    .onEnd(({velocityX}) => {
      translateX.value = withTiming(
        snapPoint(translateX.value, velocityX, [-SCREEN_WIDTH, 0]),
      );
    });

  const viewStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [0, SCREEN_OFFSET],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  const onPressNext = () => {
    translateX.value = withTiming(-SCREEN_WIDTH, {duration: 1000});
  };

  const onPressBack = () => {
    translateX.value = withTiming(0, {duration: 1000});
  };

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, viewStyles]}>
        <Home progress={progress} onPressNext={onPressNext} />
        <BookShelf progress={progress} onPressBack={onPressBack} />
      </Animated.View>
    </GestureDetector>
  );
};

export default Container3d;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#415e71',
    width: CONTAINER_WIDTH,
  },
});
