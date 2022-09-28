import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

export const Animations = () => {
  const progress = useSharedValue(0);

  const onPressReset = () => {
    progress.value = withTiming(0);
  };

  const onPressWithTiming = () => {
    progress.value = withTiming(100, {duration: 1000});
  };

  const onPressWithSpring = () => {
    progress.value = withSpring(100);
  };

  const onPressTimingWithDelay = () => {
    progress.value = withDelay(2000, withTiming(100));
  };

  const onPressTimingAndSpringWithSequence = () => {
    progress.value = withSequence(withSpring(100), withTiming(200));
  };

  const viewStyles = useAnimatedStyle(() => ({
    transform: [{translateX: progress.value}],
    opacity: interpolate(progress.value, [0, 100], [1, 0]),
    // backgroundColor: interpolateColor(
    //   progress.value,
    //   [0, 100, 200],
    //   ['black', 'blue', 'green'],
    // ),
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Animated.View style={[styles.box, viewStyles]} />
        <Button
          style={styles.button}
          title="Interpolate"
          onPress={onPressWithTiming}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    marginTop: 40,
    width: 100,
    height: 100,
    backgroundColor: 'black',
    borderRadius: 20,
  },
});
