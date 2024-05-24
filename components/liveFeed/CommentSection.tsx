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
    <div className='w-[393px] h-[48px] bg-white'>
      <div
        className={`top-[5px] relative ${property1 === 'guest-chat' ? 'border border-solid' : ''} ${
          property1 === 'guest-chat' ? 'border-black' : ''
        } ${property1 === 'guest-chat' ? 'w-[371px]' : 'w-[373px]'} ${
          property1 === 'guest-chat' ? 'left-[11px]' : 'left-[10px]'
        } ${property1 === 'guest-chat' ? 'flex' : ''} ${property1 === 'guest-chat' ? 'items-center' : ''} ${
          property1 === 'guest-chat' ? 'gap-[10px]' : ''
        } ${property1 === 'guest-chat' ? 'h-[39px]' : 'h-[38px]'} ${
          property1 === 'guest-chat' ? 'rounded-[4px]' : ''
        } ${property1 === 'guest-chat' ? 'justify-center' : ''} ${property1 === 'guest-chat' ? 'bg-white' : ''}`}
      >
        {['default', 'with-text'].includes(property1) && (
          <>
            <div className='w-full max-w-[773] left-0 top-0 h-[38px] absolute'>
              <div className='w-full max-w-[771px] h-[38px] rounded-[8px] bg-[#f1f1f1] relative'>
                <div
                  className={`[font-family:'Poppins-Regular',Helvetica] left-[10px] tracking-[0] text-[14px] top-0 h-[38px] font-normal leading-[18px] absolute ${
                    property1 === 'with-text' ? 'w-[227px]' : 'w-[228px]'
                  } ${property1 === 'with-text' ? 'text-[#1e1f20]' : 'text-[#898a9d]'}`}
                >
                  <CreatePost refetch={refetch} />
                </div>
              </div>
            </div>
          </>
        )}

        {property1 === 'guest-chat' && (
          <div className='relative w-[187px] h-[24px]'>
            <img className='absolute w-[24px] h-[24px] top-0 left-0' alt='Uil exit' src='uil-exit.svg' />
            <div className="absolute h-[15px] top-[4px] left-[34px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#272727] text-[12px] text-center tracking-[0] leading-[15px] whitespace-nowrap">
              JOIN THE CONVERSATION
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
