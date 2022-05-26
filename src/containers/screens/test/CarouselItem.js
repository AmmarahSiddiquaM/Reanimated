import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Text} from '../../../components/atoms';
import {colors, spacing} from '../../../theme';

const CarouselItem = ({tab, activeIndex, index}) => {
  return (
    <View style={styles.container}>
      <View style={styles.carouselItem}>
        <Icon name={tab.icon} color={colors.white} size={40} />
        <Text color={colors.white} style={{marginTop: spacing.l}}>
          {tab.name}
        </Text>
      </View>
    </View>
  );
};

export default CarouselItem;

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.s,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  carouselItem: {
    borderRadius: 4,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '100%',
    backgroundColor: '#2A2A2A',
    marginTop: spacing.s,
  },
});
