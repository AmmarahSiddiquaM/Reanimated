import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {images} from '../../../assets/images';
import {Text} from '../../../components/atoms';
import {useLayout} from '../../../hooks';
import {spacing} from '../../../theme';
import ActiveItem from './ActiveItem';
import Item from './Item';

const data = [
  {name: 'Darlene Robertson', image: images.avatars['1'], rank: 1, prevRank: 8},
  {name: 'Theresa Webb', image: images.avatars['2'], rank: 2, prevRank: 2},
  {name: 'Floyd Miles', image: images.avatars['3'], rank: 3, prevRank: 28},
  {name: 'Annete Black', image: images.avatars['4'], rank: 4, prevRank: 33},
  {name: 'Ralph Walker', image: images.avatars['5'], rank: 5, prevRank: 15},
  {
    name: 'Darlene Robertson',
    image: images.avatars['6'],
    rank: 6,
    prevRank: 10,
  },
  {name: 'Darlene Robertson', image: images.avatars['7'], rank: 7, prevRank: 1},
  {name: 'Theresa Webb', image: images.avatars['8'], rank: 8, prevRank: 34},
  {name: 'Floyd Miles', image: images.avatars['9'], rank: 9, prevRank: 23},
  {name: 'Annete Black', image: images.avatars['1'], rank: 10, prevRank: 35},
  {name: 'Ralph Walker', image: images.avatars['2'], rank: 11, prevRank: 6},
  {
    name: 'Darlene Robertson',
    image: images.avatars['3'],
    rank: 12,
    prevRank: 19,
  },
  {
    name: 'Darlene Robertson',
    image: images.avatars['1'],
    rank: 13,
    prevRank: 30,
  },
  {name: 'Theresa Webb', image: images.avatars['2'], rank: 14, prevRank: 21},
  {name: 'Floyd Miles', image: images.avatars['3'], rank: 15, prevRank: 25},
  {name: 'Annete Black', image: images.avatars['4'], rank: 16, prevRank: 14},
  {name: 'Ralph Walker', image: images.avatars['5'], rank: 17, prevRank: 9},
  {
    name: 'Darlene Robertson',
    image: images.avatars['6'],
    rank: 18,
    prevRank: 17,
  },
  {
    name: 'Darlene Robertson',
    image: images.avatars['7'],
    rank: 19,
    prevRank: 29,
  },
  {name: 'Theresa Webb', image: images.avatars['8'], rank: 20, prevRank: 31},
  {name: 'Floyd Miles', image: images.avatars['9'], rank: 21, prevRank: 5},
  {name: 'Annete Black', image: images.avatars['1'], rank: 22, prevRank: 24},
  {name: 'Ralph Walker', image: images.avatars['2'], rank: 23, prevRank: 4},
  {
    name: 'Darlene Robertson',
    image: images.avatars['3'],
    rank: 24,
    prevRank: 12,
  },
  {name: 'Darlene Robertson', image: images.avatar1, rank: 25, prevRank: 16},
  {name: 'Theresa Webb', image: images.avatars['2'], rank: 26, prevRank: 32},
  {name: 'Floyd Miles', image: images.avatars['3'], rank: 27, prevRank: 20},
  {name: 'Annete Black', image: images.avatars['4'], rank: 28, prevRank: 7},
  {name: 'Ralph Walker', image: images.avatars['5'], rank: 29, prevRank: 18},
  {
    name: 'Darlene Robertson',
    image: images.avatars['6'],
    rank: 30,
    prevRank: 22,
  },
  {
    name: 'Darlene Robertson',
    image: images.avatars['7'],
    rank: 31,
    prevRank: 26,
  },
  {name: 'Theresa Webb', image: images.avatars['8'], rank: 32, prevRank: 11},
  {name: 'Floyd Miles', image: images.avatars['9'], rank: 33, prevRank: 3},
  {name: 'Annete Black', image: images.avatars['1'], rank: 34, prevRank: 27},
  {name: 'Ralph Walker', image: images.avatars['2'], rank: 35, prevRank: 13},
];

const RankList = () => {
  const activeIndex = 10;
  const scrollY = useSharedValue(0);
  const {onLayout, height} = useLayout();

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {y}}) => {
      scrollY.value = y;
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text size="xl" color="black" weight="medium" style={styles.title}>
        Leader Board
      </Text>
      <View style={styles.container} onLayout={onLayout}>
        <Animated.ScrollView
          bounces={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          onLayout={onLayout}>
          {data.map((item, index) => {
            if (index === activeIndex) {
              return (
                <ActiveItem
                  key={index}
                  item={item}
                  scrollY={scrollY}
                  viewportHeight={height}
                />
              );
            }
            return <Item key={index} item={item} />;
          })}
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default RankList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    alignSelf: 'center',
    marginTop: spacing.s,
    marginBottom: spacing.s,
  },
});
