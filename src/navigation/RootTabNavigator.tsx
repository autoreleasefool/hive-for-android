import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Box} from 'components/Box';
import {Text} from 'components/Text';
import {Feature, hasFeature} from 'utilities/features';
import {RootTab} from './rootTab';
import {SpectatorNavigator} from './spectator/SpectatorNavigator';

const Tab = createBottomTabNavigator<RootTab>();

const EmptyTab = () => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text variant="header">Content unavailable</Text>
    </Box>
  );
};

export const RootTabNavigator = () => {
  const showLobby = hasFeature(Feature.lobbyTab);
  const showSpectator = hasFeature(Feature.spectatorTab);
  const showHistory = hasFeature(Feature.historyTab);
  const showProfile = hasFeature(Feature.profileTab);

  return (
    <Tab.Navigator>
      {showLobby ? <Tab.Screen name="Lobby" component={EmptyTab} /> : null}
      {showSpectator ? <Tab.Screen name="Spectating" component={SpectatorNavigator} /> : null}
      {showHistory ? <Tab.Screen name="History" component={EmptyTab} /> : null}
      {showProfile ? <Tab.Screen name="Profile" component={EmptyTab} /> : null}
    </Tab.Navigator>
  );
};
