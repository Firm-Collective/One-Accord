import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CretePostSchemaType, type PostSchemaType } from './schemas';
import useMessageSection from './hooks/useMessageSection';
import useScrollToBottom from './hooks/useScrollToBottom';
import axios from 'axios';
import { Badge } from './ui/badge';
import Loading from '@/app/loading';

type Props = {
  className: string;
  ModeratorImage: string;
  img?: string;
  profilePictureClassName: string;
  rectangle?: string;
  image1?: string;
  unsplashIfgrcqhznqg?: string;
  posts: CretePostSchemaType[] | [];
  queryPostInfo: any
};

export const fetchUserId = async () => {
  try {
    const response = await axios.get('/api/user/getUserId'); 
    return response.data.userId ?? "";
  } catch (error) {AC
    console.error('Failed to fetch user ID:', error);
    return "";
  }
};

const MessageSection: React.FC<Props> = ({
  className,
  ModeratorImage,
  profilePictureClassName,
  posts,
  queryPostInfo
}: Props): JSX.Element => {
  const [userId, setUserId] = useState("");
  const containerModeratorOrInfluencerRef = useScrollToBottom(posts);
  const containerOtherRef = useScrollToBottom(posts);
  
  
  useEffect(() => {
    const fetchAndSetUserId = async () => {
      const id = await fetchUserId();
      setUserId(id);
    };
    
    fetchAndSetUserId();
  }, []); 
  
  const { moderatorOrInfluencerPosts, otherPosts, formatDate, queryUserTypeInfo } = useMessageSection({ posts, userId });

  const showBadgeForUserType = (userType: string) => {
    const validUserTypes = ["Moderator", "Influencer", "Prophetic Organization"];
    return validUserTypes.includes(userType);
  };

  return (
    <>
      {queryPostInfo.isLoading ? (
        <div role="status" className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between pt-4">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
          ))}
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className={`inline-flex flex-col items-start relative ${className} h-[100%]`}>
          {queryUserTypeInfo?.data?.name && showBadgeForUserType(queryUserTypeInfo.data.name) && (
            <Badge userType={queryUserTypeInfo.data.name} className="self-end mb-2" />
          )}
          {/* Render moderator/influencer posts */}
          {moderatorOrInfluencerPosts.length > 0 && (
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
          )}
          {/* Render normal posts */}
          <div
            className={`flex flex-col items-start gap-[5px] relative ${className} flex-grow-0 overflow-y-auto `}
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
      )}
    </>
  );
};

export default MessageSection;
