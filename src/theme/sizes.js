import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const avatarSizes = {
  xxs: 32,
  xs: 40,
  s: 48,
  m: 54,
  l: 70,
  xl: 90,
};

export const fontSizes = {
  xxs: 10,
  xs: 12,
  s: 14,
  m: 16,
  l: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
};

export const dimensions = {
  screenWidth: width,
  screenHeight: height,
};
