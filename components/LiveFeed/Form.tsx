'use client';

import { Content } from 'next/font/google';
// import { createPost } from '@/utils/supabase/db';
import React, { useState } from 'react';

function Form({ className }: { className?: string }) {
  // createPost('Title', 'Content');
  const [message, setMessages] = useState('');

  const handleSendMessage = async (text: string) => {
    try {
      const response = await fetch('app/api/liveFeed/route/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: message, content: message }),
      });

      if (response.ok) {
        alert('Post created successfully');
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      alert('Error creating post');
    }
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
