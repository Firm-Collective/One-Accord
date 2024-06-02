/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect, useState } from 'react';
import CommentSection from './CommentSection';
import MessageSection from './MessageSection';
import useLiveFeed from './hooks/useLiveFeed';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loading from '@/app/loading';

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

export const fetchUserId = async () => {
  try {
    const response = await axios.get('/api/user/getUserId');
    return response.data.userId ?? null;
  } catch (error) {
    console.error('Failed to fetch user ID:', error);
    return "";
  }
};

export const LiveFeed: React.FC<Props> = ({
  className,
  ModeratorImage,
  img = 'image.png',
  profilePictureClassName,
  rectangle = 'rectangle.png',
  image1 = 'image-3.png',
  unsplashIfgrcqhznqg = 'unsplash-ifgrcqhznqg.png',
  uilExit,
}) => {
  const [userAuth, setUserAuth] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {
    queryPinnedPostInfo,
    queryOtherPostInfo,
    pinnedPostData,
    otherPostData,
    paginationPinned,
    paginationOther,
    refetch,
  } = useLiveFeed();

  const sanitizedPinnedPosts = (pinnedPostData ?? []).map((post: any) => ({
    ...post,
    tag_id: post.tag_id ?? null,
  }));
  const sanitizedOtherPosts = (otherPostData ?? []).map((post: any) => ({
    ...post,
    tag_id: post.tag_id ?? null,
  }));

  useEffect(() => {
    const fetchAndSetUserId = async () => {
      const userId = await fetchUserId();
      setUserAuth(userId);
      setLoading(false);
    };

    fetchAndSetUserId();
  }, []);

  const handleRedirect = () => {
    router.push('/login');
  };

  if (loading) {
    return <div><Loading /></div>; 
  }

  return (
    <div className='w-[100%] h-[100%] space-y-8'>
      <MessageSection
        className={className}
        ModeratorImage={ModeratorImage}
        profilePictureClassName={profilePictureClassName}
        image1={image1}
        rectangle={rectangle}
        unsplashIfgrcqhznqg={unsplashIfgrcqhznqg}
        pinnedPosts={sanitizedPinnedPosts as any}
        registeredPosts={sanitizedOtherPosts as any}
        queryPinnedPosts={queryPinnedPostInfo}
        queryOtherPosts={queryOtherPostInfo}
        paginationPinned={paginationPinned}
        paginationOther={paginationOther}
      />

      {userAuth ? (
        <CommentSection
          property1='default'
          refetch={refetch}
          frame={'/frame-163422.svg'}
          userPhoto={'/Image-7.png'}
        />
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
