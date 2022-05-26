import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const Indicator = ({activeIndex, routes, measurements, inputRange}) => {
  const widthOutputRange = measurements.map(i => i?.width || 0);

  const viewStyles = useAnimatedStyle(() => ({
    width: interpolate(
      activeIndex.value,
      inputRange,
      widthOutputRange,
      Extrapolate.CLAMP,
    ),
  }));

  return <Animated.View style={[styles.indicator, viewStyles]} />;
};

export default Indicator;

const styles = StyleSheet.create({
  indicator: {
    zIndex: -1,
    position: 'absolute',
    borderRadius: 4,
    backgroundColor: '#272227',
    height: '100%',
  },
});
