import React, { useContext } from 'react';
import './navbar.scss';
import { LogoIcon } from '../../icons';
import { AuthContext } from '../../context/AuthContext';
import Avatar from '../avatar/Avatar';

type NavbarProps = {
 
 }
const Navbar: React.FC<NavbarProps> = () => {
  const {currentUser} = useContext(AuthContext) || {};
  return (
    <div className="navbar">
        <div className="menu-btn">
            <Avatar src={currentUser.avatar}/>
        </div>
      <div className="title">
          <LogoIcon size={100} color="black" />
        </div>
    </div>
  );
};

export default Navbar;