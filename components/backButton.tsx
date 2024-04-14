import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';

interface ImageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

const BackButton: React.FC<ImageButtonProps> = ({ onClick }) => {


  return (
    <button onClick={onClick}>
        <Image src='/public/back-arrow-navigation.svg' alt='back' width={48} height={48}/>
    </button>
  );
};

export default BackButton;
