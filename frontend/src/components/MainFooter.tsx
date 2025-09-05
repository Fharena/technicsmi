import React from 'react';

const MainFooter: React.FC = () => {
  return (
    <div className="main-footer-section">
      <div className="footer-bottom">
        <div className="footer-logo">
          <video 
            src="/홈페이지 소스정리/홈메인/tcs최하단 로고영상.mp4" 
            autoPlay 
            muted 
            loop 
            className="logo-video"
          />
        </div>
        
        <div className="footer-right-section">
          <div className="footer-motto">
            Rooted in craftsmanship,<br />
            Crafted with purpose
          </div>
          
          <div className="footer-contact">
            <div className="contact-row-1-col-1">
              <div className="contact-item">
                <span className="contact-label">Korea, goyang</span>
                <span className="contact-label">Isan.</span>
              </div>
            </div>
            
            <div className="contact-row-1-col-2">
              <div className="contact-item">
                <span className="contact-label">Instagram</span>
                <span className="contact-value">@tchajsk</span>
              </div>
            </div>
            
            <hr className="contact-divider" />
            
            <div className="contact-row-2-col-1">
              <div className="contact-item">
                <span className="contact-label">Technics e-mail</span>
                <span className="contact-value">sanjdnkjsk@gmail.com</span>
              </div>
            </div>
            
            <div className="contact-row-2-col-2">
              <div className="contact-item">
                <span className="contact-value">+82) 10-2901-3819</span>
              </div>
              <div className="contact-item">
                <span className="contact-value">+82) 10-2901-3819</span>
              </div>
              <div className="contact-item">
                <span className="contact-value">2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
