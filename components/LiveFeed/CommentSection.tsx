/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { supabaseBrowser } from '@/utils/supabase/client';
import { z } from 'zod';
import { v4 as uuidv4, validate as isUuidValid } from 'uuid'; // Import UUID functions
import FaSmileO from './FaSmile0';
import Vector from './Vector';
import SendVector from './SendVector';

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

function generatePostData(content: any) {
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

interface Props {
  property1: 'guest-chat' | 'with-text' | 'default';
  frame: string;
  returnVector: string;
  userPhoto: string;
  refetch: () => void; // Add refetch prop for refreshing the comments
}

export const CommentSection = ({
  property1,
  frame = '/frame-163422.svg',
  userPhoto = '/Image-7.png',
  refetch, // Destructure refetch prop
}: Props): JSX.Element => {
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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (post.trim() !== '') {
      await handleSendPost(post);
    }
  };

  return (
    <div className={`w-[392px] h-[37px] bg-white ${['default', 'with-text'].includes(property1) ? 'relative' : ''}`}>
      {['default', 'with-text'].includes(property1) && (
        <>
          <div className='w-[273px] left-[45px] top-[4px] h-[29px] absolute'>
            <div className='w-[273px] left-0 top-0 h-[29px] absolute'>
              <div className='w-[271px] h-[29px] rounded-[8px] bg-[#f1f1f1] relative flex items-center'>
                <input
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  type='text'
                  name='post'
                  placeholder='Comment'
                  className='w-full h-full bg-transparent border-none pl-2 text-[14px] leading-[18px] text-[#1e1f20]'
                />
                <button type='submit' onClick={handleSubmit}>
                  <SendVector
                    className={`w-[18px] top-[7px] h-[15px] absolute ${
                      property1 === 'with-text' ? 'left-[213px]' : 'left-[215px]'
                    }`}
                    color='#898A8D'
                  />
                </button>
              </div>
            </div>
            <FaSmileO className='!absolute !w-[20px] !h-[20px] !top-[5px] !left-[241px]' color='#898A8D' />
          </div>
          <Vector className='!absolute !w-[20px] !h-[20px] !top-[9px] !left-[358px]' color='#898A8D' />
          <img
            className='w-[27px] left-[10px] top-[5px] h-[27px] absolute'
            alt='Image'
            src={property1 === 'with-text' ? '/Image-7.png' : userPhoto}
          />
          <img
            className='w-[29px] left-[323px] top-[4px] h-[29px] absolute'
            alt='Frame'
            src={property1 === 'with-text' ? '/frame-163422.svg' : frame}
          />
        </>
      )}
      {property1 === 'guest-chat' && (
        <div className='flex w-[370px] h-[30px] items-center justify-center gap-[10px] relative top-[4px] left-[11px] bg-white rounded-[4px] border border-solid border-black'>
          <div className='relative w-[187px] h-[24px]'>
            <img className='absolute w-[24px] h-[24px] top-0 left-0' alt='Uil exit' src='uil-exit.svg' />
            <div className="absolute h-[15px] top-[4px] left-[34px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#272727] text-[12px] text-center tracking-[0] leading-[15px] whitespace-nowrap">
              JOIN THE CONVERSATION
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CommentSection.propTypes = {
  property1: PropTypes.oneOf(['guest-chat', 'with-text', 'default']),
  vector: PropTypes.string,
  frame: PropTypes.string,
  returnVector: PropTypes.string,
  userPhoto: PropTypes.string,
  refetch: PropTypes.func.isRequired, // Make refetch required
};

export default CommentSection;
