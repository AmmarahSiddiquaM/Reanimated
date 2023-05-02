import React from 'react';
import {StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import Home from './Home';
import BookDescription from './BookDescription';

import {clamp, snapPoint} from '../../../utils/animation';
import {CONTAINER_WIDTH, SCREEN_WIDTH} from './constants';

const Books = () => {
  const translateX = useSharedValue(0);
  const contextX = useSharedValue(0);

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

  const onPressNext = () => {
    translateX.value = withTiming(-SCREEN_WIDTH, {duration: 1000});
  };

  const onPressBack = () => {
    translateX.value = withTiming(0, {duration: 1000});
  };

  const viewStyles = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, viewStyles]}>
        <Home translateX={translateX} onPressNext={onPressNext} />
        <BookDescription translateX={translateX} onPressBack={onPressBack} />
      </Animated.View>
    </GestureDetector>
  );
};

export default Books;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#415e71',
    width: CONTAINER_WIDTH,
  },
});
