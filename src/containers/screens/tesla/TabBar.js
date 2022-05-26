import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {dimensions} from '../../../theme';
import Indicator from './Indicator';
import TabButton from './TabButton';

export const TABBAR_WITHOUT_TEXT_WIDTH = 60;

const TabBar = ({measurements, activeIndex, routes, onPressTab}) => {
  const inputRange = routes.map((_, i) => i);

  const translateXOutputRange = routes.map(
    (_, i) => i * TABBAR_WITHOUT_TEXT_WIDTH,
  );

  const outerViewStyles = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: -interpolate(
            activeIndex.value,
            inputRange,
            translateXOutputRange,
          ),
        },
      ],
    }),
    [measurements],
  );

  const placeholderStyles = useAnimatedStyle(() => ({
    width: interpolate(
      activeIndex.value,
      inputRange,
      measurements.map(i => dimensions.screenWidth / 2 - i.width / 2),
    ),
  }));

  return (
    <>
      <View style={styles.placeholder}>
        <Indicator
          activeIndex={activeIndex}
          routes={routes}
          measurements={measurements}
          inputRange={inputRange}
        />
      </View>
      <Animated.View
        bounces={false}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.tabBar, outerViewStyles]}>
        <Animated.View style={placeholderStyles} />
        {routes.map((route, index) => {
          const tabBarLabel = route.tabBarLabel;
          const tabBarIcon = route.tabBarIcon;

          return (
            <TabButton
              key={index}
              last={index === routes.length - 1}
              index={index}
              tabBarLabel={tabBarLabel}
              tabBarIcon={tabBarIcon}
              inputRange={inputRange}
              activeIndex={activeIndex}
              measurements={measurements}
              onPressTab={onPressTab}
            />
          );
        })}
      </Animated.View>
    </>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBar: {
    height: '100%',
    flexDirection: 'row',
  },
  placeholder: {
    position: 'absolute',
    width: dimensions.screenWidth,
    height: '100%',
    alignItems: 'center',
  },
});
