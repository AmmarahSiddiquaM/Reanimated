import React from 'react';
import {StyleSheet, View} from 'react-native';
import {interpolate, useAnimatedProps} from 'react-native-reanimated';
import {Text} from '../../../../components/atoms';
import AnimateableText from '../../../../components/atoms/animateable-text';
import {toDecimal} from '../../../../utils/number';
import {COFFEE_IMAGE__SIZE, COFFEE_NAME_HEIGHT} from '../constants';

const ScrollText = ({activeIndex}) => {
  const animatedScrollXTextProps = useAnimatedProps(() => ({
    text: `${activeIndex.value.toFixed(2)}`,
  }));

  const animatedNamesTextProps = useAnimatedProps(() => ({
    text: `${toDecimal(
      interpolate(activeIndex.value, [0, 1], [0, -COFFEE_NAME_HEIGHT]),
    )}`,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text color="white" weight="bold" size="xxl">
          ActiveIndex:{' '}
        </Text>
        <AnimateableText
          style={styles.text}
          size="xxl"
          color="white"
          animatedProps={animatedScrollXTextProps}
        />
      </View>
      <View style={styles.row}>
        <Text color="white" weight="bold" size="xxl">
          Names TranslateY:{' '}
        </Text>
        <AnimateableText
          style={styles.text}
          size="xxl"
          color="white"
          animatedProps={animatedNamesTextProps}
        />
      </View>
    </View>
  );
};

export default ScrollText;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    bottom: 60,
  },
  row: {
    flexDirection: 'row',
  },
});
