import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {screenNames} from '../../../constants';

import Landing from '../../screens/landing';
import EnterMobileNumber from '../../screens/enter-mobile-number';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={screenNames.landing}>
      <Stack.Screen name={screenNames.landing} component={Landing} />
      <Stack.Screen
        name={screenNames.enterMobileNumber}
        component={EnterMobileNumber}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
