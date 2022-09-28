import React from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

import {dimensions, spacing} from '../../../theme';

import {Text} from '../../../components/atoms';
import CustomTopTab from './CustomTopTab';
import ListItem from './ListItem';

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const tabs = [
  {
    tabBarLabel: 'Bell',
    tabBarIcon: 'bell',
  },
  {
    tabBarLabel: 'Briefcase',
    tabBarIcon: 'briefcase',
  },
  {
    tabBarLabel: 'Home',
    tabBarIcon: 'home',
  },
  {
    tabBarLabel: 'Filter',
    tabBarIcon: 'filter',
  },
  {
    tabBarLabel: 'Message',
    tabBarIcon: 'message',
  },
];

export const ITEM_WIDTH = dimensions.screenWidth - 80;

const Tesla = () => {
  const flatlistRef = useAnimatedRef();
  const scrollX = useSharedValue(0);
  const activeIndex = useDerivedValue(() => {
    return scrollX.value / (ITEM_WIDTH + spacing.xs);
  }, [scrollX]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {x}}) => {
      scrollX.value = x;
    },
  });

  const renderItem = ({item, index}) => {
    const last = index === tabs.length - 1;
    return (
      <ListItem
        item={item}
        index={index}
        activeIndex={activeIndex}
        last={last}
      />
    );
  };

  const onPressTab = index => {
    if (flatlistRef.current) {
      flatlistRef.current.scrollToIndex({
        index,
        viewOffset: 40,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Text
          size="xl"
          color="white"
          weight="medium"
          style={{alignSelf: 'center', marginVertical: 80}}>
          Animated Top Bar
        </Text>
        <CustomTopTab
          routes={tabs}
          activeIndex={activeIndex}
          onPressTab={onPressTab}
        />
        <AnimatedFlatlist
          ref={flatlistRef}
          data={tabs}
          renderItem={renderItem}
          horizontal
          bounces={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          pagingEnabled
          snapToAlignment="start"
          snapToInterval={ITEM_WIDTH + spacing.xs}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatlist}
          disableIntervalMomentum
        />
      </View>
    </SafeAreaView>
  );
};

export default Tesla;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#19181c',
  },
  flatlist: {
    marginTop: spacing.xl,
    paddingHorizontal: 80 / 2,
  },
});
