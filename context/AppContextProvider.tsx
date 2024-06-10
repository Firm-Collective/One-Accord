import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  const [isMapVisible, setIsMapVisible] = useState(true);
  const { currentTimeLeft, currentActivityIndex } = calculateTimeLeftAndActivity();
  const [timeLeft, setTimeLeft] = useState(currentTimeLeft);
  const activities: Activity[] = [
    { id: 1, name: 'Worship', icon: '/worship-icon.png', timeLeft: 0 },
    {
      id: 2,
      name: 'Prayer',
      icon: '/praying-icon.png',
      timeLeft: 0,
      text: `Heavenly Father,
      We come before You today, seeking unity among us as Your children. As Psalm 133:1 declares, "How good and pleasant it is when God’s people live together in unity!" Lord, help us to embody this truth, living in harmony and love. Guide us to follow the words of Ephesians 4:3, making every effort to keep the unity of the Spirit through the bond of peace. May we be of one mind, as Christ prayed in John 17:21, that all of us may be one, just as You are in Him and He is in You. Bind us together with cords of love that cannot be broken, and may Your peace rule in our hearts, as members of one body, we were called to peace. In Jesus’ precious name, we pray. Amen.`,
    },    { id: 3, name: 'Communion', icon: '/Communion-icon.png', timeLeft: 0 },
    { id: 4, name: 'Shofar', icon: '/shofar-icon.png', timeLeft: 0 },
  ];

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
