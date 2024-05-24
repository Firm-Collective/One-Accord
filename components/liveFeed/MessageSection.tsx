import Image from 'next/image';
import { CretePostSchemaType, type PostSchemaType } from './schemas';

type Props = {
  className: string;
  ModeratorImage: string;
  img?: string;
  profilePictureClassName: string;
  rectangle?: string;
  image1?: string;
  unsplashIfgrcqhznqg?: string;
  posts: CretePostSchemaType[] | [];
};

const MessageSection: React.FC<Props> = ({
  className,
  ModeratorImage,
  profilePictureClassName,
  posts,
}: Props): JSX.Element => {
  const moderatorOrInfluencerPosts = posts.filter(
    (post) =>
      post.User.UserType.name === 'Moderator' || (post.User.UserType.name === 'Influencer' && post.is_visible === true),
  );
  const otherPosts = posts.filter(
    (post) =>
      post.User.UserType.name !== 'Moderator' && post.User.UserType.name !== 'Influencer' && post.is_visible === true,
  );

  return (
    <>
      <div className={`inline-flex flex-col items-start gap-[5px] relative ${className} h-[150px] overflow-y-auto`}>
        {/* Render moderator/influencer posts */}
        {moderatorOrInfluencerPosts.map((post, idx) => (
          <div
            key={`${post.user_id}-${idx}`}
            className='bg-[#d9d9d9] flex w-[369px] items-start gap-[10px] pl-[10px] pr-[46px] py-[4px] relative flex-[0_0_auto] rounded-[10px]'
          >
            <Image className='relative w-[28px] h-[28px]' alt='Image' src={ModeratorImage} width={28} height={28} />
            <p className="relative w-[300px] mt-[-1.00px] mr-[-25.00px] [font-family:'Poppins-SemiBold',Helvetica] font-normal text-[#171a1f] text-[12px] tracking-[0] leading-[15px]">
              <span className='font-semibold'>{post.User.UserType.name}</span>
              <span className="[font-family:'Poppins-Regular',Helvetica]">&nbsp;</span>
              <span className="[font-family:'Poppins-Light',Helvetica] font-light text-[11px]">
                {new Date(post.created_at).toLocaleString()}
                <br />
              </span>
              <span className="[font-family:'Poppins-Regular',Helvetica]">{post.content}</span>
            </p>
          </div>
        ))}
        {/* Render normal posts */}
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
