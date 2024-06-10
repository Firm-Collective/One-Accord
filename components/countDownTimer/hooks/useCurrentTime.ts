import { useState, useEffect } from 'react';

type Time = {
  minutes: number;
  seconds: number;
};

type Props = {
  timeLeft: number;
};

const useCurrentTime = ({ timeLeft }: Props) => {
  const [currentTime, setCurrentTime] = useState({ time: '', ampm: '', seconds: 0 });
  const initialTime: Time = {
    minutes: Math.floor(timeLeft / 60),
    seconds: timeLeft % 60,
  };

  const [currentTimeLeft, setCurrentTimeLeft] = useState<Time>(initialTime);

  useEffect(() => {
    const getTime = () => {
      const date = new Date();
      let hours = date.getHours();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      setCurrentTime({ time: formattedTime, ampm, seconds });
    };

    getTime();
    const interval = setInterval(getTime, 1000); // 60000

    return () => clearInterval(interval);
  }, []);

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

  return {
    currentTime,
    currentTimeLeft,
  };
};

export default useCurrentTime;
