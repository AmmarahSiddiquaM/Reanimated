import React from 'react';
import {StyleSheet, View} from 'react-native';

import {Body, Text, TextInput} from '../../../components/atoms';

import {spacing} from '../../../theme';

const EnterMobileNumber = () => {
  return (
    <Body>
      <Text weight="medium" size="xxxl">
        Enter your{'\n'}mobile number
      </Text>
      <Text style={styles.subText}>We will send you a confirmation code</Text>
      <View style={styles.textInputContainer}>
        <Text size="xxl" weight="medium">
          +91
        </Text>
        <TextInput
          size="xxl"
          weight="medium"
          keyboardType="phone-pad"
          placeholder="0000000000"
          style={styles.textInput}
        />
      </View>
    </Body>
  );
};

export default EnterMobileNumber;

const styles = StyleSheet.create({
  subText: {
    marginTop: spacing.s,
    marginBottom: spacing.xl,
  },
  textInputContainer: {
    flexDirection: 'row',
  },
  textInput: {
    marginLeft: spacing.xs,
    flex: 1,
  },
});
