import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BackIcon } from '../../icons';
import './pageHeader.scss';

type PageHeaderProps = {
    title: string;
    hasBack?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({title, hasBack}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  const handleBackClick = () => {
    if(!hasBack) {
      return;
    }
    navigate(-1)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
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
        <BackIcon size={22} color={"black"} />
      </div>
    )}
      <p>{title}</p>
    </div>
  );
};

export default PageHeader;