import React, {useCallback, useEffect} from 'react';
import {EventArg} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Account, SignupResponse, useMutableAccount} from 'api/account';
import {Endpoint} from 'api/endpoint';
import {useQuery} from 'api/useQuery';
import {Box} from 'components/Box';
import {LoadingView} from 'components/LoadingView';
import {ToastType} from 'components/toast/Toast';
import {useToast} from 'components/toast/ToastProvider';
import {useRootNavigation} from 'navigation/RootNavigator';
import {WelcomeRoute} from 'navigation/welcome/welcomeRoutes';

interface Props {
  navigation: StackNavigationProp<WelcomeRoute, 'CreateGuestAccount'>;
}

export const CreateGuestAccountScreen = ({navigation}: Props) => {
  const {showToast} = useToast();
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
      showToast({message: error.message, type: ToastType.error});
      navigation.pop();
    }
  }, [error, navigation]);

  const beforeRemove = useCallback(
    (e: EventArg<'beforeRemove', true, any>) => {
      if (!error) {
        e.preventDefault();
      }
    },
    [error],
  );

  useEffect(() => {
    return navigation.addListener('beforeRemove', beforeRemove);
  }, [navigation, beforeRemove]);

  return (
    <Box flex={1} backgroundColor="background">
      <LoadingView message="Creating guest account" />
    </Box>
  );
};
