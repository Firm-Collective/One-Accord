import { Imessage } from '@/utils/store/messages';
import React from 'react';

export default function Message({ message }: { message: Imessage }) {
  return (
    <div className='flex gap-2'>
      <div className='h-10 w-10 bg-green-500 rounded-full'></div>
      <div className='flex-1'>
        <div className='flex items-center gap-1'>
          <h1 className='font-bold'>Mario</h1>
          <h1 className='text-sm text-gray-400'>{new Date().toDateString()}</h1>
        </div>
        <p className='text-white-300'> {message.content} </p>
      </div>
    </div>
  );
}
