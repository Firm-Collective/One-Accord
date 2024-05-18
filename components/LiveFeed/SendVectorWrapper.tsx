/* eslint-disable @next/next/no-img-element */
import React from 'react';
import SendVector from './SendVector';

interface SendVectorWrapperProps {
  className?: string;
  color?: string;
}

const SendVectorWrapper = ({ className = '', color = '#D9D9D9' }: SendVectorWrapperProps): JSX.Element => {
  return (
    <div className={`!absolute !w-[20px] !h-[20px] !top-0 !left-0 ${className}`}>
      <SendVector color={color} />
    </div>
  );
};

export default SendVectorWrapper;
