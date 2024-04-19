import React from 'react';

function Form({ className }: { className?: string }) {
  const handleSendMessage = (text: string) => {
    alert(text);
  };

  return (
    <form className={className}>
      <div className='flex item-center'>
        {' '}
        {/* Added flex and items-center */}
        <input
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage(e.currentTarget.value);

              e.currentTarget.value = '';
            }
          }}
          type='text'
          name='message'
          placeholder='Enter your message'
          className='w-full h-9 border border-white-400 p-2 mr-2' // Added 'mr-2' for right margin
        />
      </div>
    </form>
  );
}

export default Form;
