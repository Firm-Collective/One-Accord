import { useState, useEffect } from 'react';

type Activity = {
    id: number;
    name: string;
    icon: string;
    timeLeft: number;
  };


const useCurrentActivity = () => {

  const [currentActivityIndex, setCurrentActivityIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(10); // 15 minutes in second is 900

  const activities: Activity[] = [
    { id: 1, name: 'Shofar', icon: '/shofar-icon.svg', timeLeft: 0 },
    { id: 2, name: 'Worship', icon: '/worship-icon.svg', timeLeft: 0 },
    { id: 3, name: 'Prayer', icon: '/praying-icon.svg', timeLeft: 0 },
    { id: 4, name: 'Communion', icon: '/Communion-icon.svg', timeLeft: 0 },
  ];

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setTimeLeft(10);
      setCurrentActivityIndex((prevIndex) => (prevIndex + 1) % activities.length);
    }
  }, [timeLeft]);

  const circumference = 2 * Math.PI * 23;
  const offset = ((timeLeft - 10) / 10) * circumference;

    return {
        circumference, offset, activities, currentActivityIndex
    }
}

export default useCurrentActivity;