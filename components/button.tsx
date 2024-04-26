import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'third';
  text: string;
  imageUrl?: string;
}

const Button: React.FC<ButtonProps> = ({ variant, text, imageUrl, className, ...props }) => {
  const baseStyles =
    'relative z-100 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';
  const variantStyles = {
    primary: `bg-oneAccord-primary text-white `,
    secondary: 'border border-oneAccord-primary text-black ',
    third: 'border border-black text-black ',
  };

  return (
    <button
      {...props} // This includes onClick and any other native button attributes
      className={classNames(baseStyles, variantStyles[variant], className)}
      type='submit'
    >
      {imageUrl && (
        <Image
          className='absolute left-4 top-1/2 transform -translate-y-1/2'
          src={imageUrl}
          alt='logo'
          width={20}
          height={20}
        />
      )}
      {text}
    </button>
  );
};

export default Button;
