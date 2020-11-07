import React from 'react';
import {useColorScheme} from 'react-native';
import {ThemeProvider} from '@shopify/restyle';
import {NavigationContainer} from '@react-navigation/native';

import {Text} from 'components';
import {RootNavigator} from 'navigation/RootNavigator';
import {theme as lightTheme, darkTheme} from 'utilities/theme';
import {WelcomeNavigator} from 'navigation/welcome/WelcomeNavigator';

const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <RootNavigator
          screens={{
            Content: () => <Text>Cool</Text>,
            Welcome: WelcomeNavigator,
          }}
        />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
