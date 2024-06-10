/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';

import { CreatePost } from './CreatePost';

interface Props {
  property1: 'guest-chat' | 'with-text' | 'default';
  frame: string;
  userPhoto: string;
  refetch: () => void;
}

export const CommentSection = ({
  property1,
  frame = '/frame-163422.svg',
  userPhoto = '/Image-7.png',
  refetch,
}: Props): JSX.Element => {
  return (
    <div className='w-full bg-white relative lg:absolute lg:bottom-0 lg:right-0 lg:w-[30%] mr-3'>
      <div className='w-full h-auto rounded-lg bg-[#f1f1f1] relative mr-3'>
        <CreatePost refetch={refetch} />
      </div>
    </div>
  );
};

export default CommentSection;
