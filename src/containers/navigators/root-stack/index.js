import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {screenNames} from '../../../constants';

import Test from '../../screens/test';
import Reflectly from '../../screens/refectly';
import UberEats from '../../screens/uber-eats';
import Tesla from '../../screens/tesla';
import ThreeDEffect from '../../screens/ThreeDEffect';
import CursorFollower from '../../screens/cursor-follower';
import RankList from '../../screens/rank-list';
import MacDock from '../../screens/mac-dock';
import Rope from '../../screens/rope';
import IOSHome from '../../screens/ios-home';
import Carousel from '../../screens/carousel';
import CreditScore from '../../screens/credit-score';
import Stack3d from '../../screens/3dNavigation1';
import {StopWatch} from '../../screens/StopWatch';
import {ScaleList} from '../../screens/ScaleList';
import {Animations} from '../../screens/Conference/animations';

import {AnimalCarouselWithWidth} from '../../screens/Conference/AnimalCarousel';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={screenNames.test}>
      <Stack.Screen name={screenNames.test} component={ScaleList} />
    </Stack.Navigator>
  );
};

export default RootStack;
