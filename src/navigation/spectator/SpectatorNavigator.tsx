import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Box} from 'components/Box';
import {Text} from 'components/Text';
import {LobbyListScreen} from 'sections/lobby/screens/LobbyListScreen';
import {SpectatorRoute} from './spectatorRoute';

const Stack = createStackNavigator<SpectatorRoute>();

const EmptyScreen = () => {
  return (
    <Box flex={1}>
      <Text variant="body">Empty</Text>
    </Box>
  );
};

export const SpectatorNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SpectatorLobby"
        component={LobbyListScreen}
        options={{title: 'Spectating'}}
      />
      <Stack.Screen
        name="MatchDetails"
        component={EmptyScreen}
        options={({route}) => {
          const title = (() => {
            if (route.params.match.host?.displayName) {
              return `${route.params.match.host.displayName}'s match`;
            } else {
              return 'Match details';
            }
          })();
          return {title};
        }}
      />
    </Stack.Navigator>
  );
};
