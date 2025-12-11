import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// import { useRive } from '@rive-app/react-canvas';
import ContactForm from '../components/ContactForm';
import MainFooter from '../components/MainFooter';
import '../styles/home.css';

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
  // const { RiveComponent } = useRive({
  //   src: '/홈페이지 소스정리/홈메인/technicsanime.riv',
  //   autoplay: true, // 자동재생 활성화
  //   // 안전한 layout 설정
  //   // fit: 'contain', // 전체 애니메이션 보이기 (여백 생길 수 있음) - 제거됨
  //   // alignment: 'center', // 중앙 정렬 - 제거됨
  // });

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
  // const handleMessageClick = () => { // 사용하지 않는 함수 주석 처리
  //   // 실제 메신저나 채팅 시스템으로 연결
  //   console.log('Opening message system...');
  //   // 예: 카카오톡, 텔레그램 등 연결
  // };

  // 이메일 버튼 클릭 핸들러  
  // const handleEmailClick = () => { // 사용하지 않는 함수 주석 처리
  //   window.location.href = 'mailto:contact@technics.com?subject=Inquiry about Technics&body=Hello, I would like to inquire about...';
  // };

  const currentRotatingCountry = rotatableCountries[currentCountryIndex];
  
  // 스크롤 애니메이션을 위한 ref
  const textSectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 스크롤 애니메이션 효과
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 부모 컨테이너에 visible 클래스 추가
            entry.target.classList.add('visible');
            // 부모 컨테이너 내의 모든 scroll-animate 요소에도 visible 클래스 추가
            const scrollAnimateElements = entry.target.querySelectorAll('.scroll-animate');
            scrollAnimateElements.forEach((el) => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    textSectionRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
        // 초기 로드 시 화면에 보이는 요소는 즉시 visible 클래스 추가
        const rect = ref.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight && rect.bottom > 0) {
          ref.classList.add('visible');
          const scrollAnimateElements = ref.querySelectorAll('.scroll-animate');
          scrollAnimateElements.forEach((el) => {
            el.classList.add('visible');
          });
      }
    }
    });

    return () => {
      textSectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="home-page">
      <div className="home-hero">
          <video 
            src="/홈페이지 소스v2/home/홈 메인영상 111.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline
            className="home-image"
          />
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
      
      <div className="home-text1" ref={(el) => { textSectionRefs.current[0] = el; }}>
          <div className="text-container">
            <h3 className="main-heading scroll-animate">
              Crafted for Classy Textiles,<br/>
              One Thread at a Time.
            </h3>
            
            <div className="sub-text-container">
              <div className="sub-text-left">
                <h3 className="sub-text-quote scroll-animate">
                  <span className="quote-line-first">Every process</span><br/>
                  <span className="quote-line-rest">refined to create</span><br/>
                  <span className="quote-line-rest">fabrics</span>
                </h3>
              </div>
              <div className="sub-text-right">
                <p className="sub-text scroll-animate">
                  Technics aims for progress. It is a fabric created for better color, enhanced strength, improved friction, and greater durability. We strive for excellence within the framework of fundamentals.
                </p>
                <p className="sub-text-korean scroll-animate">
                  테크닉스는 언제나 '더 나은 방향'을 향해 나아갑니다. 이 원단은 보다 선명하고 깊은 색감, 강화된 강도, 세밀하게 조정된 마찰감, 그리고 오랜 시간 형태를 유지할 수 있는 높은 내구성을 목표로 만들어졌습니다. 우리는 화려한 변화를 좇기보다, 기본에 충실한 완성도를 통해 진정한 품질을 추구합니다. 보이지 않는 곳에서도 원단의 본질을 다듬고, 그 안에서 기술과 감각의 균형을 찾아갑니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      
      {/* Innovation & Fundamentals 섹션 */}
      <div className="innovation-section">
        <div className="innovation-background">
          <img src="/홈페이지 소스v2/home/untitled.81 1.png" alt="Innovation Background" className="innovation-bg-image" />
        </div>
        
        <div className="innovation-content">
          {/* 우측 상단 텍스트 */}
          <div className="innovation-text-top" ref={(el) => { textSectionRefs.current[1] = el; }}>
            <h3 className="innovation-heading scroll-animate">Innovation Meets Texture</h3>
            <p className="innovation-text scroll-animate">
              We weave technology and build precision. TECHNICS explores new possibilities within the fine structure of every thread. Each fabric we create is the result of our process and conviction.
            </p>
            <p className="innovation-text-korean scroll-animate">
              우리는 기술을 짜고, 정밀함을 쌓습니다. TECHNICS는 실의 미세함 속에서 새로운 가능성을 탐구합니다. 직물 한 장은 우리의 철저한 과정과 신념으로 완성됩니다.
            </p>
          </div>
          
          {/* 좌측 하단 텍스트 */}
          <div className="innovation-text-bottom" ref={(el) => { textSectionRefs.current[2] = el; }}>
            <h3 className="innovation-heading scroll-animate">Rooted in Fundamentals</h3>
            <p className="innovation-text scroll-animate">
              Our commitment to excellence begins with the basics: strong foundations, time-honored techniques, and an obsession with quality. By mastering these fundamental, we elevate everyday textiles into enduring expressions of purpose and performance.
            </p>
            <p className="innovation-text-korean scroll-animate">
              테크닉스는 언제나 더 나은 방향을 향해 나아갑니다. 더 선명한 색감과 강화된 강도, 균형 잡힌 마찰감, 그리고 오랜 시간 형태를 유지하는 내구성을 위해 만들어진 원단, 우리는 기본의 틀 안에서 완성도를 다듬으며, 본질 속에서 품질의 기준을 새롭게 정의합니다.
            </p>
          </div>
        </div>
      </div>
      
      {/* Group 1460 이미지 섹션 */}
      <div className="group-image-section">
        <img src="/홈페이지 소스v2/home/Group 1460.png" alt="Group 1460" className="group-image" />
      </div>
      
      {/* Purpose 섹션 */}
      <div className="purpose-section">
        <div className="purpose-image-container">
          <img src="/홈페이지 소스v2/home/image 1633.png" alt="Purpose Background" className="purpose-image" />
          <div className="purpose-overlay" ref={(el) => { textSectionRefs.current[3] = el; }}>
            <h3 className="purpose-title scroll-animate">Our purpose</h3>
            <p className="purpose-subtitle scroll-animate">Where creativity meets cutting edge tech.</p>
            <Link to="/about" className="purpose-button scroll-animate">
              ABOUT
            </Link>
          </div>
        </div>
        
        <div className="purpose-content" ref={(el) => { textSectionRefs.current[4] = el; }}>
          <h2 className="purpose-content-title scroll-animate">ABOUT</h2>
          <p className="purpose-content-text scroll-animate">
            Our mission is to provide innovative and high performance technical fabrics that elevate everyday life. We are committed to developing and exporting textiles that combine exceptional durability, breath ability, and comfort designed to withstand the demands of daily use across diverse climates and environments.
          </p>
          <p className="purpose-content-text-korean scroll-animate">
            우리는 일상 속에서 더 나은 삶을 만들어가는 혁신적이고 고기능성 원단을 제공합니다. 탁월한 내구성과 통기성, 그리고 편안한 착용감을 모두 갖춘 섬유를 개발·수출하며, 다양한 기후와 환경 속에서도 언제나 안정적이고 쾌적한 품질을 유지할 수 있도록 설계합니다.
          </p>
          <p className="purpose-content-text scroll-animate">
            With a strong focus on sustainability, advanced material engineering, and consistent quality, we aim to be a trusted global partner to brands.
          </p>
          <p className="purpose-content-text-korean scroll-animate">
            지속가능성, 첨단 소재 기술, 그리고 일관된 품질을 핵심으로, 우리는 전 세계 브랜드가 신뢰할 수 있는 파트너가 되는 것을 목표로 합니다.
          </p>
        </div>
      </div>
      
      {/* Group 1458 이미지 섹션 (호버 효과) */}
      <div className="group-1458-section">
        <div className="group-1458-hover-container">
          <img 
            src="/홈페이지 소스v2/home/image 1658.png" 
            alt="Group 1458 기본" 
            className="group-1458-image-default"
          />
          <img 
            src="/홈페이지 소스v2/home/Group 1458.png" 
            alt="Group 1458 hover" 
            className="group-1458-image-hover"
          />
        </div>
      </div>
      
      {/* 속성 이미지 섹션 (호버 효과) */}
      <div className="attribute-section">
        <div className="attribute-hover-container">
          <img 
            src="/홈페이지 소스v2/home/속성 1=기본.png" 
            alt="속성 기본" 
            className="attribute-image-default"
          />
          <img 
            src="/홈페이지 소스v2/home/속성 1=베리언트2.png" 
            alt="속성 hover" 
            className="attribute-image-hover"
          />
        </div>
      </div>
      
      {/* Always On 섹션 */}
      <div className="always-on-section">
        <div className="always-on-background">
          <video 
            src="/홈페이지 소스v2/시계 하단영상.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline
            className="always-on-bg-image"
          />
        </div>
        
        <div className="always-on-content">
          <div className="always-on-header" ref={(el) => { textSectionRefs.current[5] = el; }}>
            <h1 className="always-on-title scroll-animate">Always on</h1>
            
            <div className="timezone-info scroll-animate">
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
          
          <div className="always-on-description" ref={(el) => { textSectionRefs.current[6] = el; }}>
            <p className="scroll-animate">
              At Technic, precision meets purpose. Every fabric begins with a vision refined 
              through skilled hands, advanced techniques, and a relentless pursuit of quality. 
              From fiber to finish, we craft suiting materials that embody structure, movement, 
              and character. Designed to elevate, built to endure, made to be worn.
            </p>
          </div>
        
        </div>
      </div>
      
      {/* Contact Form Section */}
      <ContactForm />
      
      {/* Main Footer Section */}
      <MainFooter />
      

      
    
    </div>
  );
};

export default Home;
