import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {dimensions} from '../../../theme/sizes';
import {spacing} from '../../../theme/spacing';
import {interpolateColors} from '../../../utils/colors';
import {CustomCellRenderer} from './CustomCellRenderer';
import {Item} from './Item';

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

const mockData = interpolateColors('rgb(94, 79, 162)', 'rgb(247, 148, 89)', 40);

export const ScaleList = () => {
  const scrollY = useSharedValue(0);
  const renderItem = ({item, index, measurements}) => (
    <Item item={item} measurements={measurements} scrollY={scrollY} />
  );
  const keyExtractor = (item, index) => index;

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {y}}) => {
      scrollY.value = y;
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <AnimatedFlatlist
          onScroll={onScroll}
          scrollEventThrottle={16}
          data={mockData}
          showsVerticalScrollIndicator={false}
          CellRendererComponent={CustomCellRenderer}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
