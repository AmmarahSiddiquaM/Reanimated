import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {PERSPECTIVE, SCREEN_OFFSET, SCREEN_WIDTH} from './constants';
import {Icon, Text} from '../../../components/atoms';
import {spacing} from '../../../theme';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from '../../../assets/images';
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';

const NEW_SCREEN_WIDTH = SCREEN_WIDTH - SCREEN_OFFSET;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BookShelf = ({progress, onPressBack}) => {
  const {top} = useSafeAreaInsets();
  const viewStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: -NEW_SCREEN_WIDTH / 2},
      {perspective: PERSPECTIVE},
      {
        rotateY: `${interpolate(
          progress.value,
          [0, 1],
          [90, 0],
          Extrapolate.CLAMP,
        )}deg`,
      },
      {translateX: NEW_SCREEN_WIDTH / 2},
    ],
  }));

  const pressableStyles = useAnimatedStyle(() => ({
    opacity: progress.value === 1 ? withTiming(1) : withTiming(0),
    transform: [
      {
        translateX: progress.value === 1 ? withTiming(0) : withTiming(20),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.container, viewStyles]}>
      <AnimatedPressable
        style={[styles.leftContainer(top), pressableStyles]}
        onPress={onPressBack}>
        <Icon name="arrow-left" color="black" size={28} />
      </AnimatedPressable>
      <SafeAreaView style={styles.innerContainer}>
        <View style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.titleContainer}>
              <FastImage source={images.nav3d[1]} style={styles.image} />
              <Text size="xxl" weight="bold">
                1984
              </Text>
              <Text weight="medium">George Orwell</Text>
            </View>
            <View style={styles.ratingContainer}>
              <View style={styles.rating}>
                <Text size="l" weight="semibold" style={styles.ratingTitle}>
                  4.5
                </Text>
                <Text size="xs" color="gray">
                  Rating
                </Text>
              </View>
              <View style={styles.rating}>
                <Text size="l" weight="semibold" style={styles.ratingTitle}>
                  160
                </Text>
                <Text size="xs" style={{textAlign: 'center'}} color="gray">
                  Number of{'\n'} Pages
                </Text>
              </View>
              <View style={styles.rating}>
                <Text size="l" weight="semibold" style={styles.ratingTitle}>
                  English
                </Text>
                <Text size="xs" color="gray">
                  Language
                </Text>
              </View>
            </View>
            <Text
              weight="bold"
              size="xl"
              style={{marginTop: spacing.m, marginBottom: spacing.s}}>
              Description
            </Text>
            <Text style={{lineHeight: 28}}>
              Nineteen Eighty-Four (also stylised as 1984) is a dystopian social
              science fiction novel and cautionary tale written by the English
              writer George Orwell. It was published on 8 June 1949 by Secker &
              Warburg as Orwell's ninth and final book completed in his
              lifetime. Thematically, it centres on the consequences of
              totalitarianism, mass surveillance and repressive regimentation of
              people and behaviours within society. Orwell, a democratic
              socialist, modelled the totalitarian government in the novel after
              Stalinist Russia and Nazi Germany.More broadly, the novel examines
              the role of truth and facts within politics and the ways in which
              they are manipulated.
            </Text>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button}>
              <Text color="white" weight="semibold">
                Buy Now
              </Text>
            </Pressable>
            <Pressable>
              <Text weight="semibold">Save for Later</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

export default BookShelf;

const styles = StyleSheet.create({
  container: {
    width: NEW_SCREEN_WIDTH,
    backgroundColor: 'white',
  },
  leftContainer: top => ({
    backgroundColor: 'white',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: top + spacing.m,
    left: -25,
    zIndex: 999,
  }),
  innerContainer: {
    flex: 1,
    padding: spacing.m,
  },
  titleContainer: {
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 300,
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    padding: spacing.m,
    marginTop: spacing.l,
    backgroundColor: '#f3f3f4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  rating: {
    alignItems: 'center',
  },
  ratingTitle: {
    marginBottom: spacing.xxs,
  },
  buttonContainer: {
    marginTop: spacing.s,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.s,
    borderRadius: 10,
    marginRight: spacing.m,
  },
});
