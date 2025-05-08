import React, { createContext, useContext, useState } from 'react';

type Screen = 'main' | 'order' | 'additional';

interface ScreenContextType {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
  resetToMain: () => void;
}

const ScreenContext = createContext<ScreenContextType | undefined>(undefined);

export const ScreenProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');

  const setScreen = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const resetToMain = () => {
    setCurrentScreen('main');
  };

  return (
    <ScreenContext.Provider value={{ currentScreen, setScreen, resetToMain }}>
      {children}
    </ScreenContext.Provider>
  );
};

export const useScreen = () => {
  const context = useContext(ScreenContext);
  if (!context) {
    throw new Error('useScreen must be used within a ScreenProvider');
  }
  return context;
}; 