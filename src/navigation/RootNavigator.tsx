import React, {ReactNode, createContext, useContext, useState} from 'react';

type RootScreen = 'welcome' | 'app';

interface RootScreenContext {
  currentScreen: RootScreen;
  navigate(screen: RootScreen): void;
}

const RootNavigatorContext = createContext<RootScreenContext>({
  currentScreen: 'welcome',
  navigate: (_: RootScreen) => {},
});

interface RootNavigatorProps {
  screens: {
    [key in RootScreen]: ReactNode;
  };
}

export const RootNavigator = ({screens}: RootNavigatorProps) => {
  const [currentScreen, setCurrentScreen] = useState<RootScreen>('welcome');

  return (
    <RootNavigatorContext.Provider
      value={{
        currentScreen: currentScreen,
        navigate: screen => {
          console.log(`[RootNavigator] navigating to ${screen}`);
          setCurrentScreen(screen);
        },
      }}>
      {screens[currentScreen]}
    </RootNavigatorContext.Provider>
  );
};

export const useRootNavigation = () => {
  return useContext(RootNavigatorContext);
};
