import React from 'react';
import useRegisterModal from '../hooks/useRegisterModal';
import useLoginModal from '../hooks/useLoginModal';
import './page.scss';

type LandingPageProps = {
 
 }
const LandingPage: React.FC<LandingPageProps> = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const handleOpenLogin = () => {
        loginModal.onOpen();
      };
    
      const handleOpenSignup = () => {
        registerModal.onOpen();
      };
  return (
    <div className="landing-page">
        <div className="content">
        <div className="text-column">
        <div className="text">
        <h1>Huddle</h1>
        <h2>Get in the huddle to hear all the sports betting news</h2>
        </div>
        <button>Create an account</button>
        <button onClick={handleOpenLogin}>Log in</button>
        <div className="disclaimer">
            <p>By continuing, you agree to our <span>terms of service</span> and <span>privacy policy</span></p>
        </div>
        <div className="creation-date">
            <h3>@2024 Huddle</h3>
        </div>
      </div>
      <div className="image-column-1">
        </div> 
      <div className="image-column-2">

        </div> 
        </div>
      

    </div>
  );
};

export default LandingPage;