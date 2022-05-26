import React from 'react';
import {StyleSheet, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import Animated, {
  useAnimatedRef,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useAnimatedPagerScrollHandler} from '../../../hooks';
import CarouselItem from './CarouselItem';
import CustomTopTab from './CustomTopTab';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const tabs = [
  {
    name: 'Bell',
    icon: 'bell',
    backgroundColor: 'green',
  },
  {
    name: 'Briefcase',
    icon: 'briefcase',
    backgroundColor: 'yellow',
  },
  {
    name: 'Home',
    icon: 'home',
    backgroundColor: 'blue',
  },
  {
    name: 'Filter',
    icon: 'filter',
    backgroundColor: 'red',
  },
  {
    name: 'Message',
    icon: 'message',
    backgroundColor: 'black',
  },
];

const routes = tabs.map(tab => ({
  key: tab.name,
  tabBarLabel: tab.name,
  tabBarIcon: tab.icon,
}));

const Test = () => {
  const pagerRef = useAnimatedRef();

  const activeIndex = useSharedValue(0);

  const pageScrollHandler = useAnimatedPagerScrollHandler({
    onPageScroll: ({offset, position}) => {
      'worklet';
      activeIndex.value = offset + position;
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <CustomTopTab routes={routes} activeIndex={activeIndex} />
        <AnimatedPagerView
          ref={pagerRef}
          style={styles.container}
          initialPage={0}
          onPageScroll={pageScrollHandler}>
          {tabs.map((tab, index) => (
            <CarouselItem tab={tab} index={index} activeIndex={activeIndex} />
          ))}
        </AnimatedPagerView>
      </View>
    </SafeAreaView>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
