'use client';
import CurrentTime from './currentTime';
import CurrentActivity from './currentActivity';
import useCountDownTimer from './hooks/useCountDownTimer';

const CountDownTimer: React.FC = () => {
  const { timeLeft, currentActivityIndex } = useCountDownTimer();
  return (
    <div>
      <div className='flex w-[393px] items-start gap-[130px] pl-[11px] pr-[8px] pt-[10px] pb-[5px] bg-white rounded-[10px_10px_0px_0px] border-t [border-top-style:solid] border-b-[0.3px] [border-bottom-style:solid] border-[#a9a9a9] max-h-[80px]'>
        {/* Timer */}
        <CurrentTime timeLeft={timeLeft} />

        {/* Icon*/}
        <CurrentActivity timeLeft={timeLeft} currentActivityIndex={currentActivityIndex} />
      </div>
    </div>
  );
};

export default CountDownTimer;
