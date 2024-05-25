import React from 'react';
import './sidebar.scss';

type LeftSidebarProps = {
 
 }
const LeftSidebar: React.FC<LeftSidebarProps> = () => {
  return (
    <div className="sidebar left-sidebar">
      <p>left sidebar</p>
    </div>
  );
};

export default LeftSidebar;