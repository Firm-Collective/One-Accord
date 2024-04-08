import React from 'react';
import classNames from 'classnames';
import { register } from 'module';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register: any;
}

const Input: React.FC<InputProps> = ({ label, name, register, className, ...props }) => {
  const baseStyles =
    'block w-full p-2 focus:outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-oneAccord-primary sm:text-sm sm:leading-6';
  const errorStyles = 'ring-red-500 text-red-500';

  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
        {label}
      </label>
      <input
        {...props} // Spread other props
        id={name}
        name={name}
        className={classNames(baseStyles, className)}
        {...register}
      />
    </div>
  );
};

export default Input;
