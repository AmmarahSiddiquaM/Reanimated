import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import Animated, {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
// import {BlurView} from '@react-native-community/blur';

import {images} from '../../../assets/images';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const gravityFilterK = 0.8;
let gravityVector = [];

const ThreeDEffect = () => {
  const magnitude = 100;
  const animatedSensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: 10,
  });

  const imageStyle = useAnimatedStyle(() => {
    const roll = animatedSensor.sensor.value.yaw;
    const pitch = animatedSensor.sensor.value.roll;

    console.log({roll, pitch});

    return {
      transform: [
        {rotateX: `${roll}rad`},
        {rotateY: `${pitch}rad`},
        {perspective: 400},
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Image source={images.background} style={styles.blurredImage} />
      {/* <BlurView
        blurType="light"
        blurRadius={30}
        style={styles.blurredImageContainer}
      /> */}
      <AnimatedImage
        source={images.background}
        style={[styles.image, imageStyle]}
      />
    </View>
  );
};

export default ThreeDEffect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    zIndex: 999,
    position: 'absolute',
    width: 300,
    height: 400,
    borderRadius: 10,
  },
  blurredImage: {
    width: 284,
    height: 384,
    borderRadius: 10,
  },
  blurredImageContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
