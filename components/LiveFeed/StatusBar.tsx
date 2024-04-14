// StatusBar.tsx
import React from 'react';

interface StatusBarProps {
  className?: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ className }) => {
  return (
    <div className={`status-bar-container ${className}`}>
      {<h1>Status bar</h1>}
    </div>
  );
};

export default StatusBar;
