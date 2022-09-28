import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Icon, Text} from '../../../components/atoms';
import {spacing} from '../../../theme';

const Item = ({item, index}) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameContainer}>
        <Avatar source={item.image} />
        <Text weight="medium" style={styles.name}>
          {item.name}
        </Text>
      </View>
      <View style={styles.nameContainer}>
        <Text weight="medium">{item.rank}</Text>
        <Icon
          name={item.prevRank - item.rank > 0 ? 'rank-up' : 'rank-down'}
          size={14}
          style={styles.icon}
          useIconColor
        />
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.s,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginLeft: spacing.s,
  },
  icon: {
    marginLeft: spacing.s,
  },
});
