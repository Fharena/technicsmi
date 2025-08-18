import React from 'react';
import { Link } from 'react-router-dom';
import LiquidGlass from '../components/LiquidGlass';

const Home: React.FC = () => {
  return (
    <div className="home-page">
      <div className="home-hero">
          <img src="/홈페이지 소스정리/홈메인/1.png" alt="홈메인 이미지 1" className="home-image" />
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
    </div>
  );
};

export default Home;
