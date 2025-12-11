import React from 'react';
import { useLocation } from 'react-router-dom';

const MainFooter: React.FC = () => {
  const location = useLocation();
  const isStockPage = location.pathname === '/stock' || location.pathname.startsWith('/stock/');

  return (
    <div className="main-footer-section">
      {/* 상단: 모토(왼쪽) + 로고(오른쪽) */}
      <div className="footer-top">
        <div className="footer-motto">
          Rooted in craftsmanship,<br />
          Crafted with purpose
        </div>
        <div className="footer-logo">
          {isStockPage ? (
            <img 
              src="/홈페이지 소스정리/로고.png" 
              alt="TCS Logo"
              className="logo-image"
              style={{ width: '350px', height: '100px', maxHeight: 'none', objectFit: 'contain' }}
            />
          ) : (
            <video
              src="/홈페이지 소스정리/홈메인/tcs최하단 로고영상.mp4"
              className="logo-video"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '350px', height: '100px', maxHeight: 'none', objectFit: 'contain' }}
            />
          )}
        </div>
      </div>
      
      {/* 하단: 회사 정보(왼쪽) + 연락처 정보(오른쪽) */}
      <div className="footer-info-section">
        <h3 className="company-info-title">COMPANY INFORMATION</h3>
        <div className="footer-info-grid">
          <div className="company-info">
            <div className="company-details">
              <p>Technics</p>
              <p>Korea, goyang,23-11, ILSAN-RO 427BEON-GIL, ILSANDONG-GU</p>
              <p>Business Registration No. 514-38-62454</p>
              <p>Representative: LEE JAE UK</p>
            </div>
            <div className="copyright">
              ©Technics 2025.
            </div>
          </div>
          
          <div className="contact-info">
            <p>Technics e-mail - tcsworkin@gmail.com</p>
            <p>instagram @tcs.textile</p>
            <p>call +82) 10-6680-1543</p>
            <p>Monday – Sunday: 9:00 AM – 6:00 PM</p>
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
