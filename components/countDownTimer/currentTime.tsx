import React, { useState, useEffect } from 'react';
import useCurrentTime from './hooks/useCurrentTime';

type Props = {
  timeLeft: number;
};

export default function CurrentTime({ timeLeft }: Props) {
  const { currentTime, currentTimeLeft } = useCurrentTime({ timeLeft });

  return (
    <div className='mt-2 mb-2 items-start pt-[10px] pb-[10px] px-[20px] bg-tranparent inline-flex flex-col  flex-[0_0_auto]'>
      <p className="mb-5 w-[80px] h-[16px] mt-[-1.00px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#272727] text-[16px] tracking-[0] leading-[0.1px]">
        <span className="[font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#272727] text-[18px] tracking-[0] leading-[0.1px]">
          {currentTime.time}
        </span>
        <span className='text-[12px]'>{currentTime.ampm} </span>
      </p>
      <p className="mb-5 w-[auto] h-[16px] mt-[-1.00px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#272727] text-[16px] tracking-[0] leading-[0.1px]">
        <span className="[font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#272727] text-[18px] tracking-[0] leading-[0.1px]">
          <span className='text-[12px]'> Change Activity in </span>
          {currentTimeLeft.minutes < 10 ? `0${currentTimeLeft.minutes}` : currentTimeLeft.minutes}:
        </span>
        <span className='text-[12px]'>
          {currentTimeLeft.seconds < 10 ? `0${currentTimeLeft.seconds}` : currentTimeLeft.seconds}
        </span>
      </p>
      {/* <p className=" w-[226px] h-[12px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#272727] text-[12px] tracking-[0] leading-[0.1px]">
        Take action and join in One Accord!
      </p> */}
    </div>
  );
}
