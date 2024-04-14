// LiveFeed.tsx
import React from 'react';

interface LiveFeedProps {
  className?: string;
}

const LiveFeed: React.FC<LiveFeedProps> = ({ className }) => {
  return (
    <div className={`live-feed-container ${className}`}>
      {<h1>Live Feed</h1>}
    </div>
  );
};

export default LiveFeed;



