import React from 'react';
import './page.scss';

type LandingPageProps = {
 
 }
const LandingPage: React.FC<LandingPageProps> = () => {
  return (
    <div className="landing-page">
        <div className="content">
        <div className="text-column">
        <div className="text">
        <h1>Huddle</h1>
        <h2>Get in the huddle to hear all the sports betting news</h2>
        </div>
        <button>Create an account</button>
        <button>Log in</button>
        <div className="disclaimer">
            <p>By continuing, you agree to our <span>terms of service</span> and <span>privacy policy</span></p>
        </div>
        <div className="creation-date">
            <h3>@2024 Huddle</h3>
        </div>
      </div>
      <div className="image-column-1">
        <img src="../column-1.webp" alt="" />
        </div> 
      <div className="image-column-2">
      <img src="../column-2.webp" alt="" />

        </div> 
        </div>
      

    </div>
  );
};

export default LandingPage;