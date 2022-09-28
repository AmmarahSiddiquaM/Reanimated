import React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import Animated, {
  SensorType,
  useAnimatedGestureHandler,
  useAnimatedSensor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
// import {BlurView} from '@react-native-community/blur';

import {images} from '../../../assets/images';
import {PanGestureHandler} from 'react-native-gesture-handler';

const ThreeDEffect = () => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: ({translationX, translationY}, ctx) => {
      // ctx.x = translationX;
      ctx.y = y.value;
    },
    onActive: ({translationX, translationY}, ctx) => {
      // x.value = translationX + ctx.x;
      y.value = translationY + ctx.y;
    },
  });

  const viewStyles = useAnimatedStyle(() => {
    return {
      transform: [{rotateX: `${x.value}deg`}, {rotateY: `${y.value}deg`}],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={[styles.container, viewStyles]}>
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <View style={styles.border}>
              <Text style={styles.heading}>Ankush SS</Text>
              <Text>Day1</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ThreeDEffect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardWrapper: {
    position: 'absolute',
    backgroundColor: 'green',
    width: '50%',
    height: '50%',
    perspective: 400,
  },
  card: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
  },
});
