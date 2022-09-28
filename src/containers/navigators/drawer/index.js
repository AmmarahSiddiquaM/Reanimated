import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

const RNDrawer = createDrawerNavigator();

const Drawer = () => {
  return (
    <RNDrawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={screenNames.test}>
      <Drawer.Screen name={screenNames.test} component={MacDock} />
    </RNDrawer.Navigator>
  );
};

export default Drawer;
