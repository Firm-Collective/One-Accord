// StatusBar.tsx
import React from 'react';

interface StatusBarProps {
  className?: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ className }) => {
  return (
    <div className={`status-bar-container ${className}`}>
      {<h1 className="border border-gray-400 p-2">Status bar</h1>}
    </div>
  );
};

export default StatusBar;
