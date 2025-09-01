import React from 'react';
import '../styles/about.css';

const About: React.FC = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-background">
          <img 
            src="/홈페이지 소스정리/ABOUT/1어바웃 영상 1(대체예정).png" 
            alt="About Background" 
            className="hero-bg-img"
            onError={(e) => {
              console.log('Background image failed to load');
              e.currentTarget.style.display = 'none';
            }}
            onLoad={() => console.log('Background image loaded successfully')}
          />
        </div>
        <div className="hero-overlay">
          <nav className="hero-nav">
            <span className="nav-dot active"></span>
            <span className="nav-text">HOME</span>
          </nav>
          <div className="hero-content">
            <h1 className="hero-title">
              Effortless style and comfort for<br/>
              every part of your day.
            </h1>
            <p className="hero-subtitle">Tailored Style for Business and Everyday Life</p>
          </div>
          <div className="hero-buttons">
            <button className="hero-btn">Technics</button>
            <button className="hero-btn">2025</button>
            <button className="hero-btn">Textile</button>
          </div>
        </div>
      </div>

      {/* New Zealand Wool Section */}
      <div className="wool-section">
        <div className="wool-header">
          <span className="header-item">Technics</span>
          <span className="header-item">Textile</span>
          <span className="header-item">M.I</span>
        </div>
        
        <div className="wool-content">
          <h2 className="wool-title">Crafted for Classy Textiles, One Thread at a Time.</h2>
          <p className="wool-description">
            To maintain consistent quality, we've partnered with specialized private institutions to ensure
          </p>
        </div>
        
        <div className="wool-image">
          <img 
            src="/홈페이지 소스정리/ABOUT/2.png" 
            alt="New Zealand Wool - Young people with bicycles" 
            className="wool-bg-img"
            onError={(e) => {
              console.log('Wool section image failed to load');
              e.currentTarget.style.display = 'none';
            }}
            onLoad={() => console.log('Wool section image loaded successfully')}
          />
        </div>
      </div>

      {/* The brief Section */}
      <section className="brief-section">
        <div className="brief-container">
          <div className="brief-left">
            <p className="brief-eyebrow">The brief</p>
            <h3 className="brief-title">Crafted for Classy Textiles, One Thread at a Time.</h3>
            <p className="brief-body">
              Technics aims for progress. It is a fabric created for better color, enhanced strength, improved
              friction, and greater durability. We strive for excellence within the framework of fundamentals.
            </p>
            <p className="brief-body">
              We strive for excellence, not through shortcuts, but through dedication to the core principles
              of design, performance, and integrity.
            </p>
          </div>
          <div className="brief-right">
            <img
              src="/홈페이지 소스정리/ABOUT/3.png"
              alt="Crafted textiles showroom"
              className="brief-image"
              onError={(e) => { console.log('Brief image failed to load'); e.currentTarget.style.display = 'none'; }}
            />
          </div>
        </div>
      </section>

      {/* Crafted Media + Text Section */}
      <section className="crafted-section">
        <div className="crafted-media">
          <video
            className="crafted-video"
            src="/홈페이지 소스정리/ABOUT/4어바웃 WEAVING 영상.mp4"
            poster="/홈페이지 소스정리/ABOUT/4.png"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
        <div className="crafted-text">
          <h3 className="crafted-title">Crafted for Classy Textiles, One Thread at a Time.</h3>
          <p className="crafted-desc">
            Technics aims for progress. It is a fabric created for better color, enhanced strength, improved
            friction, and greater durability. We strive for excellence within the framework of fundamentals.
          </p>
          <p className="crafted-desc">
            We strive for excellence, not through shortcuts, but through dedication to the core principles of
            design, performance, and integrity.
          </p>
        </div>
      </section>

      {/* Image Collage Section */}
      <section className="collage-section">
        <div className="collage-grid">
          <div className="collage-item collage-top-left">
            <img 
              src="/홈페이지 소스정리/ABOUT/a.png" 
              alt="Textile crafting process" 
              className="collage-img"
              onError={(e) => { console.log('Collage image 5 failed to load'); e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="collage-item collage-top-right">
            <img 
              src="/홈페이지 소스정리/ABOUT/b.png" 
              alt="Pastoral landscape with sheep" 
              className="collage-img"
              onError={(e) => { console.log('Collage image 6 failed to load'); e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <div className="collage-item collage-bottom">
            <img 
              src="/홈페이지 소스정리/ABOUT/c.png" 
              alt="Golden field landscape" 
              className="collage-img"
              onError={(e) => { console.log('Collage image 7 failed to load'); e.currentTarget.style.display = 'none'; }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
