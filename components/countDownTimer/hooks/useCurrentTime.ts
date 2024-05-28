import { useState, useEffect } from 'react';

type Props = {
  timeLeft: number;
};

type Time = {
  minutes: number;
  seconds: number;
};

const useCurrentTime = ({timeLeft} : Props) => {

  const [time, setTime] = useState<Time>({ minutes: 0, seconds: 0 });
  const [currentTime, setCurrentTime] = useState({ time: '', ampm: '', seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const mins = Math.floor(timeLeft / 60);
      const secs = timeLeft % 60;

      setTime({ minutes: mins, seconds: secs });

    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);



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

    return {
        time,
        currentTime
    }
}

export default useCurrentTime;