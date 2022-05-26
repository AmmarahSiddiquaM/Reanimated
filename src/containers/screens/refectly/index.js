import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Color, {COLOR_WIDTH} from './Color';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {dimensions} from '../../../theme';
import {snapPoint} from '../../../utils/animation';

const colors = [
  {
    id: 0,
    start: '#00E0D3',
    end: '#00B4D4',
  },
  {
    id: 1,
    start: '#00B4D4',
    end: '#409CAE',
  },
  {
    id: 2,
    start: '#66D8A4',
    end: '#409CAE',
  },
  {
    id: 3,
    start: '#FC727B',
    end: '#F468A0',
  },
  {
    id: 4,
    start: '#8289EA',
    end: '#7A6FC1',
  },
  {
    id: 5,
    start: '#FEC7A3',
    end: '#FD9F9C',
  },
];

const snapPoints = colors.map((_, index) => -index * COLOR_WIDTH);

const Reflectly = () => {
  const translateX = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
    },
    onActive: ({translationX}, ctx) => {
      translateX.value = translationX + ctx.x;
    },
    onEnd: ({velocityX}) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      translateX.value = withSpring(dest);
    },
  });

  const viewStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const onPressColor = index => () => {
    translateX.value = withSpring(-index * COLOR_WIDTH);
  };

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[styles.container, viewStyle]}>
        <View style={styles.placeholder} />
        {colors.map((color, index) => (
          <Color
            color={color}
            key={index}
            index={index}
            translateX={translateX}
            onPress={onPressColor(index)}
          />
        ))}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Reflectly;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  placeholder: {
    width: COLOR_WIDTH,
  },
});
