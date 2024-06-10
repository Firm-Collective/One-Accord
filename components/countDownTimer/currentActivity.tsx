import React, { useState, useEffect } from 'react';
import useCurrentActivity from './hooks/useCurrentActivity';

type Props = {
  timeLeft: number;
  currentActivityIndex: number;
};



export default function CurrentActivity({ timeLeft, currentActivityIndex }: Props) {
  const { circumference, offset, activities } = useCurrentActivity({ timeLeft });

  return (
    <div className=' items-center gap-[4px]  pb-6 px-0 inline-flex flex-col  flex-[0_0_auto]'>
      <div className='inline-flex items-start gap-[10px] bg-white rounded-[99px] border-1 border-solid border-transparent p-1'>
        <svg
          className='inset-0 rounded-[99px] border-transparent  '
          width='44'
          height='44'
          viewBox='0 0 48 48'
        >
          <defs>
            <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop offset='0%' style={{ stopColor: 'rgb(242,163,116)', stopOpacity: 1 }} />
              <stop offset='28.5%' style={{ stopColor: 'rgb(154,191,228)', stopOpacity: 1 }} />
              <stop offset='52.5%' style={{ stopColor: 'rgb(237,147,133)', stopOpacity: 1 }} />
              <stop offset='68%' style={{ stopColor: 'rgb(241,162,117)', stopOpacity: 1 }} />
              <stop offset='78%' style={{ stopColor: 'rgb(239,159,123)', stopOpacity: 1 }} />
              <stop offset='91%' style={{ stopColor: 'rgb(236,136,132)', stopOpacity: 1 }} />
            </linearGradient>
            <clipPath id='circleView'>
              <circle cx='24' cy='24' r='22' />
            </clipPath>
          </defs>
          <circle
            cx='24'
            cy='24'
            r='22'
            fill='none'
            stroke='url(#gradient)'
            strokeWidth='3'
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform='rotate(-90 24 24)'
          />
          <image
            href={activities[currentActivityIndex].icon}
            x='2'
            y='2'
            width='44'
            height='44'
            clipPath='url(#circleView)'
            style={{ filter: '#gradient' }}
          />
        </svg>
      </div>
      <div className="relative w-fit [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#ff755e] text-[10px] text-center tracking-[0] leading-[normal] whitespace-nowrap">
        {activities[currentActivityIndex].name}
      </div>
    </div>
  );
}
