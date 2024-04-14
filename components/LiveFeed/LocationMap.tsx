// LocationMap.tsx
import React from 'react';

interface LocationMapProps {
  className?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ className }) => {
  return (
    <div className={`location-map-container ${className}`}>
      {<h1 className="border border-gray-400 p-2">Location Comp</h1>}
    </div>
  );
};

export default LocationMap;



