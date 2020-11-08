import React from 'react';
import {ActivityIndicator} from './ActivityIndicator';
import {Box} from './Box';
import {Text} from './Text';

interface Props {
  title?: string;
  message?: string;
}

export const LoadingView = ({title, message}: Props) => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      {title ? (
        <Text variant="subheader" paddingBottom="m" paddingHorizontal="m">
          {title}
        </Text>
      ) : null}
      {message ? (
        <Text variant="body" paddingBottom="m" paddingHorizontal="m">
          {message}
        </Text>
      ) : null}
      <ActivityIndicator color="textSecondary" />
    </Box>
  );
};
