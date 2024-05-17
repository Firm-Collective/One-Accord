/* eslint-disable @next/next/no-img-element */
import React from 'react';

export const Frame = (): JSX.Element => {
  const frameStyle = {
    borderRadius: '99px',
    background: 'linear-gradient(170deg, #F2A374 -36.75%, #9ABFE4 0%, #ED9385 30.95%, #F1A275 50.94%, #EF9F7B 63.84%, #EC8884 80.6%)',
  };

  return (
    <div className='flex w-[29px] h-[29px] items-center justify-center gap-[10px] p-[12px] relative' style={frameStyle}>
      <img
        className='relative w-[15.83px] h-[15.04px] mt-[-5.02px] mb-[-5.02px] ml-[-5.42px] mr-[-5.42px]'
        alt='Vector'
        src='/ThumbsUp.svg'
      />
    </div>
  );
};
