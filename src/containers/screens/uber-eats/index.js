import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import HeaderImage from './HeaderImage';
import Content, {defaultTabs} from './Content';
import Header from './Header';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

export default () => {
  const [tabs, setTabs] = useState(defaultTabs);
  const scrollY = useSharedValue(0);

  const scrollViewRef = useAnimatedRef();

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {y}}) => {
      scrollY.value = y;
    },
  });
  return (
    <View style={styles.container}>
      <HeaderImage scrollY={scrollY} />
      <Header tabs={tabs} scrollY={scrollY} scrollViewRef={scrollViewRef} />
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        style={StyleSheet.absoluteFill}
        scrollEventThrottle={1}>
        <Content
          onMeasurement={(index, tab) => {
            tabs[index] = tab;
            setTabs([...tabs]);
          }}
        />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
