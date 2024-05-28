import { useState, useEffect } from 'react';

type Activity = {
  id: number;
  name: string;
  icon: string;
  timeLeft: number;
};

type Props = {
  timeLeft: number;
};

type Time = {
  minutes: number;
  seconds: number;
};

const useCurrentActivity = ({ timeLeft }: Props) => {
  const activities: Activity[] = [
    { id: 1, name: 'Worship', icon: '/worship-icon.svg', timeLeft: 0 },
    { id: 2, name: 'Prayer', icon: '/praying-icon.svg', timeLeft: 0 },
    { id: 3, name: 'Communion', icon: '/Communion-icon.svg', timeLeft: 0 },
    { id: 4, name: 'Shofar', icon: '/shofar-icon.svg', timeLeft: 0 },
  ];


  const initialTime: Time = {
    minutes: Math.floor(timeLeft / 60),
    seconds: timeLeft % 60,
  };
  const [currentTimeLeft, setCurrentTimeLeft] = useState<Time>(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimeLeft((prevTimeLeft) => {
        const newSeconds = prevTimeLeft.seconds === 0 ? 59 : prevTimeLeft.seconds - 1;
        const newMinutes = prevTimeLeft.seconds === 0 ? prevTimeLeft.minutes - 1 : prevTimeLeft.minutes;

        if (newMinutes < 0) {
          return { minutes: 15, seconds: 0 };
        } else {
          return { minutes: newMinutes, seconds: newSeconds };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate circumference and offset
  const circumference = 2 * Math.PI * 23;
  const totalSeconds = 15 - currentTimeLeft.minutes * 60 + currentTimeLeft.seconds;
  const offset = ((900 - totalSeconds) / 900) * circumference;

  return { activities, circumference, offset };
};

export default useCurrentActivity;
