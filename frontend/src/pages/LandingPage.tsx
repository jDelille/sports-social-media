import React from 'react';
import useSidebar from '../hooks/useSidebar';
import { useNavigate } from 'react-router-dom';
import './page.scss';

type LandingPageProps = {
 
 }
const LandingPage: React.FC<LandingPageProps> = () => {
  const {
    handleOpenLogin,
    handleOpenSignup,
  } = useSidebar();

  const navigate = useNavigate();

  const continueWithoutSignin = () => {
    navigate('/home')
  }

  return (
    <div className="landing-page">
        <div className="content">
        <div className="text-column">
        <div className="text">
        <h1>Huddle</h1>
        <h2>Get in the huddle to hear all the sports betting news</h2>
        </div>
        <button onClick={handleOpenSignup}>Create an account</button>
        <button onClick={handleOpenLogin}>Log in</button>

        <div className='continue-without-signin'>
        <p onClick={continueWithoutSignin}>Continue without signing in</p>
        </div>
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