import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Coffees from '../../screens/Coffees';
import Books from '../../screens/Books';
import PlayingCards from '../../screens/PlayingCards';

const RNDrawer = createDrawerNavigator();

const Drawer = () => {
  return (
    <RNDrawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Carousel">
      <RNDrawer.Screen name="Coffee List" component={Coffees} />
      <RNDrawer.Screen name="Books App" component={Books} />
      <RNDrawer.Screen name="Playing Cards" component={PlayingCards} />
    </RNDrawer.Navigator>
  );
};

export default Drawer;
