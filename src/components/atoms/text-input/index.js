import React, {Component} from 'react';
import {StyleSheet, TextInput as RNTextInput} from 'react-native';

import {colors, fontSizes, typography} from '../../../theme';

class TextInput extends Component {
  render() {
    const {
      children,
      color = colors.textPrimary,
      size = 'm',
      weight = 'regular',
      style,
      ...props
    } = this.props;
    return (
      <RNTextInput {...props} style={[styles.text(color, size, weight), style]}>
        {children}
      </RNTextInput>
    );
  }
}

export default TextInput;

const styles = StyleSheet.create({
  text: (color, size, weight) => ({
    color,
    fontSize: fontSizes[size] || size,
    fontFamily: typography[weight],
    letterSpacing: -0.1,
  }),
});
