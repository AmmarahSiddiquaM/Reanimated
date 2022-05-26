import React, {RefObject, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Tabs from './Tabs';
import {TabModel} from './Content';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import MaskedView from '@react-native-masked-view/masked-view';

const TabHeader = ({tabs, transition, scrollY, scrollViewRef}) => {
  const index = useSharedValue(0);

  useDerivedValue(() => {
    tabs.map((tab, i) => {
      if (i === tabs.length - 1) {
        if (scrollY.value >= tab.anchor) {
          index.value = withTiming(i);
        }
      } else {
        if (scrollY.value >= tab.anchor && scrollY.value < tabs[i + 1].anchor) {
          index.value = withTiming(i);
        }
      }
    });
  }, [tabs, scrollY, measurements]);

  const [measurements, setMeasurements] = useState(
    new Array(tabs.length).fill(0),
  );

  const viewStyles = useAnimatedStyle(() => ({
    opacity: transition.value,
  }));

  const inputRange = tabs.map((_, i) => i);
  const translateXOutputRange = tabs.map((_, i) => {
    return (
      measurements.filter((__, j) => j < i).reduce((acc, m) => acc + m, 0) +
      8 * i
    );
  });

  const blackBoxStyles = useAnimatedStyle(() => ({
    width: interpolate(index.value, inputRange, measurements),
  }));

  const outerViewStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: -interpolate(
          index.value,
          inputRange,
          translateXOutputRange,
        ),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.container, viewStyles]}>
      <Animated.View style={[styles.outerView, outerViewStyles]}>
        <Tabs
          onMeasurement={(i, m) => {
            measurements[i] = m;
            setMeasurements([...measurements]);
          }}
          {...{tabs}}
        />
      </Animated.View>
      <View>
        <Animated.View style={[styles.blackbox, blackBoxStyles]} />
      </View>
      <MaskedView
        style={StyleSheet.absoluteFillObject}
        maskElement={
          <Animated.View style={[styles.blackbox, blackBoxStyles]} />
        }>
        <Animated.View style={[styles.outerView, outerViewStyles]}>
          <Tabs
            active
            onPress={i => {
              if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({y: tabs[i].anchor + 1});
              }
            }}
            {...{tabs}}
          />
        </Animated.View>
      </MaskedView>
    </Animated.View>
  );
};

export default TabHeader;

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    height: 45,
    marginBottom: 8,
    flexDirection: 'row',
  },
  blackbox: {
    borderRadius: 24,
    backgroundColor: 'black',
    flex: 1,
  },
  outerView: {
    ...StyleSheet.absoluteFillObject,
  },
});
