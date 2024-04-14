import React from 'react';
import LocationMap from '..//../components/LiveFeed/LocationMap'; // Import the LocationMap component
import StatusBar from '..//../components/LiveFeed/StatusBar'; // Import the StatusBar component
import LiveFeed from '..//../components/LiveFeed/LiveFeed'; // Import the LiveFeed component

const ParentFeedComponent: React.FC = () => {
  return (
    <div className="flex flex-col h-full border-b-2">
      <LocationMap className="h-40" />
      <StatusBar className="h-20" />
      <LiveFeed className="h-40" />
      
    </div>
  );
};

export default ParentFeedComponent;
