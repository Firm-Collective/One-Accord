/* eslint-disable @next/next/no-img-element */
// ThumbsUpBox.tsx
interface ThumbsUpBoxProps {
    className?: string;
  }
  
  export const ThumbsUpBox = ({ className }: ThumbsUpBoxProps): JSX.Element => {
    return (
      <div className={`w-[16px] h-[15px] ${className}`}>
        <img className="fixed w-[16px] h-[15px] top-0 left-0" src="/ThumbsUp.svg" alt="Vector" />
      </div>
    );
  };
  