import React from 'react';
import {StyleSheet} from 'react-native';
import RNText from 'react-native-animateable-text';
import {fontSizes, typography} from '../../../theme';

const AnimateableText = ({
  children,
  color,
  size = 14,
  weight = 'regular',
  style,
  ...props
}) => {
  return (
    <RNText
      {...props}
      text={children}
      style={[styles.text(color, size, weight), style]}
    />
  );
};

export default AnimateableText;

const styles = StyleSheet.create({
  text: (color, size, weight) => ({
    color,
    fontSize: fontSizes[size] || size,
    fontFamily: typography[weight],
    letterSpacing: -0.1,
  }),
});
