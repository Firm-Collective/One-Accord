'use client';

import React, { useState } from 'react';
import ErrorPage from '@/app/error/page';
import { supabaseBrowser } from '@/utils/supabase/client';
import { z } from 'zod';
import { v4 as uuidv4, validate as isUuidValid } from 'uuid'; // Import UUID functions
import Button from '../button';

const PostSchema = z.object({
  activity_id: z.string().uuid(),
  category_id: z.string().uuid(),
  content: z.string(),
  created_at: z.string(),
  event_id: z.string().uuid(),
  is_offensive: z.boolean(),
  is_visible: z.boolean(),
  keywords_id: z.string().uuid(),
  media_type_id: z.string().uuid(),
  sentiment_id: z.string().uuid(),
  tag_id: z.string().uuid().optional(),
  user_id: z.string().uuid(), // Ensure user_id is a UUID
});

const supabase = supabaseBrowser();

function generatePostData(content: string) {
  return {
    activity_id: '6e6a36da-06ed-426d-80cc-d1ff2276fb98',
    category_id: '2525edcc-b972-4a14-bfc5-66697a89b5bc',
    content,
    created_at: new Date().toISOString(),
    event_id: '9eac149d-12b1-4c91-b14b-8fd87341b572',
    is_offensive: false,
    is_visible: true,
    keywords_id: 'b5901b2c-b39b-4b20-8465-0b7898b159e9',
    media_type_id: 'f1075159-b937-4e9c-a5f1-2aa2d482086e',
    sentiment_id: '94ddc4f2-82f7-4c22-8e56-95b462d3b7ae',
    user_id: '94b2a736-d8c7-4722-8d64-86a0a24d4f80', // Ensure this is a valid UUID
  };
}

interface AddPostsProps {
  className?: string;
  refetch: () => void;
}

function AddPosts({ className, refetch }: AddPostsProps) {
  const [post, setPost] = useState('');

  const handleSendPost = async (content: string) => {
    try {
      const postData = generatePostData(content);

      // Validate user_id as UUID
      if (!isUuidValid(postData.user_id)) {
        throw new Error('Invalid user_id UUID');
      }

      const validatedData = PostSchema.parse(postData);
      const { data, error } = await supabase.from('Post').insert(validatedData);

      if (error) {
        throw error;
      }

      console.log('Post added successfully: ', data);

      setPost(''); // Clear message input after sending
      refetch(); // Call refetch after successful post sending
    } catch (error) {
      console.error('Error sending post:', error);
      ErrorPage(); // Redirect to error page or display error message to user
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (post.trim() !== '') {
      await handleSendPost(post);
    }
  };

  return (
    <form className={className} onSubmit={handleSubmit}>
      <div className='flex items-center'>
        <input
          value={post}
          onChange={(e) => setPost(e.target.value)}
          type='text'
          name='post'
          placeholder='Comment'
          className='w-full h-9 border border-white-400 p-2 mr-2'
        />
        <Button variant={'primary'} text={'Send and Refetch'} type='submit' />
      </div>
    </form>
  );
}

export default AddPosts;