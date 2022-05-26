import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Icon, Text} from '../../../components/atoms';
import {spacing} from '../../../theme';

const DummyTabButton = ({tabBarLabel, tabBarIcon, index, onMeasure}) => {
  const onLayout = ({
    nativeEvent: {
      layout: {x, width},
    },
  }) => {
    onMeasure(index, {x, width});
  };

  return (
    <View style={styles.tab} onLayout={onLayout}>
      <Icon name={tabBarIcon} style={styles.icon} />
      <Text>{tabBarLabel}</Text>
    </View>
  );
};

export default DummyTabButton;

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    backgroundColor: 'green',
    paddingHorizontal: spacing.s,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: spacing.xs,
  },
});
