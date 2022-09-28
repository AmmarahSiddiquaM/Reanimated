import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {images} from '../../../assets/images';
import {dimensions, spacing} from '../../../theme';

const selectRow = 4;
const selectColumn = 1;

function atan2Normalized(y, x) {
  'worklet';
  var result = Math.atan2(y, x);
  if (result < 0) {
    result += 2 * Math.PI;
  }
  return result;
}

const Item = ({size, row, column}) => {
  const itemRef = useAnimatedRef();
  const xCoord = column * size + size / 2;
  const yCoord = row * size + size / 2;
  const xOrigin = dimensions.screenWidth / 2;
  const yOrigin = dimensions.screenHeight / 2;

  useDerivedValue(() => {
    const rad = atan2Normalized(-(yCoord - yOrigin), xCoord - xOrigin);
    const rot = rad * (180 / Math.PI);
    return rot;
  });

  const xDirection = useDerivedValue(() => xOrigin - xCoord);
  const yDirection = useDerivedValue(() => yOrigin - yCoord);

  const distanceFromCenter = useDerivedValue(() => {
    return Math.hypot(xDirection.value, yDirection.value);
  });

  const viewStyles = useAnimatedStyle(() => ({
    width: size,
    height: size,
    transform: [
      {
        translateX:
          (xDirection.value > 0 ? -1 : 1) *
          interpolate(distanceFromCenter.value, [0, 1], [0, 0.02]),
      },
      //   {
      //     translateY:
      //       (yDirection.value > 0 ? 1 : -1) *
      //       interpolate(distanceFromCenter.value, [0, 1], [0, 0.02]),
      //   },
    ],
  }));
  return (
    <Animated.View ref={itemRef} style={[styles.container, viewStyles]}>
      <View style={styles.item}>
        {row === selectRow && column === selectColumn && (
          <Image
            source={images['ios-icons']['app-store']}
            style={styles.image}
          />
        )}
      </View>
    </Animated.View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    padding: spacing.xs,
  },
  item: {
    backgroundColor: 'green',
    flex: 1,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
