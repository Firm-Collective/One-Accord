import React, { useState } from 'react';
import useCurrentTime from './hooks/useCurrentTime';
import { Switch } from '@/components/switch';
import { useAppContext } from '@/context/AppContextProvider';

type Props = {
  timeLeft: number;
};

export default function CurrentTime({ timeLeft }: Props) {
  const { currentTime, currentTimeLeft } = useCurrentTime({ timeLeft });
  const { isMapVisible, setIsMapVisible } = useAppContext();

  return (
    <div className='mb-2 items-start pt-[5px] pb-[10px] px-[0px] bg-transparent flex flex-col'>
      <div className='flex items-center space-x-2 mb-2'>
        <Switch checked={isMapVisible} onCheckedChange={(checked) => setIsMapVisible(checked)} />
        {isMapVisible ? (
          <div className='text-[12px] w-[auto]'>Visualize Map</div>
        ) : (
          <div className='text-[12px] w-[auto]'>Visualize Activity</div>
        )}
      </div>
      <p className="w-[auto] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#272727] text-[16px] tracking-[0] leading-[1.2]">
        <span className="[font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#272727] text-[18px] tracking-[0] leading-[1.2]">
          {currentTime.time}
        </span>
        <span className='text-[12px] ml-1'>{currentTime.ampm}</span>
      </p>
      <p className="mb-2 w-[auto] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#272727] text-[16px] tracking-[0] leading-[1.2]">
        <span className="[font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#272727] text-[18px] tracking-[0] leading-[1.2]">
          <span className='text-[12px]'>Change Activity in </span>
          {currentTimeLeft.minutes < 10 ? `0${currentTimeLeft.minutes}` : currentTimeLeft.minutes}:
        </span>
        <span className='text-[12px]'>
          {currentTimeLeft.seconds < 10 ? `0${currentTimeLeft.seconds}` : currentTimeLeft.seconds}
        </span>
      </p>
    </div>
  );
}
