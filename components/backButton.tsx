import React from 'react';
import Image from 'next/image';

interface ImageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  height: number;
  width: number;
}

const BackButton: React.FC<ImageButtonProps> = ({ onClick, height, width }) => {


  return (
    <button onClick={onClick}>
        <Image src='/back-arrow-navigation.svg' alt='back' width={width} height={height}/>
    </button>
  );
};

export default BackButton;
