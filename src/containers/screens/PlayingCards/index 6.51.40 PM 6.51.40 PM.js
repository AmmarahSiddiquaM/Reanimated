import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';
import {images} from '../../../assets/images';

import Card from './Card';
import {cards, CARD_HEIGHT} from './constants';

const PlayingCards = () => {
  const progress = useSharedValue(0);

  const renderItem = (item, index) => (
    <Card item={item} index={index} progress={progress} />
  );

  const upFlingGesture = Gesture.Fling()
    .direction(Directions.UP)
    .onStart(() => {
      progress.value = withTiming(1);
    });

  const downFlingGesture = Gesture.Fling()
    .direction(Directions.DOWN)
    .onStart(() => {
      progress.value = withTiming(0);
    });

  return (
    <GestureDetector gesture={upFlingGesture}>
      <GestureDetector gesture={downFlingGesture}>
        <Animated.View style={styles.container}>
          {cards.map(renderItem)}
          <FastImage
            source={images.playingCards.hand}
            style={styles.hand}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Animated.View>
      </GestureDetector>
    </GestureDetector>
  );
};

export default PlayingCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  hand: {
    width: 150,
    height: 150,
    position: 'absolute',
    transform: [{translateY: CARD_HEIGHT - 75}],
  },
});
