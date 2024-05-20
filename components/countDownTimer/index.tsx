'use client';
import CurrentTime from './currentTime';
import CurrentActivity from './currentActivity';

const CountDownTimer: React.FC = () => {
  

  return (
    <div className='container'>
      <div className='flex w-[393px] items-start gap-[2px] pl-[11px] pr-[8px] pt-[10px] pb-[5px]  bg-white rounded-[10px_10px_0px_0px] border-t [border-top-style:solid] border-b-[0.3px] [border-bottom-style:solid] border-[#a9a9a9]'>
        {/* Timer */}
        <CurrentTime />

        {/* Icon*/}
        <CurrentActivity /> 
      </div>
    </div>
  );
};

export default CountDownTimer;