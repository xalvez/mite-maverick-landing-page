import React from 'react';
import './Footer.css';
// Import your assets here
import logo from '../../assets/images/Asset 7@4x.png';
import instaIcon from '../../assets/images/footer/instagram.png';
import linkedinIcon from '../../assets/images/footer/linkedin.png';
import whatsappIcon from '../../assets/images/footer/whatsapp.png';
import facebookIcon from '../../assets/images/footer/facebook.png';
import TelegramIcon from '../../assets/images/footer/Telegram.png';


const MiteFooter = () => {
  return (
    <footer className="mm-footer">
      <div className="mm-container">
        <div className="mm-top-section">
          {/* Logo Section */}
          <div className="mm-logo-container">
            <img src={logo} alt="Mite Maverick" className="mm-logo-img" />
          </div>

          {/* Social Links */}
          <div className="mm-social-wrapper">
            <a href="#" className="mm-social-icon"><img src={instaIcon} alt="Instagram" /></a>
            <a href="#" className="mm-social-icon"><img src={linkedinIcon} alt="LinkedIn" /></a>
            <a href="#" className="mm-social-icon"><img src={whatsappIcon} alt="WhatsApp" /></a>
            <a href="#" className="mm-social-icon"><img src={facebookIcon} alt="Facebook" /></a>
            <a href="#" className="mm-social-icon"><img src={TelegramIcon} alt="Facebook" /></a>
          </div>
        </div>

        <hr className="mm-divider" />

        <div className="mm-bottom-bar">
          <p className="mm-copyright">2025 Mite Maverick</p>
        </div>
      </div>
    </footer>
  );
};

export default MiteFooter;