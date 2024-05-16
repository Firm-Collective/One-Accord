'use client';

import React, { useState } from 'react';
import ErrorPage from '@/app/error/page';
import { supabaseBrowser } from '@/utils/supabase/client';
import { z } from 'zod';
import Button from '../button';

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

const supabase = supabaseBrowser();

function generatePostData(content: any) {
  return {
    activity_id: '6e6a36da-06ed-426d-80cc-d1ff2276fb98',
    category_id: '2525edcc-b972-4a14-bfc5-66697a89b5bc',
    content,
    created_at: new Date().toISOString(), // Use current time
    event_id: '9eac149d-12b1-4c91-b14b-8fd87341b572',
    is_offensive: false,
    is_visible: true,
    keywords_id: 'b5901b2c-b39b-4b20-8465-0b7898b159e9',
    media_type_id: 'f1075159-b937-4e9c-a5f1-2aa2d482086e',
    sentiment_id: '94ddc4f2-82f7-4c22-8e56-95b462d3b7ae',
    user_id: '9466d9ab-d2db-4414-8483-907e85e55f5f',
  };
}

interface AddPostsProps {
  className?: string;
  refetch: () => void; // Add the refetch prop
}

function AddPosts({ className, refetch }: AddPostsProps) {
  const [post, setPost] = useState('');

  const handleSendPost = async (content: string) => {
    try {
      const postData = generatePostData(content);
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
        <Button variant={'primary'} text={'Send and Refetch'} type='submit' /> {/* Single button */}
      </div>
    </form>
  );
}

export default AddPosts;
