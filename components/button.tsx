import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  text: string; 
}

const Button: React.FC<ButtonProps> = ({ variant, text, className, ...props }) => {
  const baseStyles =
    'flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';
  const variantStyles = {
    primary: `bg-oneAccord-primary text-white `,
    secondary: 'border border-oneAccord-primary text-black ',
  };

  return (
    <button
      {...props} // This includes onClick and any other native button attributes
      className={classNames(baseStyles, variantStyles[variant], className)}
      type='submit'
    >
      {text}
    </button>
  );
};

export default Button;
