import { useState, useEffect } from 'react';

const useCountDownTimer = () => {
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

  const [timeLeft, setTimeLeft] = useState<number>(currentTimeLeft);

  return {
    timeLeft,
    currentActivityIndex,
  };
};

export default useCountDownTimer;
