import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {colors} from '../../theme';
import {navigationRef} from '../../utils/navigation';

import Drawer from './drawer';

export const navTheme = {
  colors: {
    background: colors.background,
  },
};

const Navigator = () => {
  return (
    <NavigationContainer theme={navTheme} ref={navigationRef}>
      <Drawer />
    </NavigationContainer>
  );
};

export default Navigator;
