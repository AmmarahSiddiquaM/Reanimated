import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {screenNames} from '../../../constants';

import Test from '../../screens/test';
import Home from '../../screens/home';
import Reflectly from '../../screens/refectly';
import UberEats from '../../screens/uber-eats';
import Tesla from '../../screens/tesla';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={screenNames.test}>
      <Stack.Screen name={screenNames.home} component={Home} />
      <Stack.Screen name={screenNames.test} component={Tesla} />
    </Stack.Navigator>
  );
};

export default RootStack;
