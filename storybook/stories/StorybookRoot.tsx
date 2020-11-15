import React from 'react';
import {ThemeProvider} from '@shopify/restyle';
import {getStorybookUI} from '@storybook/react-native';
import {Box} from 'components/Box';
import {theme} from 'utilities/theme';

const StorybookUIRoot = getStorybookUI({asyncStorage: null});

const StorybookRoot = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box flex={1} backgroundColor="background">
        <StorybookUIRoot />
      </Box>
    </ThemeProvider>
  );
};

const Component = <StorybookRoot />;
export default Component;
