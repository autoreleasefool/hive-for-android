import React from 'react';
import {useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import {Text} from 'components/Text';
import {Toast} from 'components/toast/Toast';
import {ToastProvider} from 'components/toast/ToastProvider';
import {RootNavigator} from 'navigation/RootNavigator';
import {WelcomeNavigator} from 'navigation/welcome/WelcomeNavigator';
import {theme as lightTheme, darkTheme} from 'utilities/theme';

const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <ToastProvider>
          <NavigationContainer>
            <RootNavigator
              screens={{
                Content: () => <Text>Cool</Text>,
                Welcome: WelcomeNavigator,
              }}
            />
            <Toast />
          </NavigationContainer>
        </ToastProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
