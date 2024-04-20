"use client"

import { createPost } from '@/utils/supabase/db';
import React from 'react';

import { types } from 'util';
// import { createClient } from '@/utils/supabase/client';

function Form({ className }: { className?: string }) {
  createPost('Title', 'Content');
  const handleSendMessage = async (text: string) => {
   
    try {
        const createdPost = await createPost("", text);
        alert('Post created successfully:');
    } catch (error) {
      alert('Error creating post');
    }
   
   
    // alert(text);
   

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

export default Form;
