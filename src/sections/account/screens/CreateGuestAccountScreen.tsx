import React, {useEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Account, SignupResponse, useMutableAccount} from 'api/account';
import {Endpoint} from 'api/endpoint';
import {useQuery} from 'api/useQuery';
import {Box} from 'components/Box';
import {LoadingView} from 'components/LoadingView';
import {useRootNavigation} from 'navigation/RootNavigator';
import {WelcomeRoute} from 'navigation/welcome/welcomeRoutes';

interface Props {
  navigation: StackNavigationProp<WelcomeRoute, 'CreateGuestAccount'>;
}

export const CreateGuestAccountScreen = ({navigation}: Props) => {
  const rootNavigation = useRootNavigation();
  const [, setAccount] = useMutableAccount();
  const {data, error} = useQuery<SignupResponse>({
    endpoint: Endpoint.createGuestAccount,
  });

  useEffect(() => {
    if (data?.token) {
      setAccount(new Account(data.token.userId, data.token.token, true));
      rootNavigation.navigate('Content');
    }
  }, [data, setAccount, rootNavigation]);

  useEffect(() => {
    if (error) {
      // TODO: present error message
    }
  }, [error]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Box flex={1} backgroundColor="background">
      <LoadingView message="Creating guest account" />
    </Box>
  );
};
