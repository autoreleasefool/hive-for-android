import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';

import {Endpoint} from 'api/endpoint';
import {useQuery} from 'api/useQuery';
import {LoadingView} from 'components/LoadingView';
import {useRootNavigation} from 'navigation/RootNavigator';
import {WelcomeRoute} from 'navigation/welcome/welcomeRoutes';

interface Props {
  navigation: StackNavigationProp<WelcomeRoute, 'CreateGuestAccount'>;
}

export const CreateGuestAccountScreen = ({navigation}: Props) => {
  const rootNavigation = useRootNavigation();
  const {data, error, isLoading} = useQuery({endpoint: Endpoint.createGuestAccount});

  useEffect(() => {
    if (data) {
      rootNavigation.navigate('Content');
    }
  }, [data, rootNavigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });

    return unsubscribe;
  }, [navigation]);

  const message = isLoading
    ? 'Loading'
    : data
    ? 'Loaded!'
    : error
    ? JSON.stringify(error.type)
    : 'wtf';

  return <LoadingView message={message} title="Creating guest accoun" />;
};
