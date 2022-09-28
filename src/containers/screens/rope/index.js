import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {dimensions} from '../../../theme';

const LINE_WIDTH = 300;
const LINE_HEIGHT = 4;

const DOT_SIZE = 40;

const X_ORIGIN = (dimensions.screenWidth - LINE_WIDTH) / 2;
const Y_ORIGIN = (dimensions.screenHeight - LINE_HEIGHT) / 2;

function atan2Normalized(y, x) {
  'worklet';
  var result = Math.atan2(y, x);
  return result;
}

const Rope = () => {
  const moveX = useSharedValue(LINE_WIDTH);
  const moveY = useSharedValue(Y_ORIGIN);

  const contextX = useSharedValue(0);
  const contextY = useSharedValue(0);

  const rotate = useDerivedValue(() => {
    const rad = atan2Normalized(moveY.value - Y_ORIGIN, moveX.value - X_ORIGIN);
    const rot = rad * (180 / Math.PI);
    return rot;
  });

  const gesture = Gesture.Pan()
    .onBegin(() => {
      contextX.value = moveX.value;
      contextY.value = moveY.value;
    })
    .onUpdate(({translationX, translationY}) => {
      moveX.value = translationX + contextX.value;
      moveY.value = translationY + contextY.value;
    });

  const viewStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: -1 * (LINE_WIDTH / 2),
      },
      {
        rotate: `${rotate.value}deg`,
      },
      {
        translateX: LINE_WIDTH / 2,
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.line, viewStyles]}>
        <GestureDetector gesture={gesture}>
          <View style={styles.dot} />
        </GestureDetector>
      </Animated.View>
      {/* <View style={styles.dot} /> */}
    </View>
  );
};

export default Rope;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  line: {
    width: LINE_WIDTH,
    height: LINE_HEIGHT,
    backgroundColor: 'green',
  },
  dot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    backgroundColor: 'red',
    right: 0,
    top: -DOT_SIZE / 2 + LINE_HEIGHT / 2,
  },
});
