import React from 'react';
import {Pressable, StyleSheet} from 'react-native';

import {Text} from '../../../components/atoms';

const SocialButton = ({text, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text size="l">{text}</Text>
    </Pressable>
  );
};

export default SocialButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
  },
});
