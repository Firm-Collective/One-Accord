/* eslint-disable @next/next/no-img-element */
'use client';
import { getAllPosts } from '@/utils/supabase/db';
import PropTypes from 'prop-types';
import React from 'react';
import { useQuery } from 'react-query';
import CommentSection from '../CommentSection';
import { CommentSection1 } from '../UserAddMessages/CommentSection1';

interface Post {
  activity_id: string;
  category_id: string;
  content: string;
  created_at: string;
  event_id: string;
  id: string;
  is_offensive: boolean;
  is_visible: boolean;
  keywords_id: string;
  media_type_id: string;
  sentiment_id: string;
  tag_id: string | null;
  user_id: string;
}

interface Props {
  image: string;
  img: string;
  profilePictureClassName: any;
  rectangle: string;
  image1: string;
  unsplashIfgrcqhznqg: string;
  posts?: Post[]; // Add posts as an optional prop
}

export const Messages = ({ img = 'image.png' }: Props): JSX.Element => {
  const { data: posts, isLoading, isError, error, refetch } = useQuery(['posts'], getAllPosts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {'error message'}</div>;
  }

  console.log('Fetched posts: ', posts);

  return (
    <>
      {posts?.map((post: Post) => (
        <div
          className='bg-white flex w-[369px] items-start gap-[10px] pl-[10px] pr-[46px] py-[4px] relative flex-[0_0_auto] rounded-[10px]'
          key={post.id}
        >
          <img className='relative w-[28px] h-[28px]' alt='Image' src={img} />
          <p className="relative w-[300px] mt-[-1.00px] mr-[-25.00px] [font-family:'Poppins-SemiBold',Helvetica] font-normal text-[#171a1f] text-[12px] tracking-[0] leading-[15px]">
            <span className='font-semibold'>Moderator</span>
            <span className="[font-family:'Poppins-Regular',Helvetica]">&nbsp;</span>
            <span className="[font-family:'Poppins-Light',Helvetica] font-light text-[11px]">
              {/*Add location if applicable}{/* Add timestamp here if available */}
              <br />
            </span>
            <span className="[font-family:'Poppins-Regular',Helvetica]">{post.content}</span>
          </p>
        </div>
      ))}
      {/* Existing Messages JSX */}
      <CommentSection
        frame='/frame-163422.svg'
        userPhoto='/Image-7.png'
        property1='default'
        refetch={refetch}
        returnVector='/ReturnVector.svg'
      />
      <CommentSection1
        refetch={refetch}
        className='!h-[57px]'
        divClassName='!h-[45px]'
        groupClassName='!h-[45px]'
        icRoundSend='/ic_round-send.svg'
        icRoundSendClassName='!top-[6px]'
        overlapClassName='!h-[45px] !top-[6px]'
        overlapGroupClassName='!h-[45px]'
        property1='default'
      />
      
    </>
  );
};

Messages.propTypes = {
  img: PropTypes.string,

  posts: PropTypes.arrayOf(PropTypes.object), // Specify the type for posts prop
};
