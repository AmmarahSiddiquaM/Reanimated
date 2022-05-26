import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {colors} from '../../theme';
import {navigationRef} from '../../utils/navigation';

import RootStack from './root-stack';
import AuthStack from './auth-stack';

export const navTheme = {
  colors: {
    background: colors.background,
  },
};

const Navigator = () => {
  return (
    <NavigationContainer theme={navTheme} ref={navigationRef}>
      <RootStack />
    </NavigationContainer>
  );
};

export default Navigator;
