import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useDerivedValue, useSharedValue} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';

import CoffeeList from './CoffeeList';
import CoffeeNamesList from './CoffeeNamesList';
import {COFFEE_DATA, COFFEE_IMAGE__SIZE} from './constants';
import ScrollText from './ScrollText';

const Coffees = () => {
  const scrollX = useSharedValue(0);
  const activeIndex = useDerivedValue(() => scrollX.value / COFFEE_IMAGE__SIZE);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <CoffeeList
          data={COFFEE_DATA}
          scrollX={scrollX}
          activeIndex={activeIndex}
        />
        <CoffeeNamesList data={COFFEE_DATA} activeIndex={activeIndex} />
        <ScrollText activeIndex={activeIndex} />
      </View>
    </SafeAreaView>
  );
};

export default Coffees;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  text: {
    position: 'absolute',
    bottom: 100,
  },
});
