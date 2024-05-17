/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import React from 'react';

import FaSmileO from './FaSmile0';
import Vector from './Vector';
import { Label } from './Label';

interface Props {
  property1: 'guest-chat' | 'with-text' | 'default';
  vector: string;
  frame: string;
  returnVector: string;
  sendVector: string;
  userPhoto: string;
}

export const CommentSection = ({
  property1,

  frame = '/frame-163422.svg',
  userPhoto = '/Image-7.png',
  sendVector = '/SendVector.svg',
}: Props): JSX.Element => {
  return (
    <div className={`w-[392px] h-[37px] bg-white ${['default', 'with-text'].includes(property1) ? 'relative' : ''}`}>
      {['default', 'with-text'].includes(property1) && (
        <>
          <div className='w-[273px] left-[45px] top-[4px] h-[29px] absolute'>
            <div className='w-[273px] left-0 top-0 h-[29px] absolute'>
              <div className='w-[271px] h-[29px] rounded-[8px] bg-[#f1f1f1] relative'>
                <div
                  className={`[font-family:'Poppins-Regular',Helvetica] w-[166px] left-[7px] tracking-[0] text-[14px] top-0 h-[29px] font-normal leading-[18px] absolute ${
                    property1 === 'with-text' ? 'text-[#1e1f20]' : 'text-[#898a9d]'
                  }`}
                >
                  {property1 === 'default' && <>Comment</>}

                  {property1 === 'with-text' && <>God is saying</>}
                </div>
              </div>
            </div>
            <FaSmileO className='!absolute !w-[20px] !h-[20px] !top-[5px] !left-[241px]' color='#898A8D' />
            <img
              className={`w-[18px] top-[7px] h-[15px] absolute ${
                property1 === 'with-text' ? 'left-[213px]' : 'left-[215px]'
              }`}
              alt='Vector'
              src={property1 === 'with-text' ? '/SendVector.svg' : sendVector}
            />
          </div>
          <Vector className='!absolute !w-[20px] !h-[20px] !top-[9px] !left-[358px]' color='#898A8D' />
          <img
            className='w-[27px] left-[10px] top-[5px] h-[27px] absolute'
            alt='Image'
            src={property1 === 'with-text' ? '/Image-7.png' : userPhoto}
          />
          <img
            className='w-[29px] left-[323px] top-[4px] h-[29px] absolute'
            alt='Frame'
            src={property1 === 'with-text' ? '/frame-163422.svg' : frame}
          />
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
  sendVector: PropTypes.string,
  userPhoto: PropTypes.string,
};
