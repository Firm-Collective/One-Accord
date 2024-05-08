'use client';

import ErrorPage from '@/app/error/page';
import { supabaseBrowswer } from '@/utils/supabase/client';

import { z } from 'zod';
import React, { useState } from 'react';

const PostSchema = z.object({
  activity_id: z.string(),
  category_id: z.string(),
  content: z.string(),
  created_at: z.string(), // You can use z.date() if the created_at column is a date type in your database
  event_id: z.string(),
  is_offensive: z.boolean(),
  is_visible: z.boolean(),
  keywords_id: z.string(),
  media_type_id: z.string(),
  sentiment_id: z.string(),
  tag_id: z.string().optional(), // This property is optional
  user_id: z.string(),
});

const supabase = supabaseBrowswer();

function generatePostData(content: any) {
  return {
    activity_id: "activity_id_value",
    category_id: "category_id_value",
    content,
    created_at: "2024-05-07T12:00:00Z",
    event_id: "event_id_value",
    is_offensive: false,
    is_visible: true,
    keywords_id: "keywords_id_value",
    media_type_id: "media_type_id_value",
    sentiment_id: "sentiment_id_value",
    user_id: "user_id_value"
  };
}

function AddMessages({ className }: { className?: string }) {
  // createPost('Title', 'Content');
  const [message, setMessages] = useState('');



  const handleSendMessage = async (content: string) => {
    try {
      // Generate postData object
      const postData = generatePostData(content);

      // Validate message data against schema
      PostSchema.parse(postData);

      // Insert message into Supabase
      const { data, error } = await supabase.from('Post').insert(postData);

      // Message sent successfully
      // You can add additional logic here if needed
    } catch (error) {
      // Validation failed or database error occurred
      console.error('Error sending message:', error);
      // Redirect to error page or display error message to user
      ErrorPage();
    }
  };

  return (
    <form className={className}>
      <div className='flex item-center'>
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
          className='w-full h-9 border border-white-400 p-2 mr-2'
        />
      </div>
    </form>
  );
}



export default AddMessages;
