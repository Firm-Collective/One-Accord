import React from 'react';

interface SendVectorProps {
  className?: string;
  color?: string;
}

const SendVector = ({ className = '', color = '#D9D9D9' }: SendVectorProps): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='16'
      viewBox='0 0 18 16'
      fill='none'
      className={className}
    >
      <path
        d='M7.18948 15.0594C6.74948 15.0594 6.38941 14.7117 6.38941 14.2869V6.15826L0.290349 1.37106C0.0303665 1.15835 -0.0697144 0.830181 0.0505046 0.522025C0.170117 0.212692 0.450235 0 0.79016 0H17.1881C17.4883 0 17.7678 0.154364 17.9082 0.424812C18.0479 0.675816 18.0284 0.984545 17.8478 1.23555L7.84905 14.7507C7.68916 14.9439 7.44932 15.06 7.18873 15.06L7.18948 15.0594Z'
        fill={color}
      />
    </svg>
  );
};

export default SendVector;
