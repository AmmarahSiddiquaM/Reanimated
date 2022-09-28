import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Svg, {Image} from 'react-native-svg';
import {images} from '../../../assets/images';
import {Text} from '../../../components/atoms';
import {spacing} from '../../../theme';
import {ANGLE, PERSPECTIVE, SCREEN_WIDTH} from './constants';
import PopularBooks from './Popular';
import TopAuthors from './TopAuthors';

const Home = ({progress, onPressNext}) => {
  const viewStyles = useAnimatedStyle(() => ({
    transform: [
      {translateX: SCREEN_WIDTH / 2},
      {perspective: PERSPECTIVE},
      {
        rotateY: `${interpolate(
          progress.value,
          [0, 1],
          [0, -ANGLE],
          Extrapolate.CLAMP,
        )}rad`,
      },
      {translateX: -SCREEN_WIDTH / 2},
    ],
  }));

  return (
    <Animated.View style={[styles.container, viewStyles]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeAreaView style={styles.innerContainer}>
          <Text size="xxl" weight="bold" style={styles.title}>
            Hello,{'\n'}Ankush
          </Text>
          <Pressable style={styles.box} onPress={onPressNext}>
            <Svg
              style={styles.boxSvg}
              width={240}
              height={180}
              viewBox="0 -80 100 200">
              <Image
                width={200}
                height={180}
                href={images.nav3d['1']}
                transform="rotate(-10)"
              />
            </Svg>
            <Text weight="semibold" color="white">
              READING
            </Text>
            <Text color="lightgray">Page: 25 out of 100</Text>
          </Pressable>
          <PopularBooks />
          <TopAuthors />
        </SafeAreaView>
      </ScrollView>
    </Animated.View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 1,
    paddingVertical: spacing.m,
  },
  title: {
    marginLeft: spacing.m,
  },
  box: {
    marginVertical: spacing.m,
    marginLeft: spacing.m,
    backgroundColor: '#415e71',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: spacing.m,
  },
  boxSvg: {
    position: 'absolute',
    bottom: 0,
    right: spacing.m,
  },
  boxBook: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
    position: 'absolute',
    transform: [{rotate: '-20deg'}],
  },
});
