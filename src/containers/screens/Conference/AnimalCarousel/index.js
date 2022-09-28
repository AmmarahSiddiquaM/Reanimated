import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ANIMALS, IMAGE_WIDTH} from './constants';
import {Item} from './Item';
import {NameContainer} from './NameContainer';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const AnimalCarouselWithWidth = () => {
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {x}}) => {
      scrollX.value = x;
    },
  });

  const renderItem = ({item, index}) => <Item item={item} index={index} />;
  const keyExtractor = (_, index) => index;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <NameContainer scrollX={scrollX} />
        <AnimatedFlatList
          onScroll={scrollHandler}
          data={ANIMALS}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          horizontal
          snapToInterval={IMAGE_WIDTH}
          decelerationRate="fast"
          pagingEnabled
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
