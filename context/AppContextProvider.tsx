import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {activities} from '@/utils/data/activities';
interface Activity {
  id: number;
  name: string;
  icon: string;
  timeLeft: number;
  text?: string
};

interface AppContextProps {
  isMapVisible: boolean;
  setIsMapVisible: (visible: boolean) => void;
  timeLeft: number;
  currentActivityIndex: number;
  activities: Activity[]
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

const calculateTimeLeftAndActivity = () => {
  const now = new Date();
  const minutes = now.getMinutes();
  
  let currentTimeLeft = 0;
  let currentActivityIndex = 0;

  if (minutes < 15) {
    currentActivityIndex = 0; // Worship
    currentTimeLeft = (15 - minutes) * 60;
  } else if (minutes < 30) {
    currentActivityIndex = 1; // Prayer
    currentTimeLeft = (30 - minutes) * 60;
  } else if (minutes < 45) {
    currentActivityIndex = 2; // Communion
    currentTimeLeft = (45 - minutes) * 60;
  } else {
    currentActivityIndex = 3; // Shofar
    currentTimeLeft = (60 - minutes) * 60;
  }

  return { currentTimeLeft, currentActivityIndex };
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const { currentTimeLeft, currentActivityIndex } = calculateTimeLeftAndActivity();
  const [timeLeft, setTimeLeft] = useState(currentTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <AppContext.Provider value={{ isMapVisible, setIsMapVisible, timeLeft, currentActivityIndex, activities }}>
      {children}
    </AppContext.Provider>
  );
};
