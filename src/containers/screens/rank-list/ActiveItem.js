import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {Avatar, Icon, Text} from '../../../components/atoms';
import {useLayout} from '../../../hooks';
import {spacing} from '../../../theme';

const ActiveItem = ({item, index, scrollY, viewportHeight}) => {
  const {onLayout, y, height} = useLayout();

  const newOffset = useDerivedValue(
    () => -y.value + viewportHeight.value - height.value + scrollY.value,
  );

  const viewStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [
            0,
            y.value - viewportHeight.value + height.value - 1,
            y.value - viewportHeight.value + height.value,
            y.value - 1,
            y.value,
          ],
          [newOffset.value, newOffset.value, 0, 0, scrollY.value - y.value],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  return (
    <Animated.View onLayout={onLayout} style={[styles.wrapper, viewStyles]}>
      <View style={styles.box} />
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <Avatar circular source={item.image} />
          <Text weight="medium" style={styles.name}>
            Me
          </Text>
        </View>
        <View style={styles.nameContainer}>
          <Text weight="medium">{item.rank}</Text>
          <Icon name="rank-up" size={14} style={styles.icon} />
        </View>
      </View>
    </Animated.View>
  );
};

export default ActiveItem;

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 999,
    borderRadius: 10,
    overflow: 'hidden',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.s,
    backgroundColor: 'gray',
  },
  box: {
    position: 'absolute',
    height: '100%',
    width: 6,
    backgroundColor: 'black',
    zIndex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginLeft: spacing.s,
  },
  icon: {
    marginLeft: spacing.s,
  },
});
