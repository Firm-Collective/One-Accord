'use client';
import { useState } from 'react';
import CurrentTime from './currentTime';
import CurrentActivity from './currentActivity';

const CountDownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(900); // 15 minutes in second is 900

  return (
    <div className='container'>
      <div className='flex w-[393px] items-start gap-[2px] pl-[11px] pr-[8px] pt-[10px] pb-[5px]  bg-white rounded-[10px_10px_0px_0px] border-t [border-top-style:solid] border-b-[0.3px] [border-bottom-style:solid] border-[#a9a9a9]'>
        {/* Timer */}
        <CurrentTime timeLeft={timeLeft} />

        {/* Icon*/}
        <CurrentActivity timeLeft={timeLeft} setTimeLeft={setTimeLeft} />
      </div>
    </div>
  );
};

export default CountDownTimer;
