import React, {createContext, ReactNode, useContext, useState} from 'react';

type RootScreen = 'Welcome' | 'Content';

interface RootScreenContext {
  currentScreen: RootScreen;
  navigate(screen: RootScreen): void;
}

const RootNavigatorContext = createContext<RootScreenContext>({
  currentScreen: 'Welcome',
  navigate: (_: RootScreen) => {},
});

export const RootNavigator = ({screens}: {screens: {[key in RootScreen]: () => ReactNode}}) => {
  const [currentScreen, setCurrentScreen] = useState<RootScreen>('Welcome');

  return (
    <RootNavigatorContext.Provider
      value={{
        currentScreen: currentScreen,
        navigate: screen => {
          console.log(`[RootNavigator] navigating to ${screen}`);
          setCurrentScreen(screen);
        },
      }}>
      {screens[currentScreen]()}
    </RootNavigatorContext.Provider>
  );
};

export const useRootNavigation = () => {
  return useContext(RootNavigatorContext);
};
