import React from 'react';

const MainFooter: React.FC = () => {
  return (
    <div className="main-footer-section">
      <div className="footer-bottom">
        <div className="footer-logo">
          <img 
            src="/홈페이지 소스정리/로고.png" 
            alt="TCS Logo"
            className="logo-image"
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
                <span className="contact-label">23-11, ILSAN-RO 427BEON-GIL, ILSANDONG-GU</span>
              </div>
            </div>
            
            <div className="contact-row-1-col-2">
              <div className="contact-item">
                <span className="contact-label">instagram</span>
                <span className="contact-value">@tcs.textile</span>
              </div>
            </div>
            
            <hr className="contact-divider" />
            
            <div className="contact-row-2-col-1">
              <div className="contact-item">
                <span className="contact-label">Technics e-mail</span>
                <span className="contact-value">tcsworkin@gmail.com</span>
              </div>
            </div>
            
            <div className="contact-row-2-col-2">
              <div className="contact-item">
                <span className="contact-value">+82) 10-6680-1543</span>
              </div>
              <div className="contact-item">
                <span className="contact-value">2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 모바일 전용 연락처 섹션 */}
      <div className="mobile-contact-section">
        <h3 className="mobile-contact-title">CONTACT US</h3>
        <div className="mobile-contact-grid">
          <div className="mobile-contact-col">
            <p>tcsworkin@gmail.com</p>
            <p>+82) 10-6680-1543</p>
            <p>instagram</p>
            <p>@tcs.textile</p>
          </div>
          <div className="mobile-contact-col">
            <p>Korea, goyang</p>
            <p>23-11, ILSAN-RO 427BEON-GIL,</p>
            <p>ILSANDONG-GU</p>
            <p></p>
            <p>2025</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
