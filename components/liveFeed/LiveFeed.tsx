/* eslint-disable @next/next/no-img-element */
'use client';
import PropTypes from 'prop-types';
import React from 'react';
import CommentSection from './CommentSection';
import MessageSection from './MessageSection';
import useLiveFeed from './hooks/useLiveFeed';

export const LiveFeed = ({
  className,
  ModeratorImage,
  img = 'image.png',
  profilePictureClassName,
  rectangle = 'rectangle.png',
  image1 = 'image-3.png',
  unsplashIfgrcqhznqg = 'unsplash-ifgrcqhznqg.png',
}): JSX.Element => {
  const { querryPostInfo } = useLiveFeed();

  if (querryPostInfo.isLoading) {
    return <div>Loading...</div>;
  }

  if (querryPostInfo.isError) {
    return <div>Error: {'error message'}</div>;
  }

  return (
    <div className='w-[100%] h-[281px]'>
      <MessageSection
        className={className}
        ModeratorImage={ModeratorImage}
        profilePictureClassName={profilePictureClassName}
        image1={image1}
        rectangle={rectangle}
        unsplashIfgrcqhznqg={unsplashIfgrcqhznqg}
        posts={querryPostInfo?.data ?? []}
      />
      <CommentSection
        property1='default'
        refetch={querryPostInfo.refetch}
        frame={'/frame-163422.svg'}
        userPhoto={'/Image-7.png'}
      />
    </div>
  );
};
