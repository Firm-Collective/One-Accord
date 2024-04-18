import React from 'react';

function Form({ className }: { className?: string }) {
  return (
    <form className={className}>
      <div className="p-6 fixed bottom-0 left-0 w-full bg-white flex items-center"> {/* Added flex and items-center */}
        <input 
          type="text" 
          name="message" 
          placeholder="Enter your message" 
          className="w-full h-9 border border-gray-400 p-2 mr-2"  // Added 'mr-2' for right margin
        />
        
      </div>
    </form>
  );
}

export default Form;




