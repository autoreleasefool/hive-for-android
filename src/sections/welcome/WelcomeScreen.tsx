import React, {useCallback} from 'react';
import {Pressable} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Box, Text} from 'components';
import Glyph from 'assets/images/glyph.svg';

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
            <Text variant="body" color={pressed ? 'textContrastingSecondary' : 'textContrasting'}>
              {label}
            </Text>
          </Box>
        )}
      </Pressable>
    </Box>
  );
};

export const WelcomeScreen = () => {
  const onPlayOnline = useCallback(() => {
    console.log('TODO: open login');
  }, []);

  const onCreateGuestAccount = useCallback(() => {
    console.log('TODO: create guest account');
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
      <Button label="Play online" onPress={onPlayOnline} />
      <Button label="Play as guest" onPress={onCreateGuestAccount} />
      <Button label="Play offline" onPress={onPlayOffline} />
      <Button label="Settings" onPress={onOpenSettings} />
    </Box>
  );
};
