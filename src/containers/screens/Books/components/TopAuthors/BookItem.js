import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text} from '../../../../../components/atoms';
import {spacing} from '../../../../../theme';

const BookItem = ({item}) => {
  return (
    <View>
      <FastImage source={item.image} style={styles.image} />
      <Text numberOfLines={1} weight="semibold" size="l" style={styles.text}>
        {item.name}
      </Text>
    </View>
  );
};

export default BookItem;

const styles = StyleSheet.create({
  image: {
    width: 140,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  text: {
    marginTop: spacing.s,
  },
});
