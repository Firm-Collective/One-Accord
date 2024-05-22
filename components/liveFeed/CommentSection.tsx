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
    <div
      className={`w-[392px] h-[37px] bg-white ${['default', 'with-text'].includes(property1) ? 'relative' : ''} mb-5`}
    >
      {['default', 'with-text'].includes(property1) && (
        <>
          <div className='w-[273px] left-[1px] top-[4px] h-[29px] absolute'>
            <div className='w-[293px] left-0 top-0 h-[29px] absolute'>
              <CreatePost refetch={refetch} />
            </div>
            {/* <FaSmileO className='!absolute !w-[20px] !h-[20px] !top-[5px] !left-[241px]' color='#898A8D' /> */}
          </div>
          {/* <Vector className='!absolute !w-[20px] !h-[20px] !top-[9px] !left-[358px]' color='#898A8D' /> */}
          {/* <img
            className='w-[27px] left-[10px] top-[5px] h-[27px] absolute'
            alt='Image'
            src={property1 === 'with-text' ? '/Image-7.png' : userPhoto}
          /> */}
          {/* <img
            className='w-[29px] left-[323px] top-[4px] h-[29px] absolute'
            alt='Frame'
            src={property1 === 'with-text' ? '/frame-163422.svg' : frame}
          /> */}
        </>
      )}
      {property1 === 'guest-chat' && (
        <div className='flex w-[370px] h-[30px] items-center justify-center gap-[10px] relative top-[4px] left-[11px] bg-white rounded-[4px] border border-solid border-black'>
          <div className='relative w-[187px] h-[24px]'>
            <img className='absolute w-[24px] h-[24px] top-0 left-0' alt='Uil exit' src='uil-exit.svg' />
            <div className="absolute h-[15px] top-[4px] left-[34px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#272727] text-[12px] text-center tracking-[0] leading-[15px] whitespace-nowrap">
              JOIN THE CONVERSATION
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

CommentSection.propTypes = {
  property1: PropTypes.oneOf(['guest-chat', 'with-text', 'default']),
  vector: PropTypes.string,
  frame: PropTypes.string,
  returnVector: PropTypes.string,
  userPhoto: PropTypes.string,
  refetch: PropTypes.func.isRequired, // Make refetch required
};

export default CommentSection;
