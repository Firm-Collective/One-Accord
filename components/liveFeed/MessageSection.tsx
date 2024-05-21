import Image from 'next/image';

type PostSchemaType = {
  id: string;
  activity_id: string;
  category_id: string;
  content: string;
  created_at: string;
  event_id: string;
  is_offensive: boolean;
  is_visible: boolean;
  keywords_id: string;
  media_type_id: string;
  sentiment_id: string;
  user_id: string;
  tag_id: string | null;
};


type Props = {
  className: string;
  ModeratorImage: string;
  img?: string;
  profilePictureClassName: string;
  rectangle?: string;
  image1?: string;
  unsplashIfgrcqhznqg?: string;
  posts: PostSchemaType[] | [];
};

const MessageSection: React.FC<Props> = ({
  className,
  ModeratorImage,
  profilePictureClassName,
  image1,
  rectangle,
  unsplashIfgrcqhznqg,
  posts,
}) => {
  return (
    <div className={`inline-flex flex-col items-start gap-[5px] relative ${className} h-[150px] overflow-y-auto`}>
      {/* {posts?.map((post: Post) => ( <></> ))} */}
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
      <div className='bg-[#d9d9d9] flex w-[369px] items-start gap-[10px] pl-[10px] pr-[46px] py-[4px] relative flex-[0_0_auto] rounded-[10px]'>
        <img className='relative w-[28px] h-[28px]' alt='Image' src={ModeratorImage} />
        <p className="relative w-[300px] mt-[-1.00px] mr-[-25.00px] [font-family:'Poppins-SemiBold',Helvetica] font-normal text-[#171a1f] text-[12px] tracking-[0] leading-[15px]">
          <span className='font-semibold'>Moderator</span>
          <span className="[font-family:'Poppins-Regular',Helvetica]">&nbsp;</span>
          <span className="[font-family:'Poppins-Light',Helvetica] font-light text-[11px]">
            Today at 10:01 AM
            <br />
          </span>
          <span className="[font-family:'Poppins-Regular',Helvetica]">What did you receive from God?</span>
        </p>
      </div>
      <div className='bg-white flex w-[369px] items-start gap-[10px] pl-[10px] pr-[46px] py-[4px] relative flex-[0_0_auto] rounded-[10px]'>
        <div
          className={`relative w-[28px] h-[28px] bg-[url(/profile-pic.png)] bg-[100%_100%] ${profilePictureClassName}`}
        />
        <p className="relative w-[300px] mt-[-1.00px] mr-[-25.00px] [font-family:'Poppins-SemiBold',Helvetica] font-normal text-[#171a1f] text-[12px] tracking-[0] leading-[15px]">
          <span className='font-semibold'>ekklesia</span>
          <span className="[font-family:'Poppins-Regular',Helvetica]">&nbsp;</span>
          <span className="[font-family:'Poppins-Light',Helvetica] font-light text-[11px]">
            (UK) Today at 10:05 AM
            <br />
          </span>
          <span className="[font-family:'Poppins-Regular',Helvetica]">
            I saw a vision of fires of Revival
            <br />
            sweeping across China
          </span>{' '}
        </p>
      </div>
      <div className='bg-white flex w-[369px] items-start gap-[10px] pl-[10px] pr-[46px] py-[4px] relative flex-[0_0_auto] rounded-[10px]'>
        <div className='relative w-[28px] h-[28px] bg-[#a6f5ff] rounded-[14px] overflow-hidden'>
          <img className='absolute w-[28px] h-[28px] top-0 left-0' alt='Rectangle' src={rectangle} />
        </div>
        <p className="relative w-[300px] mt-[-1.00px] mr-[-25.00px] [font-family:'Poppins-SemiBold',Helvetica] font-normal text-[#171a1f] text-[12px] tracking-[0] leading-[15px]">
          <span className='font-semibold'>jsmith</span>
          <span className="[font-family:'Poppins-Regular',Helvetica]">&nbsp;</span>
          <span className="[font-family:'Poppins-Light',Helvetica] font-light text-[11px]">
            (TX,US) Today at 10:15 AM
            <br />
          </span>
          <span className="[font-family:'Poppins-Regular',Helvetica]">I heard God is healing back pain right now!</span>
        </p>
      </div>
      <div className='bg-white flex w-[369px] items-start gap-[10px] pl-[10px] pr-[46px] py-[4px] relative flex-[0_0_auto] rounded-[10px]'>
        <img className='relative w-[28px] h-[28px]' alt='Image' src={image1} />
        <p className="relative w-[300px] mt-[-1.00px] mr-[-25.00px] [font-family:'Poppins-SemiBold',Helvetica] font-normal text-[#171a1f] text-[12px] tracking-[0] leading-[15px]">
          <span className='font-semibold'>Heny Blackwel</span>
          <span className="[font-family:'Poppins-Regular',Helvetica]">&nbsp;</span>
          <span className="[font-family:'Poppins-Light',Helvetica] font-light text-[11px]">
            (Africa) Today at 10:45 AM
            <br />
          </span>
          <span className="[font-family:'Poppins-Regular',Helvetica]">I can feel the Holy Spirit</span>
        </p>
      </div>
      <div className='bg-white flex w-[369px] items-start gap-[10px] pl-[10px] pr-[46px] py-[4px] relative flex-[0_0_auto] rounded-[10px]'>
        <div className='relative w-[28px] h-[28px] bg-white rounded-[4px]'>
          <img
            className='absolute w-[24px] h-[24px] top-[2px] left-[2px]'
            alt='Unsplash ifgrcqhznqg'
            src={unsplashIfgrcqhznqg}
          />
        </div>
        <p className="relative w-[300px] mt-[-1.00px] mr-[-25.00px] [font-family:'Poppins-SemiBold',Helvetica] font-normal text-[#171a1f] text-[12px] tracking-[0] leading-[15px]">
          <span className='font-semibold'>Oliver Petherick</span>
          <span className="[font-family:'Poppins-Regular',Helvetica]">&nbsp;</span>
          <span className="[font-family:'Poppins-Light',Helvetica] font-light text-[11px]">
            (France) Today at 10:45 AM
            <br />
          </span>
          <span className="[font-family:'Poppins-Regular',Helvetica]">God is bringing peace to His children </span>
        </p>
      </div>
    </div>
  );
};

export default MessageSection;
