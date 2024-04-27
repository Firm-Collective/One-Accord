'use client';
import { useState, useEffect } from 'react';
import ActivityJoinButton from './activityIconButton';
import Image from 'next/image';
import { useCountDownTimer } from './hooks';

const CountdownTimer: React.FC = () => {
  const [currentActivityIndex, setCurrentActivityIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(10); // 15 minutes in second is 900
  const { activities, formatTime } = useCountDownTimer();

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setTimeLeft(10);
      setCurrentActivityIndex((prevIndex) => (prevIndex + 1) % activities.length);
    }
  }, [timeLeft, currentActivityIndex]);

  return (
    <div className='w-full flex justify-end p-3 bg-white rounded-b-2xl shadow-lg'>
      <div className='flex-grow'>
        <div className='text-black'>{formatTime(timeLeft)}</div>
        <h2 className='text-left text-black pt-5'>Take action and join in OneAccord!</h2>
      </div>
      <div>
        <ActivityJoinButton
          key={activities[currentActivityIndex].id}
          activityId={activities[currentActivityIndex].id}
          activityIcon={activities[currentActivityIndex].icon}
          isActive={true}
          timeLeft={timeLeft}
          activityName={activities[currentActivityIndex].name}
        />
      </div>
    </div>
  );
};

export default CountdownTimer;
