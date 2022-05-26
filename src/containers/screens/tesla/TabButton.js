import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import {Icon, Text} from '../../../components/atoms';
import {colors, spacing} from '../../../theme';
import {TABBAR_WITHOUT_TEXT_WIDTH} from './TabBar';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TabButton = ({
  tabBarLabel,
  tabBarIcon,
  activeIndex,
  index,
  measurements,
  onPressTab,
}) => {
  const inputRange = [index - 1, index, index + 1];
  const withoutTextInputRange = [
    index - 1,
    index - 0.7,
    index,
    index + 0.7,
    index + 1,
  ];
  const withTextInputRange = [
    index - 1,
    index - 0.1,
    index,
    index + 0.1,
    index + 1,
  ];

  const tabStyles = useAnimatedStyle(() => ({
    width: interpolate(
      activeIndex.value,
      inputRange,
      [
        TABBAR_WITHOUT_TEXT_WIDTH,
        measurements[index].width,
        TABBAR_WITHOUT_TEXT_WIDTH,
      ],
      Extrapolate.CLAMP,
    ),
  }));

  const tabWithoutTextStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      activeIndex.value,
      withoutTextInputRange,
      [1, 0, 0, 0, 1],
    ),
  }));

  const tabWithTextStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      activeIndex.value,
      withTextInputRange,
      [0, 0, 1, 0, 0],
    ),
  }));

  const onPress = () => {
    onPressTab(index);
  };

  return (
    <AnimatedPressable style={[styles.tab, tabStyles]} onPress={onPress}>
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
