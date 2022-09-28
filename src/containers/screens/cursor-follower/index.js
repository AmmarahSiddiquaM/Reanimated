import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '../../../assets/images';
import {Text} from '../../../components/atoms';

function atan2Normalized(y, x) {
  'worklet';
  var result = Math.atan2(y, x);
  if (result < 0) {
    result += 2 * Math.PI;
  }
  return result;
}

const CursorFollower = () => {
  const moveX = useSharedValue(0);
  const moveY = useSharedValue(200);

  const angle = useDerivedValue(() => {
    const rad = atan2Normalized(moveY.value, moveX.value);
    const rot = rad * (180 / Math.PI);
    return rot;
  }, [moveX, moveY]);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.x = moveX.value;
      ctx.y = moveY.value;
    },
    onActive: ({translationX, translationY}, ctx) => {
      moveX.value = translationX + ctx.x;
      moveY.value = translationY + ctx.y;
    },
  });

  const cursorStyles = useAnimatedStyle(() => ({
    transform: [{translateX: moveX.value}, {translateY: moveY.value}],
  }));

  const eye1Styles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          angle.value,
          [0, 90, 180, 225, 270, 360],
          [10, 0, -10, -14, -10, 10],
          Extrapolate.CLAMP,
        ),
      },
      {
        translateY: interpolate(
          angle.value,
          [0, 90, 180, 270, 360],
          [0, 0, 0, -50, 0],
          Extrapolate.CLAMP,
        ),
      },
      {scaleY: 2},
    ],
  }));

  const eye2Styles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          angle.value,
          [0, 90, 180, 225, 270, 360],
          [10, 0, -10, -14, -10, 10],
          Extrapolate.CLAMP,
        ),
      },
      {
        translateY: interpolate(
          angle.value,
          [0, 90, 180, 270, 360],
          [0, 0, 0, -50, 0],
          Extrapolate.CLAMP,
        ),
      },
      {scaleY: 2},
    ],
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text size="xl" color="black" weight="medium" style={styles.title}>
          Cursor Follower
        </Text>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.cursor, cursorStyles]} />
        </PanGestureHandler>
        <ImageBackground
          source={images.goofy}
          style={styles.image}
          resizeMode="contain">
          <Animated.View style={[styles.eye1, eye1Styles]}>
            <View style={styles.eyeball} />
          </Animated.View>
          <Animated.View style={[styles.eye2, eye2Styles]}>
            <View style={styles.eyeball} />
          </Animated.View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default CursorFollower;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    position: 'absolute',
    alignSelf: 'center',
    top: 130,
  },
  cursor: {
    width: 80,
    height: 80,
    backgroundColor: 'black',
    position: 'absolute',
    zIndex: 999,
    borderRadius: 40,
  },
  arrow: {
    width: 100,
    height: 2,
    backgroundColor: 'black',
  },
  image: {
    width: 400,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eye1: {
    width: 20,
    height: 20,
    borderRadius: 140 / 2,
    backgroundColor: 'black',
    zIndex: 999,
    position: 'absolute',
    top: 210,
    left: 170,
  },
  eye2: {
    width: 20,
    height: 20,
    borderRadius: 140 / 2,
    transform: [{scaleY: 2}],
    backgroundColor: 'black',
    zIndex: 999,
    position: 'absolute',
    top: 210,
    left: 200,
  },
  eyeball: {
    position: 'absolute',
    width: 6,
    height: 4,
    left: 10,
    top: 8,
    borderRadius: 140 / 2,
    transform: [{scaleY: 1.5}],
    backgroundColor: 'white',
    zIndex: 999,
  },
});
