import React from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {images} from '../../../assets/images';

const {height: wHeight, width: wWidth} = Dimensions.get('window');

export const HEADER_IMAGE_HEIGHT = wHeight / 3;
const AnimatedImage = Animated.createAnimatedComponent(Image);

const HeaderImage = ({scrollY}) => {
  const imageStyles = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [-100, 0],
      [HEADER_IMAGE_HEIGHT + 100, HEADER_IMAGE_HEIGHT],
      {extrapolateRight: Extrapolate.CLAMP},
    ),
    top: interpolate(scrollY.value, [0, 100], [0, -100], {
      extrapolateLeft: Extrapolate.CLAMP,
    }),
  }));

  return (
    <AnimatedImage
      source={images.background}
      style={[styles.image, imageStyles]}
    />
  );
};

export default HeaderImage;

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: wWidth,
    resizeMode: 'cover',
    height: HEADER_IMAGE_HEIGHT,
  },
});
