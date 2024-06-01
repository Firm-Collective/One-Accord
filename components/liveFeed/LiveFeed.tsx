/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import CommentSection from './CommentSection';
import MessageSection from './MessageSection';
import useLiveFeed from './hooks/useLiveFeed';

import { useRouter } from 'next/navigation';

type Props = {
  className: string;
  ModeratorImage: string;
  img?: string;
  profilePictureClassName: string;
  rectangle?: string;
  image1?: string;
  unsplashIfgrcqhznqg?: string;
  uilExit: string;
};

export const LiveFeed: React.FC<Props> = ({
  className,
  ModeratorImage,
  img = 'image.png',
  profilePictureClassName,
  rectangle = 'rectangle.png',
  image1 = 'image-3.png',
  unsplashIfgrcqhznqg = 'unsplash-ifgrcqhznqg.png',
  uilExit = '/uil_exit.svg',
}) => {
  const { queryPostInfo, userAuth } = useLiveFeed();
  const router = useRouter();

  

  const sanitizedPosts = (queryPostInfo?.data ?? []).map((post) => ({
    ...post,
    tag_id: post.tag_id ?? null,
  }));

  const handleRedirect = () => {
    router.push('/login'); // or '/signup' depending on your routing setup
  };




  return (
    <div className='w-[100%] h-[281px] space-y-8'>
      <MessageSection
        className={className}
        ModeratorImage={ModeratorImage}
        profilePictureClassName={profilePictureClassName}
        image1={image1}
        rectangle={rectangle}
        unsplashIfgrcqhznqg={unsplashIfgrcqhznqg}
        posts={sanitizedPosts as any}
      />

      {userAuth.isLoading ? (
        <div>Loading...</div>
      ) : userAuth.isError ? (
        <div>Error: {"userAuth.error.message"}</div>
      ) : userAuth.data?.isAuthenticated ? (
        <>
          <CommentSection
            property1='default'
            refetch={queryPostInfo.refetch}
            frame={'/frame-163422.svg'}
            userPhoto={'/Image-7.png'}
          />
        </>
      ) : (
        <div className='flex w-[370.94px] h-[46.15px] items-center justify-center gap-[10px] relative bg-white rounded-[4px] border border-solid border-black'>
          <div className='relative w-[187px] h-[24px]' onClick={handleRedirect} style={{ cursor: 'pointer' }}>
            <img className='absolute w-[24px] h-[24px] top-0 left-0' alt='Uil exit' src={uilExit} />
            <div className="absolute h-[15px] top-[4px] left-[34px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#272727] text-[12px] text-center tracking-[0] leading-[15px] whitespace-nowrap">
              JOIN THE CONVERSATION
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveFeed;
