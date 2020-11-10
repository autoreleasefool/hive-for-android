import React from 'react';
import {Pressable} from 'react-native';
import {Box} from './Box';
import {Text} from './Text';

interface Props {
  title?: string;
  message?: string;
  action?: {
    title: string;
    onPress: () => void;
  };
}

export const EmptyStateView = ({title, message, action}: Props) => {
  return (
    <Box flex={1} backgroundColor="background">
      <Box flex={1} />
      {title ? (
        <Text variant="subheader" paddingHorizontal="m" paddingBottom="m">
          {title}
        </Text>
      ) : null}
      {message ? (
        <Text variant="body" paddingHorizontal="m" paddingBottom="m">
          {message}
        </Text>
      ) : null}
      {action ? (
        <Pressable onPress={action.onPress}>
          {({pressed}) => (
            <Box
              backgroundColor={pressed ? 'primaryTransparent' : 'primary'}
              margin="m"
              minHeight={44}
              alignItems="center"
              justifyContent="center"
              borderRadius="m">
              <Text variant="body" color={pressed ? 'textSecondary' : 'textPrimary'}>
                {action.title}
              </Text>
            </Box>
          )}
        </Pressable>
      ) : null}
      <Box flex={1} />
    </Box>
  );
};
