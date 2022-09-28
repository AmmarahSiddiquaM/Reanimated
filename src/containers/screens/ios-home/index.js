import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PinchGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useLayout} from '../../../hooks';
import {dimensions, spacing} from '../../../theme';
import Item from './Item';

const NUMBER_OF_COLUMNS = 4;
const ITEM_SIZE = dimensions.screenWidth / NUMBER_OF_COLUMNS;
const NUMBER_OF_ROWS = Math.ceil(dimensions.screenHeight / ITEM_SIZE) - 4;

const IOSHome = () => {
  const itemSize = useSharedValue(dimensions.screenWidth / 4);

  const isPinchIn = useSharedValue(false);
  const onGestureEvent = useAnimatedGestureHandler({
    onEnd: ({scale}) => {
      if (scale < 1) {
        isPinchIn.value = true;
      } else {
        isPinchIn.value = false;
      }
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <PinchGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={styles.column}>
            {Array(NUMBER_OF_ROWS)
              .fill(0)
              .map((_, row) => (
                <Animated.View key={row} style={styles.row}>
                  {Array(NUMBER_OF_COLUMNS)
                    .fill(0)
                    .map((__, column) => (
                      <Item
                        key={`${row}${column}`}
                        size={ITEM_SIZE}
                        row={row}
                        column={column}
                      />
                    ))}
                </Animated.View>
              ))}
          </Animated.View>
        </PinchGestureHandler>
      </View>
    </SafeAreaView>
  );
};

export default IOSHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  wrapper: {},
  column: {},
  row: {
    flexDirection: 'row',
  },
});
