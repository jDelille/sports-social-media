import React from 'react';
import './widget.scss';
import useSidebar from '../../hooks/useSidebar';

type SignUpWidgetProps = {
 
 }
const SignUpWidget: React.FC<SignUpWidgetProps> = () => {
    const { handleOpenSignup } = useSidebar();

  return (
    <div className="widget">
            <p className="bold">New to Huddle?</p>
            <p className="description">Sign up now to join the community.</p>
            <button className="sign-up-btn" onClick={handleOpenSignup}>
              Sign up
            </button>
    </div>
  );
};

export default SignUpWidget;