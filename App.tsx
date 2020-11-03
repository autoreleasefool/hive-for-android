import React from 'react';
import {useColorScheme} from 'react-native';
import {ThemeProvider} from '@shopify/restyle';
import {Box, Text} from 'components';
import {theme as lightTheme, darkTheme} from 'utilities/theme';

const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text variant="body">Hive for Android</Text>
      </Box>
    </ThemeProvider>
  );
};

export default App;
