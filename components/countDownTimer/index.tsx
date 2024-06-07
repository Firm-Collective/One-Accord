'use client';

import CurrentTime from './currentTime';
import CurrentActivity from './currentActivity';
import { useAppContext } from '@/context/AppContextProvider';

const CountDownTimer: React.FC = () => {
  const { timeLeft, currentActivityIndex } = useAppContext();

  return (
    <div>
      <div className='flex w-full max-w-[393px] sm:max-w-full items-start gap-[90px] pl-[11px] pr-[8px] pt-[10px] pb-[5px] bg-white rounded-[10px_10px_0px_0px] border-t [border-top-style:solid] border-b-[0.3px] [border-bottom-style:solid] border-[#a9a9a9] max-h-[100px]'>
        {/* Timer */}
        <CurrentTime timeLeft={timeLeft} />

        {/* Icon */}
        <CurrentActivity timeLeft={timeLeft} currentActivityIndex={currentActivityIndex} />
      </div>
    </div>
  );
};

export default CountDownTimer;
