import React, { useContext } from 'react';
import { LogoIcon } from '../../icons';
import { AuthContext } from '../../context/AuthContext';
import Avatar from '../avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import './navbar.scss';

type NavbarProps = {
 
 }
const Navbar: React.FC<NavbarProps> = () => {
  const {currentUser} = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/home')
  }

  return (
    <div className="navbar">
        <div className="menu-btn">
            <Avatar src={currentUser?.avatar}/>
        </div>
      <div className="title" >
          <LogoIcon size={100} color="black" onClick={handleLogoClick}/>
        </div>
    </div>
  );
};

export default Navbar;