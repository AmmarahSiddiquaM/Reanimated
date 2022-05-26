import React, {Component} from 'react';
import {StyleSheet, Text as RNText} from 'react-native';

import {colors, fontSizes, typography} from '../../../theme';

class Text extends Component {
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
      <RNText {...props} style={[styles.text(color, size, weight), style]}>
        {children}
      </RNText>
    );
  }
}

export default Text;

const styles = StyleSheet.create({
  text: (color, size, weight) => ({
    color,
    fontSize: fontSizes[size] || size,
    fontFamily: typography[weight],
    letterSpacing: -0.1,
  }),
});
