import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {screenNames} from '../../../constants';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate(screenNames.test)}>
        <Text>Go To Test</Text>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
