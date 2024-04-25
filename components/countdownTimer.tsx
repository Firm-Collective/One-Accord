'use client';
import { useState, useEffect } from 'react';
import ActivityJoinButton from './activityIconButton';
import Image from 'next/image';

type Activity = {
  id: number;
  name: string;
  icon: string;
  timeLeft: number;
};

const activities: Activity[] = [
  { id: 1, name: 'Shofar', icon: '/shofar-icon.svg', timeLeft: 0 },
  { id: 2, name: 'Worship', icon: '/worship-icon.svg', timeLeft: 0 },
  { id: 3, name: 'Prayer', icon: '/praying-icon.svg', timeLeft: 0 },
  { id: 4, name: 'Communion', icon: '/Communion-icon.svg', timeLeft: 0 },
];

const CountdownTimer: React.FC = () => {
  const [currentActivityIndex, setCurrentActivityIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(10); // 15 minutes in second is 900

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setTimeLeft(10);
      setCurrentActivityIndex((prevIndex) => (prevIndex + 1) % activities.length);
    }
  }, [timeLeft, currentActivityIndex]);

  const formatTime = (time: number): string => {
    const minutes: number = Math.floor(time / 60);
    const seconds: number = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
    
      <div className='flex flex-col items-center justify-center mb-5 container mx-auto'>
        <div className='grid grid-cols-1 md:w-full'>
          <div
            className='rounded-2xl shadow-lg p-8 relative'
            // style={{
            //   backgroundImage: `url('/background-world.png')`,
            //   backgroundSize: 'cover',                   This is just for the background image.
            //   backgroundPosition: 'center',
            //   height: '500px',
            // }}
          >
            <div className='absolute top-3 left-3 text-lg text-black md:text-2xl font-medium'>
              <Image src='/one-accord.webp' alt='logo' width={293} height={48} />
            </div>
            <br />
            <h1 className='text-green-300 text-center'>
              (Team Green) put your map here
              <br /> Replace the h1 <br />
              With your Component. <br/>
              It will be in components/CountdownTimer.tsx<br/>
              line 66-72.
            </h1>
          </div>
        </div>

        <div className='w-full flex justify-end p-3 bg-white rounded-b-2xl shadow-lg'>
          <div className='flex-grow'>
          <div className="text-black">{formatTime(timeLeft)}</div>
            <h2 className='text-left text-black pt-5'>
              Take action and join in OneAccord!
            </h2>
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
        <p className="text-black">
          (Team White) can put there <br/>
          component here at components/countdownTimer.tsx <br />
          line 93-97.
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;
