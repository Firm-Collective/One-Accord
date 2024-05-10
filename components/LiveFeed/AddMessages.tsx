import React, { useState } from 'react';
import ErrorPage from '@/app/error/page';
import { supabaseBrowswer } from '@/utils/supabase/client';
import { z } from 'zod';

const PostSchema = z.object({
  activity_id: z.string(),
  category_id: z.string(),
  content: z.string(),
  created_at: z.string(),
  event_id: z.string(),
  is_offensive: z.boolean(),
  is_visible: z.boolean(),
  keywords_id: z.string(),
  media_type_id: z.string(),
  sentiment_id: z.string(),
  tag_id: z.string().optional(),
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
  const [message, setMessage] = useState('');

  const handleSendMessage = async (content: string) => {
    try {
      const postData = generatePostData(content);
      PostSchema.parse(postData);

      const { data, error } = await supabase.from('Post').insert(postData);
      
      if (error) {
        throw error;
      }

      setMessage(''); // Clear message input after sending
    } catch (error) {
      console.error('Error sending message:', error);
      ErrorPage(); // Redirect to error page or display error message to user
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== '') {
      await handleSendMessage(message);
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className='flex items-center'>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type='text'
          name='message'
          placeholder='Enter your message'
          className='w-full h-9 border border-white-400 p-2 mr-2'
        />
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Send
        </button>
      </div>
    </form>
  );
}

export default AddMessages;
