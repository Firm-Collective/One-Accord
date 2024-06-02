import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CretePostSchemaType, type PostSchemaType } from './schemas';
import useMessageSection from './hooks/useMessageSection';
import useScroll from './hooks/useScroll';

type Pagination = {
  from: number;
  pageSize: number;
};

type UsePaginationReturn = {
  pagination: Pagination;
  setPagination: React.Dispatch<React.SetStateAction<Pagination>>;
  incrementPagination: () => void;
  getMaxPageSize: () => void;
};

type Props = {
  className: string;
  ModeratorImage: string;
  img?: string;
  profilePictureClassName: string;
  rectangle?: string;
  image1?: string;
  unsplashIfgrcqhznqg?: string;
  posts: CretePostSchemaType[] | [];
  InfluencerOrModeratorPosts: CretePostSchemaType[] | [];
  registeredPosts: CretePostSchemaType[] | [];
  pagination: UsePaginationReturn;
  paginationInfluencerOrModerator: UsePaginationReturn;
  paginationOther: UsePaginationReturn;
};

const MessageSection: React.FC<Props> = ({
  className,
  ModeratorImage,
  profilePictureClassName,
  posts,
  InfluencerOrModeratorPosts,
  registeredPosts,
  pagination,
  paginationInfluencerOrModerator,
  paginationOther,
}: Props): JSX.Element => {
  const { moderatorOrInfluencerPosts, formatDate } = useMessageSection({ posts: InfluencerOrModeratorPosts });
  const { otherPosts } = useMessageSection({ posts: registeredPosts });
  const containerModeratorOrInfluencerRef = useScroll(InfluencerOrModeratorPosts, paginationInfluencerOrModerator);
  const containerOtherRef = useScroll(registeredPosts, paginationOther);

  return (
    <>
      <div className={`inline-flex flex-col items-start relative ${className} h-[150px]`}>
        {/* Render moderator/influencer posts */}
        <div
          className={`flex flex-col items-start gap-[5px] relative ${className} flex-grow-0 overflow-y-auto max-h-[35%]`}
          ref={containerModeratorOrInfluencerRef}
        >
          {moderatorOrInfluencerPosts?.map((post, idx) => (
            <div
              key={`${post.user_id}-${idx}`}
              className='bg-[#d9d9d9] flex w-[369px] items-start gap-[10px] pl-[10px] pr-[46px] py-[4px] relative flex-[0_0_auto] rounded-[10px]'
            >
              <Image className='relative w-[28px] h-[28px]' alt='Image' src={ModeratorImage} width={28} height={28} />
              <p className="relative w-[300px] mt-[-1.00px] mr-[-25.00px] [font-family:'Poppins-SemiBold',Helvetica] font-normal text-[#171a1f] text-[12px] tracking-[0] leading-[15px]">
                <span className='font-semibold'>{post.User.UserType.name}</span>
                <span className="[font-family:'Poppins-Regular',Helvetica]">&nbsp;</span>
                <span className="[font-family:'Poppins-Light',Helvetica] font-light text-[11px]">
                  {formatDate(post.created_at)}
                  <br />
                </span>
                <span className="[font-family:'Poppins-Regular',Helvetica]">{post.content}</span>
              </p>
            </div>
          ))}
        </div>
        {/* Render normal posts */}
        <div
          className={`flex flex-col items-start gap-[5px] relative ${className} flex-grow-0 overflow-y-auto max-h-[65%]`}
          ref={containerOtherRef}
        >
          {otherPosts?.map((post, idx) => (
            <div
              key={`${post.user_id}-${idx}`}
              className='bg-white flex w-[369px] items-start gap-[10px] pl-[10px] pr-[46px] py-[4px] relative flex-[0_0_auto] rounded-[10px]'
            >
              <div
                className={`relative w-[28px] h-[28px] bg-[url(/profile-pic.png)] bg-[100%_100%] ${profilePictureClassName}`}
              />
              <p className="relative w-[300px] mt-[-1.00px] mr-[-25.00px] [font-family:'Poppins-SemiBold',Helvetica] font-normal text-[#171a1f] text-[12px] tracking-[0] leading-[15px]">
                <span className='font-semibold'>{post.User.username}</span>
                <span className="[font-family:'Poppins-Regular',Helvetica]">&nbsp;</span>
                <span className="[font-family:'Poppins-Light',Helvetica] font-light text-[11px]">
                  <span>{post.User.Location?.city ? `(${post.User.Location.city}) ` : ''}</span>
                  {formatDate(post.created_at)}
                  <br />
                </span>
                <span className="[font-family:'Poppins-Regular',Helvetica]">{post.content}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MessageSection;
