import React, {useCallback} from 'react';
import {Pressable} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import Glyph from 'assets/images/glyph.svg';
import {Box} from 'components/Box';
import {Text} from 'components/Text';
import {WelcomeRoute} from 'navigation/welcome/welcomeRoutes';
import {Feature, hasFeature} from 'utilities/features';

const Button = ({label, onPress}: {label: string; onPress: () => void}) => {
  return (
    <Box padding="s" width="100%">
      <Pressable onPress={onPress}>
        {({pressed}) => (
          <Box
            minHeight={44}
            width="100%"
            backgroundColor={pressed ? 'secondaryTransparent' : 'secondary'}
            alignItems="center"
            justifyContent="center"
            borderRadius="m">
            <Text variant="body" color={pressed ? 'textSecondary' : 'textPrimary'}>
              {label}
            </Text>
          </Box>
        )}
      </Pressable>
    </Box>
  );
};

interface Props {
  navigation: StackNavigationProp<WelcomeRoute, 'Welcome'>;
}

export const WelcomeScreen = ({navigation}: Props) => {
  const canPlayOnline = hasFeature(Feature.accounts);
  const canPlayAsGuest = hasFeature(Feature.guestMode);
  const canPlayOffline = hasFeature(Feature.offlineMode);

  const onPlayOnline = useCallback(() => {
    console.log('TODO: open login');
  }, []);

  const onCreateGuestAccount = useCallback(() => {
    navigation.navigate('CreateGuestAccount');
  }, []);

  const onPlayOffline = useCallback(() => {
    console.log('TODO: play offline');
  }, []);

  const onOpenSettings = useCallback(() => {
    console.log('TODO: open settings');
  }, []);

  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="background"
      paddingHorizontal="xxl"
      paddingVertical="xxl">
      <Box paddingBottom="s" width="100%">
        <Glyph width="100%" />
      </Box>

      {canPlayOnline ? <Button label="Play online" onPress={onPlayOnline} /> : null}
      {canPlayAsGuest ? <Button label="Play as guest" onPress={onCreateGuestAccount} /> : null}
      {canPlayOffline ? <Button label="Play offline" onPress={onPlayOffline} /> : null}
      <Button label="Settings" onPress={onOpenSettings} />
    </Box>
  );
};
