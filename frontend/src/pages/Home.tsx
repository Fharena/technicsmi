import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRive } from '@rive-app/react-canvas';

const Home: React.FC = () => {
  // 실시간 시계 상태
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);

  // 순환할 나라들 (한국 제외)
  const rotatableCountries = [
    { key: 'china', zone: 'Asia/Shanghai', label: 'CHINA', gmt: 'GMT+8' },
    { key: 'japan', zone: 'Asia/Tokyo', label: 'JAPAN', gmt: 'GMT+9' },
    { key: 'usa', zone: 'America/New_York', label: 'USA', gmt: 'GMT-5' },
    { key: 'uk', zone: 'Europe/London', label: 'UK', gmt: 'GMT+0' },
    { key: 'france', zone: 'Europe/Paris', label: 'FRANCE', gmt: 'GMT+1' }
  ];

  // 한국은 고정
  const koreaTimezone = { key: 'korea', zone: 'Asia/Seoul', label: 'KOREA', gmt: 'GMT+9' };

  // Rive 애니메이션 설정 - 리사이징 최적화
  const { RiveComponent } = useRive({
    src: '/홈페이지 소스정리/홈메인/technicsanime.riv',
    autoplay: true, // 자동재생 활성화
    // 안전한 layout 설정
    fit: 'contain', // 전체 애니메이션 보이기 (여백 생길 수 있음)
    alignment: 'center', // 중앙 정렬
  });

  // 실시간 시계 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 나라 순환 타이머
  useEffect(() => {
    const countryRotationTimer = setInterval(() => {
      // 플립 아웃 애니메이션 시작
      const rightTimeDisplay = document.querySelector('.time-display.right');
      const rightTimezoneItem = document.querySelector('.timezone-item.right');
      
      if (rightTimeDisplay && rightTimezoneItem) {
        // 기존 클래스 제거
        rightTimeDisplay.classList.remove('flip-in', 'flip-out');
        rightTimezoneItem.classList.remove('flip-in', 'flip-out');
        
        // 플립 아웃 시작
        rightTimeDisplay.classList.add('flip-out');
        rightTimezoneItem.classList.add('flip-out');
        
        // 200ms 후 내용 변경 및 플립 인 시작
        setTimeout(() => {
          setCurrentCountryIndex((prevIndex) => {
            return (prevIndex + 1) % rotatableCountries.length;
          });
          
          // 플립 아웃 제거 및 플립 인 시작
          rightTimeDisplay.classList.remove('flip-out');
          rightTimezoneItem.classList.remove('flip-out');
          rightTimeDisplay.classList.add('flip-in');
          rightTimezoneItem.classList.add('flip-in');
          
          // 플립 인 완료 후 클래스 제거
          setTimeout(() => {
            rightTimeDisplay.classList.remove('flip-in');
            rightTimezoneItem.classList.remove('flip-in');
          }, 400);
          
        }, 200);
      }
    }, 3000);

    return () => clearInterval(countryRotationTimer);
  }, [rotatableCountries.length]);

  // 시간 포맷 함수
  const formatTime = (date: Date, timezone: string) => {
    return date.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 시간대별 상태 메시지
  const getStatusMessage = (date: Date, timezone: string) => {
    const hour = parseInt(date.toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour12: false,
      hour: '2-digit'
    }));
    
    if (hour >= 6 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 18) return 'Getting ready to work';
    if (hour >= 18 && hour < 22) return 'Good evening';
    return 'Good night';
  };

  // 메시지 버튼 클릭 핸들러
  const handleMessageClick = () => {
    // 실제 메신저나 채팅 시스템으로 연결
    console.log('Opening message system...');
    // 예: 카카오톡, 텔레그램 등 연결
  };

  // 이메일 버튼 클릭 핸들러  
  const handleEmailClick = () => {
    window.location.href = 'mailto:contact@technics.com?subject=Inquiry about Technics&body=Hello, I would like to inquire about...';
  };

  const currentRotatingCountry = rotatableCountries[currentCountryIndex];

  return (
    <div className="home-page">
      <div className="home-hero">
          <img src="/홈페이지 소스정리/홈메인/1.png" alt="홈메인 이미지 1" className="home-image" />
      </div>
              <div className="home-text1">
          <div className="text-container">
            <h3 className="main-heading">
              Crafted for Classy Textiles,<br/>
              One Thread at a Time.
            </h3>
            
            <p className="sub-text">
              Technics aims for progress. It is a fabric created for better color,<br></br> 
              enhanced strength, improved friction, and greater durability.<br></br>
              We strive for excellence within the framework of fundamentals.
            </p>
            
            <div className="two-column-section">
              <hr></hr>
              <div className="column">
                <h3>Where Innovation Meets Texture</h3>
                <p>
                  At Technics, we believe that true innovation doesn't 
                  just live in laboratories — it's woven into the very 
                  fabric of possibility. Each thread is engineered to 
                  achieve optimal color clarity, enhanced resistance, 
                  and a refined tactile experience.
                </p>
              </div>
              
              <div className="column">
                <h3>Rooted in Fundamentals</h3>
                <p>
                  Our commitment to excellence begins with the 
                  basics: strong foundations, time-honored techniques, 
                  and careful attention to detail. By respecting these 
                  fundamentals, we elevate everyday textiles into 
                  enduring expressions of purpose and performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      
      <div className="home-section">
        <img src="/홈페이지 소스정리/홈메인/2.png" alt="홈메인 이미지 2" className="home-image" />
      </div>
      
      <div className="home-video-section">
        <video 
          src="/홈페이지 소스정리/홈메인/3홈무빙2영상.mp4" 
          autoPlay 
          muted 
          loop 
          className="home-video"
        />
      </div>
      
      {/* ABOUT 섹션 */}
      <div className="home-about-section">
        <div className="about-container">
          <div className="about-left">
            <p className="about-subtitle">Technics work in process</p>
            <h2 className="about-title">ABOUT</h2>
            <div className="about-purpose">
              <h3>Our purpose</h3>
              <p>Where creativity meets cutting edge tech.</p>
            </div>
            <div className="about-image">
              <img src="/홈페이지 소스정리/홈메인/4.png" alt="About 이미지" />
            </div>
          </div>
          
          <div className="about-right">
            <div className="about-mission">
              <p className="mission-text">
                Our mission is to provide innovative and high-performance technical fabrics that elevate 
                everyday life. We are committed to developing and exporting textiles that combine exceptional 
                durability, breathability, and comfort—designed to withstand the demands of daily use across 
                diverse climates and environments.
              </p>
              
              <p className="mission-subtitle">
                With a strong focus on sustainability, advanced material 
                engineering, and consistent quality, we aim to be a trusted global 
                partner to brands.
              </p>
              
              <Link to="/about" className="about-button">
                ABOUT
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* 제품 쇼케이스 섹션 - Rive 애니메이션과 스크롤 효과 연동용 */}
      <div className="products-showcase-section" data-scroll-section>
        <div className="showcase-container">
          <div className="showcase-grid">
            {/* FRÖMA 블록 - 왼쪽 상단 세로 */}
            <div className="showcase-item showcase-froma" data-scroll data-scroll-speed="0.5">
              <div className="showcase-content">
                <h3 className="showcase-title">FRÖMA</h3>
              </div>
            </div>
            
            {/* 하늘색 블록 - 가운데 상단 */}
            <div className="showcase-item showcase-sky" data-scroll data-scroll-speed="0.4">
              <div className="showcase-content">
                {/* 이미지 없이 컬러만 */}
              </div>
            </div>
            
            {/* 오렌지색 블록 - 오른쪽 세로 */}
            <div className="showcase-item showcase-orange" data-scroll data-scroll-speed="0.6">
              <div className="showcase-content">
                {/* 이미지 없이 컬러만 */}
              </div>
            </div>
            
            {/* AQUARIUS 블록 - 왼쪽 하단 */}
            <div className="showcase-item showcase-aquarius" data-scroll data-scroll-speed="0.3">
              <div className="showcase-content">
                <h3 className="showcase-title">AQUARIUS</h3>
              </div>
            </div>
            
            {/* 파란색 블록 - 가운데 중간 */}
            <div className="showcase-item showcase-blue" data-scroll data-scroll-speed="0.4">
              <div className="showcase-content">
                {/* 이미지 없이 컬러만 */}
              </div>
            </div>
            
            {/* LIBRA 블록 - 파란색 아래 */}
            <div className="showcase-item showcase-libra" data-scroll data-scroll-speed="0.7">
              <div className="showcase-content">
                <h3 className="showcase-title">LIBRA</h3>
              </div>
            </div>
            
            {/* 연보라색 블록 - 주황색 아래 */}
            <div className="showcase-item showcase-purple" data-scroll data-scroll-speed="0.5">
              <div className="showcase-content">
                {/* 이미지 없이 컬러만 */}
              </div>
            </div>
          </div>
          
          {/* Rive 애니메이션 연동 영역 */}
          <div className="rive-integration-area" data-scroll data-scroll-speed="0.1">
            <div className="rive-placeholder">
              {/* 나중에 Rive 애니메이션이 들어갈 자리 */}
              <div className="rive-content">
                <p>Interactive Animation Area</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      {/* Always On 섹션 */}
      <div className="always-on-section">
        <div className="always-on-background">
          <img src="/홈페이지 소스정리/홈메인/5메인1 영상2(대체예정).png" alt="Always On Background" className="always-on-bg-image" />
        </div>
        
        <div className="always-on-content">
          <div className="always-on-header">
            <h1 className="always-on-title">Always on</h1>
            
            <div className="timezone-info">
              <div className="timezone-row">
                <div className="time-display left">{formatTime(currentTime, koreaTimezone.zone)}</div>
                <span className="timezone-separator">/</span>
                <div className="time-display right">{formatTime(currentTime, currentRotatingCountry.zone)}</div>
              </div>
              
              <div className="timezone-labels">
                <div className="timezone-item left">
                  <span className="gmt-label">{koreaTimezone.gmt}</span>
                  <span className="location">{koreaTimezone.label}</span>
                  <span className="status">{getStatusMessage(currentTime, koreaTimezone.zone)}</span>
                </div>
                <div className="timezone-item right">
                  <span className="gmt-label">{currentRotatingCountry.gmt}</span>
                  <span className="location">{currentRotatingCountry.label}</span>
                  <span className="status">{getStatusMessage(currentTime, currentRotatingCountry.zone)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="always-on-description">
            <p>
              At Technic, precision meets purpose. Every fabric begins with a vision refined 
              through skilled hands, advanced techniques, and a relentless pursuit of quality. 
              From fiber to finish, we craft suiting materials that embody structure, movement, 
              and character. Designed to elevate, built to endure, made to be worn.
            </p>
          </div>
        
        </div>
      </div>
      
      {/* Contact Form Section */}
      <div className="contact-form-section">
        <div className="contact-form-container">
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your name" className="form-input" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your email" className="form-input" />
            </div>
            <div className="form-group">
              <textarea 
                placeholder="Your message" 
                className="form-textarea" 
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = '1.5em';
                  target.style.height = Math.max(target.scrollHeight, 36) + 'px';
                }}
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </div>
      </div>
      
      {/* Main Footer Section */}
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
      

      
      {/* Rive 애니메이션 */}
      <div className="rive-animation-section">
        <RiveComponent className="rive-animation" />
      </div>
    </div>
  );
};

export default Home;
