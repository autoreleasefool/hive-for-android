import React from 'react';
import {useColorScheme} from 'react-native';
import {ThemeProvider} from '@shopify/restyle';
import {NavigationContainer} from '@react-navigation/native';
import {theme as lightTheme, darkTheme} from 'utilities/theme';
import {RootNavigator} from 'navigation/RootNavigator';
import {WelcomeScreen} from 'sections/welcome/WelcomeScreen';

const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const appScreen = <WelcomeScreen />;
  const welcomeScreen = <WelcomeScreen />;

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <RootNavigator
          screens={{
            welcome: welcomeScreen,
            app: appScreen,
          }}
        />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
