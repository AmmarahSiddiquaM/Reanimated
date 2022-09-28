import React from 'react';
import {StyleSheet, View} from 'react-native';
import {images} from '../../../../assets/images';
import BookItem from './BookItem';
import {FlatList} from 'react-native-gesture-handler';
import {Text} from '../../../../components/atoms';
import {spacing} from '../../../../theme';

const BOOKS = [
  {
    name: 'George Orwell',
    image: images.nav3d[3],
  },
  {
    name: 'Sherlock Holmes',
    image: images.nav3d[4],
  },
  {
    name: 'Tanik',
    image: images.nav3d[5],
  },
  {
    name: 'Gruesome Dad',
    image: images.nav3d[6],
  },
  {
    name: 'Kizil Dozya',
    image: images.nav3d[7],
  },
];

const PopularBooks = () => {
  const renderItem = ({item}) => <BookItem item={item} />;
  return (
    <>
      <View style={styles.row}>
        <Text size="xl" weight="bold" style={styles.title}>
          Top Authors
        </Text>
        <Text style={styles.seeall} color="gray">
          see all
        </Text>
      </View>
      <FlatList
        style={styles.flatlist}
        ItemSeparatorComponent={() => <View style={styles.itemSeperator} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={BOOKS}
        renderItem={renderItem}
      />
    </>
  );
};

export default PopularBooks;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.m,
    marginTop: spacing.m,
  },
  seeall: {
    textDecorationLine: 'underline',
  },
  flatlist: {
    paddingLeft: spacing.m,
    marginTop: spacing.m,
    flexGrow: 0,
  },
  itemSeperator: {
    width: spacing.s,
  },
});
