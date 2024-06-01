import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './pageHeader.scss';

type PageHeaderProps = {
    title: string;
    hasBack?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({title, hasBack}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isProfilePage = location.pathname.startsWith('/profile');

  const handleBackClick = () => {
    if(!hasBack) {
      return;
    }
    navigate(-1)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
      setShowButton(window.scrollY > 180);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
   <div className={`page-header ${isScrolled ? 'scrolled' : ''}`}>
    {hasBack && (
      <div className='back-icon' onClick={handleBackClick}>
        {/* <BackIcon size={22} color={"black"} /> */}
      </div>
    )}
      <p>{title}</p>
      {/* {isProfilePage && (
      <Button className={showButton ? 'show-btn' : 'hide-btn'}>Edit profile</Button>
      )} */}

      
    </div>
  );
};

export default PageHeader;