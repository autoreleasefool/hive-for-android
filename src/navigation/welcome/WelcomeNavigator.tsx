import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {CreateGuestAccountScreen} from 'sections/account/screens/CreateGuestAccountScreen';
import {WelcomeScreen} from 'sections/welcome/screens/WelcomeScreen';

import {WelcomeRoute} from './welcomeRoutes';

const Stack = createStackNavigator<WelcomeRoute>();

export const WelcomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="CreateGuestAccount" component={CreateGuestAccountScreen} />
    </Stack.Navigator>
  );
};
