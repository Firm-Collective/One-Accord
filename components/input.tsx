import React, { useState } from 'react';
import classNames from 'classnames';
import { register } from 'module';

// 1. I need to fire a function that will validate the input using regex onBlur


interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register: any;
  validation?: (event: React.FocusEvent<HTMLInputElement>) => boolean;
  type?: string;
}

const Input: React.FC<InputProps> = ({ label, name, register, validation, type, className, ...props }) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const baseStyles =
    'block w-full p-2 focus:outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-oneAccord-primary sm:text-sm sm:leading-6';
  const errorStyles = 'ring-red-500 text-red-500';
  const successStyles = 'ring-green-500 ';

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      if (validation) {
        const isValidInput = validation(event);
        setIsValid(isValidInput);
      }
    };

  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <input
        {...props} // Spread other props
        id={name}
        name={name}
        type={type}
        className={classNames(baseStyles, className, {
          [errorStyles]: isValid === false,
          [successStyles]: isValid === true,
        })}
        {...register}
        onBlur={handleBlur}
      />
      {isValid ? (
        <p className='text-green-500 text-sm'>Looks good!</p>
      ) : isValid === false ? (
        <p className='text-red-500 text-sm'>Invalid input</p>
      ) : null}
    </div>
  );
};

export default Input;
