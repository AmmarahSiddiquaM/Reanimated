import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {ITEM_WIDTH} from './';
import {Icon, Text} from '../../../components/atoms';
import {colors, spacing} from '../../../theme';

const ListItem = ({item, last, index, activeIndex}) => {
  const inputRange = [index - 1, index, index + 1];

  const viewStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          activeIndex.value,
          inputRange,
          [0.95, 1, 0.95],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.container(last), viewStyles]}>
      <Icon name={item.tabBarIcon} color={colors.white} size={36} />
      <Text color={colors.white} style={styles.title}>
        {item.tabBarLabel}
      </Text>
      <Text color="#6e6e6e" style={styles.caption} size="s">
        This is a {item.tabBarLabel}
      </Text>
      <Pressable style={styles.button}>
        <Text color="white">Start</Text>
      </Pressable>
    </Animated.View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: last => ({
    height: 400,
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#272227',
    marginRight: last ? 0 : spacing.xs,
    borderRadius: 6,
  }),
  title: {
    marginTop: spacing.s,
  },
  caption: {
    marginTop: spacing.xs,
  },
  button: {
    backgroundColor: '#232e5e',
    marginBottom: spacing.s,
    position: 'absolute',
    bottom: spacing.s,
    alignSelf: 'center',
    width: '90%',
    borderRadius: 6,
    paddingVertical: spacing.s,
    alignItems: 'center',
  },
});
