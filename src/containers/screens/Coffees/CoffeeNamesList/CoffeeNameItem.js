import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../../../components/atoms/text';
import {COFFEE_NAME_HEIGHT} from '../constants';

const CoffeeNameItem = ({item}) => {
  return (
    <View style={styles.container}>
      <Text size={44} color="white" weight="bold">
        {item.name.toUpperCase()}
      </Text>
    </View>
  );
};

export default CoffeeNameItem;

const styles = StyleSheet.create({
  container: {
    height: COFFEE_NAME_HEIGHT,
  },
});
