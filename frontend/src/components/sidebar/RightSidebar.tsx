import React from 'react';
import './sidebar.scss';

type RightSidebarProps = {
 
 }
const RightSidebar: React.FC<RightSidebarProps> = () => {
  return (
    <div className="sidebar right-sidebar">
      <p>right sidebar</p>
    </div>
  );
};

export default RightSidebar;