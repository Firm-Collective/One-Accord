import React from 'react';
import useCurrentTime from './hooks/useCurrentTime';

type Props = {
  timeLeft: number;
};

export default function CurrentTime({ timeLeft }: Props) {
  const { time, currentTime } = useCurrentTime({ timeLeft });
  return (
    <div className='mt-2 items-start gap-[10px] pt-[6px] pb-[5px] px-[20px] bg-white inline-flex flex-col  flex-[0_0_auto]'>
      <p className="mb-5 w-[80px] h-[16px] mt-[-1.00px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#272727] text-[16px] tracking-[0] leading-[0.1px]">
        <span className="[font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#272727] text-[18px] tracking-[0] leading-[0.1px]">
          {currentTime.time}
        </span>
        <span className='text-[12px]'>{currentTime.ampm} </span>
      </p>
      <p className="mb-5 w-[80px] h-[16px] mt-[-1.00px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#272727] text-[16px] tracking-[0] leading-[0.1px]">
        <span className="[font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#272727] text-[18px] tracking-[0] leading-[0.1px]">
          {time.minutes < 10 ? `0${time.minutes}` : time.minutes}
        </span>
        <span className='text-[12px]'> {time.seconds < 10 ? `0${time.seconds}` : time.seconds} </span>
      </p>
      <p className=" w-[226px] h-[12px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#272727] text-[12px] tracking-[0] leading-[0.1px]">
        Take action and join in One Accord!
      </p>
    </div>
  );
}
