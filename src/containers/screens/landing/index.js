import React from 'react';
import {StyleSheet} from 'react-native';

import {Body} from '../../../components/atoms';
import SocialButton from './SocialButton';

const EnterMobileNumber = () => {
  return (
    <Body>
      <SocialButton text="Continue with Google" />
      <SocialButton text="Continue with Facebook" />
      <SocialButton text="Continue with Apple" />
      <SocialButton text="Continue with Email" />
    </Body>
  );
};

export default EnterMobileNumber;

const styles = StyleSheet.create({});
