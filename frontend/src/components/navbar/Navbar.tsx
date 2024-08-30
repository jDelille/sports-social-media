import React from 'react';
import './navbar.scss';
import { LogoIcon } from '../../icons';

type NavbarProps = {
 
 }
const Navbar: React.FC<NavbarProps> = () => {
  return (
    <div className="navbar">
        <div className="menu-btn">
            
        </div>
      <div className="title">
          <LogoIcon size={100} color="black" />
        </div>
    </div>
  );
};

export default Navbar;