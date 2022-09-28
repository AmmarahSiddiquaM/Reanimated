import React from 'react';
import {View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {IMAGE_HEIGHT, IMAGE_WIDTH} from './constants';

export const Item = ({item, index}) => {
  return (
    <View style={styles.container}>
      <FastImage source={item.image} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
