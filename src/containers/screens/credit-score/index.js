/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {Svg, Circle} from 'react-native-svg';
import {images} from '../../../assets/images';
import {Text} from '../../../components/atoms';
import AnimateableText from '../../../components/atoms/animateable-text';

const CREDIT_SCORE_LOW = 0;
const CREDIT_SCORE_RANGE1 = 550;
const CREDIT_SCORE_RANGE2 = 700;
const CREDIT_SCORE_HIGH = 800;

const MY_CREDIT_SCORE = 575;

const RADIUS = 100;
const STROKE_WIDTH = 20;
const SVG_FULL_WIDTH = 2 * RADIUS + STROKE_WIDTH;
const SVG_FULL_HEIGHT = RADIUS + STROKE_WIDTH / 2;

const PI = Math.PI;
const CIRCUMFERENCE = 2 * PI * RADIUS;
const WHITE_LINE_CIRCUMFERENCE = 2 * PI * (RADIUS + STROKE_WIDTH / 2);

const RED_RANGE =
  ((CREDIT_SCORE_RANGE1 - CREDIT_SCORE_LOW) / CREDIT_SCORE_HIGH) *
  (CIRCUMFERENCE / 2);
const YELLOW_RANGE =
  ((CREDIT_SCORE_RANGE2 - CREDIT_SCORE_RANGE1) / CREDIT_SCORE_HIGH) *
  (CIRCUMFERENCE / 2);
const GREEN_RANGE =
  ((CREDIT_SCORE_HIGH - CREDIT_SCORE_RANGE2) / CREDIT_SCORE_HIGH) *
  (CIRCUMFERENCE / 2);

const MY_CREDIT_SCORE_RANGE =
  ((MY_CREDIT_SCORE - CREDIT_SCORE_LOW) / CREDIT_SCORE_HIGH) *
  (WHITE_LINE_CIRCUMFERENCE / 2);

const CreditScore = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    runAnimation();
  }, []);

  const runAnimation = () => {
    progress.value = withSequence(
      withTiming(7 / 8, {duration: 1000}),
      withTiming(2 / 8, {duration: 1000}),
      withTiming(8 / 8, {duration: 1000}),
      withTiming(1 / 8, {duration: 1000}),
      withTiming(MY_CREDIT_SCORE / CREDIT_SCORE_HIGH, {
        duration: 3000,
      }),
    );
  };

  const viewStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: RADIUS / 2,
      },
      {
        rotate: `${interpolate(
          progress.value,
          [0, 1],
          [-90, 90],
          Extrapolate.CLAMP,
        )}deg`,
      },

      {
        translateY: -RADIUS / 2,
      },
    ],
  }));

  useDerivedValue(() => {
    console.log(progress.value);
  });

  const textStyles = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [
        0,
        CREDIT_SCORE_RANGE1 / CREDIT_SCORE_HIGH,
        CREDIT_SCORE_RANGE1 / CREDIT_SCORE_HIGH + 0.01,
        CREDIT_SCORE_RANGE2 / CREDIT_SCORE_HIGH,
        CREDIT_SCORE_RANGE2 / CREDIT_SCORE_HIGH + 0.01,
        1,
      ],
      ['red', 'red', 'yellow', 'yellow', 'green', 'green'],
    ),
  }));

  const animatedProps = useAnimatedProps(() => {
    return {
      text: Math.floor(progress.value * CREDIT_SCORE_HIGH).toString(),
    };
  });

  return (
    <View style={styles.container}>
      <Svg
        width={SVG_FULL_WIDTH}
        height={SVG_FULL_HEIGHT}
        viewBox={`0 0 ${SVG_FULL_WIDTH} ${SVG_FULL_HEIGHT}`}
        style={styles.svg}>
        <Circle
          cx={SVG_FULL_WIDTH / 2}
          cy={0}
          r={RADIUS}
          strokeWidth={STROKE_WIDTH}
          stroke="red"
        />
        <Circle
          cx={SVG_FULL_WIDTH / 2}
          cy={0}
          r={RADIUS}
          strokeWidth={STROKE_WIDTH}
          stroke="yellow"
          strokeDasharray={`${YELLOW_RANGE} ${CIRCUMFERENCE - YELLOW_RANGE}`}
          strokeDashoffset={-RED_RANGE}
        />
        <Circle
          cx={SVG_FULL_WIDTH / 2}
          cy={0}
          r={RADIUS}
          strokeWidth={STROKE_WIDTH}
          stroke="green"
          strokeDasharray={`${GREEN_RANGE} ${CIRCUMFERENCE - GREEN_RANGE}`}
          strokeDashoffset={-(RED_RANGE + YELLOW_RANGE)}
        />
      </Svg>
      <Animated.View style={[styles.line, viewStyles]}>
        <View style={styles.triangle} />
        <View style={styles.circle} />
      </Animated.View>
      <View style={styles.textContainer}>
        <Text
          color="white"
          weight="bold"
          size={20}
          style={{position: 'absolute', top: 300}}>
          Welcome back, Ammarah
        </Text>
        <AnimateableText
          weight="bold"
          size={30}
          color="white"
          style={textStyles}
          animatedProps={animatedProps}
        />
      </View>
    </View>
  );
};

export default CreditScore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  svg: {
    transform: [{rotate: '180deg'}],
  },
  line: {
    height: RADIUS,
    width: 100,
    position: 'absolute',
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
  },
  triangle: {
    position: 'absolute',
    bottom: -10,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 3,
    borderBottomWidth: 110,
    borderLeftWidth: 3,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    borderLeftColor: 'transparent',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
  },
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    bottom: -20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
