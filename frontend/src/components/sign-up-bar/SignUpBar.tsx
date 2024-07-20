import React from 'react';
import './signupbar.scss';
import useSidebar from '../../hooks/useSidebar';

type SignUpBarProps = {
    currentUser: any | null;
 }

const SignUpBar: React.FC<SignUpBarProps> = ({currentUser}) => {
    const {
        handleOpenLogin,
        handleOpenSignup,
      } = useSidebar();

      if(currentUser) {
        return null;
      }

  return (
    <div className='sign-up-bar'>
     <div className="text">
      <p className='bold'>Don't miss whats happening.</p>
      <p className='description'>Sign up now to join the community.</p>
     </div>
     <div className="btns">
        <button onClick={handleOpenSignup}>Sign up</button>
        <button onClick={handleOpenLogin}>Log in</button>
     </div>
    </div>
  );
};

export default SignUpBar;