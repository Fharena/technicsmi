import React from 'react';
import { Link } from 'react-router-dom';
import { useRive } from '@rive-app/react-canvas';

const Home: React.FC = () => {
  // Rive 애니메이션 설정 - 리사이징 최적화
  const { RiveComponent } = useRive({
    src: '/홈페이지 소스정리/홈메인/technicsanime.riv',
    autoplay: true, // 자동재생 활성화
    // 안전한 layout 설정
    fit: 'contain', // 전체 애니메이션 보이기 (여백 생길 수 있음)
    alignment: 'center', // 중앙 정렬
  });

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
      
      <div className="home-section">
        <img src="/홈페이지 소스정리/홈메인/4.png" alt="홈메인 이미지 4" className="home-image" />
      </div>
      
      <div className="home-section">
        <img src="/홈페이지 소스정리/홈메인/5메인1 영상2(대체예정).png" alt="홈메인 이미지 5" className="home-image" />
      </div>
      
      <div className="home-footer">
        <video 
          src="/홈페이지 소스정리/홈메인/tcs최하단 로고영상.mp4" 
          autoPlay 
          muted 
          loop 
          className="footer-video"
        />
      </div>
      
      {/* Rive 애니메이션 */}
      <div className="rive-animation-section">
        <RiveComponent className="rive-animation" />
      </div>
    </div>
  );
};

export default Home;
