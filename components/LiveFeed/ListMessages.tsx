'use client';

import React, { useEffect, useState } from 'react';

import { useMessage } from '@/utils/store/messages';
import Message from './Message';

export default function ListMessages() {
  const messsages = useMessage((state) => state.messages);

  return (
    <div className='flex-1 flex flex-col p-5 h-full overflow-y-auto'>
      <div className='flex-1 '></div>
      <div className='space-y-7'>
        {messsages.map((value, index) => {
          return <Message key={index} message={value} />;
        })}
      </div>
    </div>
  );
}
