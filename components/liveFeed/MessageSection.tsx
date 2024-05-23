/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import useLiveFeed from './hooks/useLiveFeed';
import { type PostSchemaType } from './schemas';

type Props = {
  className: string;
  ModeratorImage: string;
  img?: string;
  profilePictureClassName: string;
  rectangle?: string;
  image1?: string;
  refetch: () => void;
  unsplashIfgrcqhznqg?: string;
  posts: PostSchemaType[] | [];
};

const MessageSection: React.FC<Props> = ({
  className,
  ModeratorImage,
  profilePictureClassName,
  refetch,
}: Props): JSX.Element => {
  const { queryPostInfo } = useLiveFeed();
  const { data: posts, isLoading, error } = queryPostInfo;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading posts.</div>;
  }

  return (
    <>
      <div className={`inline-flex flex-col items-start gap-[5px] relative ${className} h-[150px] overflow-y-auto`}>
        {/** render influencer/moderator */}
        <div className='bg-[#d9d9d9] flex w-[369px] items-start gap-[10px] pl-[10px] pr-[46px] py-[4px] relative flex-[0_0_auto] rounded-[10px]'>
          <Image className='relative w-[28px] h-[28px]' alt='Image' src={ModeratorImage} width={28} height={28} />
          <p className="relative w-[300px] mt-[-1.00px] mr-[-25.00px] [font-family:'Poppins-SemiBold',Helvetica] font-normal text-[#171a1f] text-[12px] tracking-[0] leading-[15px]">
            <span className='font-semibold'>Moderator</span>
            <span className="[font-family:'Poppins-Regular',Helvetica]">&nbsp;</span>
            <span className="[font-family:'Poppins-Light',Helvetica] font-light text-[11px]">
              Today at 10:01 AM
              <br />
            </span>
            <span className="[font-family:'Poppins-Regular',Helvetica]">
              We are praying about Isaiah 9:6 &#34;For to us a child is born, to us a son is given, and the government
              will be on his shoulders&#34;
            </span>
          </p>
        </div>
        {/* {posts?.map((post: Post) => ( <></> ))} */}
        {posts?.map((post) => (
          <div
            key={post.id}
            className='bg-white flex w-[369px] items-start gap-[10px] pl-[10px] pr-[46px] py-[4px] relative flex-[0_0_auto] rounded-[10px]'
          >
            <div
              className={`relative w-[28px] h-[28px] bg-[url(/profile-pic.png)] bg-[100%_100%] ${profilePictureClassName}`}
            />
            <p className="relative w-[300px] mt-[-1.00px] mr-[-25.00px] [font-family:'Poppins-SemiBold',Helvetica] font-normal text-[#171a1f] text-[12px] tracking-[0] leading-[15px]">
              <span className='font-semibold'>{post.User.username}</span>
              <span className="[font-family:'Poppins-Regular',Helvetica]">&nbsp;</span>
              <span className="[font-family:'Poppins-Light',Helvetica] font-light text-[11px]">
                <span>{`(${post.User.Location.city})`}</span> {new Date(post.created_at).toLocaleString()}
                <br />
              </span>
              <span className="[font-family:'Poppins-Regular',Helvetica]">{post.content}</span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default MessageSection;
