import React from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {Text} from '../../../../components/atoms';
import {ANIMALS, IMAGE_WIDTH, TEXT_CONTAINER_HEIGHT} from './constants';

export const NameContainer = ({scrollX}) => {
  const inputRange = ANIMALS.map((_, index) => index * IMAGE_WIDTH);
  const outputRange = ANIMALS.map((_, index) => -index * TEXT_CONTAINER_HEIGHT);

  const viewStyles = useAnimatedStyle(() => ({
    transform: [
      {translateY: interpolate(scrollX.value, inputRange, outputRange)},
    ],
  }));

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.container, viewStyles]}>
        {ANIMALS.map(item => (
          <View style={styles.itemContainer}>
            <Text size={24} weight="bold" color="white">
              {item.name}
            </Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 999,
    position: 'absolute',
    backgroundColor: 'black',
    height: TEXT_CONTAINER_HEIGHT,
    overflow: 'hidden',
  },
  container: {},
  itemContainer: {
    height: TEXT_CONTAINER_HEIGHT,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
