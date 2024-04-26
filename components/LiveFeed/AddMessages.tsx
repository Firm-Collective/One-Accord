'use client';

import ErrorPage from '@/app/error/page';
import { supabaseBrowswer } from '@/utils/supabase/client';

import React, { useState } from 'react';

function AddMessages({ className }: { className?: string }) {
  // createPost('Title', 'Content');
  const [message, setMessages] = useState('');
  const supabase = supabaseBrowswer();

  const handleSendMessage = async (content: string) => {
    

    const { error } = await supabase.from('Posts').insert({ content });

    if (error) {
      ErrorPage();
    }

    //call to supabase
  };

  return (
    <form className={className}>
      <div className='flex item-center'>
        {' '}
        {/* Added flex and items-center */}
        <input
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage(e.currentTarget.value);

              e.currentTarget.value = '';
            }
          }}
          type='text'
          name='message'
          placeholder='Enter your message'
          className='w-full h-9 border border-white-400 p-2 mr-2' // Added 'mr-2' for right margin
        />
      </div>
    </form>
  );
}

export default AddMessages;
