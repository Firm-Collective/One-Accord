import { useState, useEffect } from 'react';

const useCurrentTime = () => {

    const [time, setTime] = useState({ currentTime: '', ampm: '', seconds: 0 });

    useEffect(() => {
      const getTime = () => {
        const date = new Date();
        let hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        setTime({ currentTime: formattedTime, ampm, seconds });
      };
  
      getTime();
      const interval = setInterval(getTime, 1000); // 60000
  
      return () => clearInterval(interval);
    }, []);

    return {
        time
    }
}

export default useCurrentTime;