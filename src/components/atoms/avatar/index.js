/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Image from 'react-native-fast-image';

import {avatarSizes, colors} from '../../../theme';

class Avatar extends React.Component {
  render() {
    const {
      source,
      circular = false,
      size = 'm',
      style,
      imageStyle,
    } = this.props;
    return (
      <View
        style={[
          styles.imageContainer,
          {
            height: avatarSizes[size] || size,
            width: avatarSizes[size] || size,
            borderRadius: circular ? 100 : 10,
          },
          style,
        ]}>
        <Image source={source} style={[styles.image, imageStyle]} />
      </View>
    );
  }
}

export default Avatar;

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: colors.transparent,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
