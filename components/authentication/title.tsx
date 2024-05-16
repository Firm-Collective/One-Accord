export const Title: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className='flex flex-col'>
      <h2 className='w-full text-left text-[28px] font-bold leading-9 tracking-tight text-gray-900'>{text}</h2>
    </div>
  );
};
