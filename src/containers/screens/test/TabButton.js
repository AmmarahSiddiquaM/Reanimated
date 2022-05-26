import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import {Icon, Text} from '../../../components/atoms';
import {colors, spacing} from '../../../theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TabButton = ({
  tabBarLabel,
  tabBarIcon,
  activeIndex,
  index,
  measurements,
}) => {
  const inputRange = [index - 1, index, index + 1];
  const isFocused = useDerivedValue(
    () => activeIndex.value === index,
    [activeIndex],
  );

  const tabStyles = useAnimatedStyle(() => ({
    width: interpolate(
      activeIndex.value,
      inputRange,
      [60, measurements[index].width, 60],
      Extrapolate.CLAMP,
    ),
  }));

  const tabWithoutTextStyles = useAnimatedStyle(() => ({
    opacity: interpolate(activeIndex.value, inputRange, [1, 0, 1]),
  }));
  const tabWithTextStyles = useAnimatedStyle(() => ({
    opacity: isFocused.value ? withTiming(1) : withTiming(0),
  }));

  return (
    <AnimatedPressable style={[styles.tab, tabStyles]}>
      <Animated.View style={[styles.tabWithoutText, tabWithoutTextStyles]}>
        <Icon size={18} name={tabBarIcon} color="#9e9e9e" />
      </Animated.View>
      <Animated.View style={[styles.tabWithText, tabWithTextStyles]}>
        <Icon
          size={18}
          name={tabBarIcon}
          style={styles.icon}
          color={colors.white}
        />
        <Text color={colors.white} weight="medium">
          {tabBarLabel}
        </Text>
      </Animated.View>
    </AnimatedPressable>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: spacing.s,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tabWithoutText: {
    position: 'absolute',
  },
  tabWithText: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: spacing.xs,
  },
});
