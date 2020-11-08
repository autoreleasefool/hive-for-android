import React, {ComponentProps} from 'react';
import {ActivityIndicator as RNActivityIndicator} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Theme} from 'utilities/theme';

interface Props extends ComponentProps<typeof RNActivityIndicator> {
  color: keyof Theme['colors'];
}

export const ActivityIndicator = ({color = 'backgroundLight', ...props}: Props) => {
  const theme = useTheme<Theme>();

  return <RNActivityIndicator {...props} color={theme['colors'][color]} />;
};
