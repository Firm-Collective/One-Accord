import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';

interface ImageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

const BackButton: React.FC<ImageButtonProps> = ({ onClick }) => {
  return (
    <button className='absolute top-6 left-2 transform translate-x-1/2 h-[30px]' onClick={onClick}>
      <Image src='/back-arrow-navigation.svg' alt='back' width={20} height={20} />
    </button>
  );
};

export default BackButton;
