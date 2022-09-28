import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Text} from '../../../components/atoms';

import {ITEM_SPACING, ITEM_WIDTH} from './constants';
import Item from './Item';

const data = [
  {
    id: 1,
    color: '#781C68',
  },
  {
    id: 2,
    color: '#CFD2CF',
  },
  {
    id: 3,
    color: '#FA9494',
  },
  {
    id: 4,
    color: '#EB1D36',
  },
  {
    id: 5,
    color: '#B9FFF8',
  },
  {
    id: 6,
    color: '#6FEDD6',
  },
  {
    id: 7,
    color: '#FF9551',
  },
  {
    id: 8,
    color: '#7FB77E',
  },
];

const Carousel = () => {
  const direction = useSharedValue(0);
  const progress = useDerivedValue(() => withTiming(direction.value));

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {x}}, ctx) => {
      const dx = x - (ctx?.x ?? 0);
      direction.value = dx;
      ctx.x = x;
    },
    onEndDrag: () => {
      direction.value = 0;
    },
  });

  const renderItem = ({item, index}) => (
    <Item
      item={item}
      index={index}
      progress={progress}
      last={index === data.length - 1}
    />
  );
  const keyExtractor = item => item.id;

  return (
    <View style={styles.container}>
      <Text color="white" weight="bold" size={30} style={styles.title}>
        Curved Carousel
      </Text>
      <View style={[styles.ovalContainer, styles.topOvalContainer]} />
      <Animated.FlatList
        bounces={false}
        snapToInterval={ITEM_WIDTH + 2 * ITEM_SPACING}
        decelerationRate="fast"
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.flatlist}
        contentContainerStyle={styles.flatlistContentContainer}
        horizontal
        data={[...data]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      <View style={[styles.ovalContainer, styles.bottomOvalContainer]} />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#100f10',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    position: 'absolute',
    zIndex: 999,
    top: 100,
  },
  flatlist: {
    height: 400,
    flexGrow: 0,
  },
  flatlistContentContainer: {
    paddingLeft: ITEM_WIDTH / 2 + ITEM_SPACING,
    paddingRight: ITEM_WIDTH / 2 + ITEM_SPACING,
  },
  ovalContainer: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: ITEM_WIDTH,
    backgroundColor: '#100f10',
    zIndex: 1,
  },
  topOvalContainer: {
    transform: [{scaleX: 2.5}, {scaleY: 0.5}, {translateY: ITEM_WIDTH}],
  },
  bottomOvalContainer: {
    transform: [{scaleX: 2.5}, {scaleY: 0.5}, {translateY: -ITEM_WIDTH}],
  },
});
