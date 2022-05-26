import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {spacing} from '../../../theme';

const Body = ({children, px = spacing.s, py = spacing.s, style, ...props}) => {
  return (
    <SafeAreaView style={[styles.container(px, py), style]} {...props}>
      {children}
    </SafeAreaView>
  );
};

export default Body;

const styles = StyleSheet.create({
  container: (px, py) => ({
    flex: 1,
    paddingHorizontal: px,
    paddingVertical: py,
  }),
});
