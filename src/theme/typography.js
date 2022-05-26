import {Platform} from 'react-native';

export const typography = {
  regular: Platform.select({
    ios: 'HafferTRIAL-Regular',
    android: 'HafferTRIAL-Regular',
  }),
  thin: Platform.select({
    ios: 'HafferTRIAL-Thin',
    android: 'HafferTRIAL-Thin',
  }),
  light: Platform.select({
    ios: 'HafferTRIAL-Light',
    android: 'HafferTRIAL-Light',
  }),
  medium: Platform.select({
    ios: 'HafferTRIAL-Medium',
    android: 'HafferTRIAL-Medium',
  }),
  semibold: Platform.select({
    ios: 'HafferTRIAL-SemiBold',
    android: 'HafferTRIAL-SemiBold',
  }),
  bold: Platform.select({
    ios: 'HafferTRIAL-Bold',
    android: 'HafferTRIAL-Bold',
  }),
  heavy: Platform.select({
    ios: 'HafferTRIAL-Heavy',
    android: 'HafferTRIAL-Heavy',
  }),
};
