import React, { useState, useEffect } from 'react';

const activities: string[] = ['Praying', 'Worshipping', 'Meditating']; 

const CountdownTimer: React.FC = () => {
  const [currentActivityIndex, setCurrentActivityIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0.1 * 60); 

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime: number) => {
        if (prevTime === 0) {
          // Move to the next activity
          setCurrentActivityIndex((prevIndex: number) => (prevIndex + 1) % activities.length);
          return 0.1 * 60; 
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number): string => {
    const minutes: number = Math.floor(time / 60);
    const seconds: number = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <h2>Current Activity: {activities[currentActivityIndex]}</h2>
      <br />
      <div>Time Remaining: {formatTime(timeLeft)}</div>
      <br />
    </div>
  );
};

export default CountdownTimer;
