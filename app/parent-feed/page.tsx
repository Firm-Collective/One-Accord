import React from 'react';
import LocationMap from '..//../components/LiveFeed/LocationMap'; // Import the LocationMap component
import StatusBar from '..//../components/LiveFeed/StatusBar'; // Import the StatusBar component
import LiveFeed from '..//../components/LiveFeed/LiveFeed'; // Import the LiveFeed component

const ParentFeedComponent: React.FC = () => {
  return (
    <main className='bg-white flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='mt-2'><LocationMap className="h-45" /></div>
      <div className='mt-2'><StatusBar className="h-10" /></div>
      <div className='mt-2'><LiveFeed className="h-45 border-b-2" /></div>
    
     
      
      
     </main> 
    
  );
};

export default ParentFeedComponent;
