import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Animated, {useAnimatedScrollHandler} from 'react-native-reanimated';
import {COFFEE_IMAGE__SIZE} from '../constants';
import CoffeeItem from './CoffeeItem';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const CoffeeList = ({data, scrollX, activeIndex}) => {
  const renderItem = ({item, index}) => (
    <CoffeeItem item={item} index={index} activeIndex={activeIndex} />
  );
  const keyExtractor = item => item.id.toString();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <AnimatedFlatList
      horizontal
      onScroll={scrollHandler}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      pagingEnabled
      snapToInterval={COFFEE_IMAGE__SIZE}
      decelerationRate="fast"
      style={styles.flatlist}
    />
  );
};

export default CoffeeList;

const styles = StyleSheet.create({
  flatlist: {
    flexGrow: 0,
  },
});
