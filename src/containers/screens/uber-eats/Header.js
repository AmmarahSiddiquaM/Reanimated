import React, {RefObject} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {HEADER_IMAGE_HEIGHT} from './HeaderImage';
import TabHeader from './TabHeader';
import {TabModel} from './Content';
import {Icon} from '../../../components/atoms';

const ICON_SIZE = 24;
const PADDING = 16;
export const MIN_HEADER_HEIGHT = 45;

export default ({tabs, scrollY, scrollViewRef}) => {
  const insets = useSafeAreaInsets();
  const {top: paddingTop} = insets;

  const textStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [0, HEADER_IMAGE_HEIGHT],
          [HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT, 0],
          {extrapolateRight: Extrapolate.CLAMP},
        ),
      },
      {
        translateX: interpolate(
          scrollY.value,
          [0, HEADER_IMAGE_HEIGHT],
          [-(ICON_SIZE + PADDING), 0],
          Extrapolate.CLAMP,
        ),
      },
    ],
  }));

  const transition = useDerivedValue(() => {
    return scrollY.value > HEADER_IMAGE_HEIGHT ? withTiming(1) : withTiming(0);
  }, [scrollY]);

  const viewStyles = useAnimatedStyle(() => ({
    opacity: transition.value,
  }));

  return (
    <View style={[styles.container, {paddingTop}]}>
      <Animated.View style={[styles.background, viewStyles]} />
      <View style={styles.header}>
        <View>
          <Icon name="icon-arrow-prev" size={ICON_SIZE} color="black" />
        </View>
        <Animated.Text style={[styles.title, textStyles]}>
          Miss Miu Europaallee
        </Animated.Text>
        <Icon name="bell" size={ICON_SIZE} color="white" />
      </View>
      <TabHeader
        tabs={tabs}
        transition={transition}
        scrollY={scrollY}
        scrollViewRef={scrollViewRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    height: MIN_HEADER_HEIGHT,
    alignItems: 'center',
    paddingHorizontal: PADDING,
  },
  title: {
    fontSize: 18,
    marginLeft: PADDING,
    flex: 1,
  },
});
