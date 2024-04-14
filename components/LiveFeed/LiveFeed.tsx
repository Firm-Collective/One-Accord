import React from 'react';
import axios from 'axios';

interface LiveFeedProps {
  className?: string;
}

const LiveFeed: React.FC<LiveFeedProps> = ({ className }) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const response = await axios.post('/api/liveFeed/route.ts', formData);
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className={`live-feed-container ${className}`}>
     
      <div className="feed-items">
        
        <div className="feed-item">
          <p className="w-full">Feed Item 1</p>
        </div>
        <div className="feed-item">
          <p className="w-full">Feed Item 2</p>
        </div>
        <div className="feed-item">
          <p className="w-full">Feed Item 3</p>
        </div>
        <div className="feed-item">
          <p className="w-full">Feed Item 4</p>
        </div>
        <div className="feed-item">
          <p className="w-full">Feed Item 5</p>
        </div>
        
      </div>
      <form className="feed-form" id="feedInput" name="feedInput">
        <textarea className="w-full h-9 border border-gray-400 p-2" placeholder="Enter your message"></textarea>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Submit</button>
      </form>
    </div>
  );
};

export default LiveFeed;





