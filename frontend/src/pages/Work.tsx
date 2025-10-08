import React, { useState } from 'react';
import Model3D from '../components/Model3D';
import ContactForm from '../components/ContactForm';
import MainFooter from '../components/MainFooter';
import '../styles/work.css';

const Work: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const processImages = [
    '/홈페이지 소스정리/work/6.png',
    '/홈페이지 소스정리/work/6.png',
    '/홈페이지 소스정리/work/6.png',
    '/홈페이지 소스정리/work/6.png',
    '/홈페이지 소스정리/work/6.png',
    '/홈페이지 소스정리/work/6.png',
  ];

  return (
    <div className="work-page">
      {/* Hero Section */}
      <div className="work-hero">
        <div className="hero-background">
          <img 
            src="/홈페이지 소스정리/work/1영상(대체예정).png" 
            alt="Work Background" 
            className="hero-bg-img"
            onError={(e) => {
              console.log('Background image failed to load');
              e.currentTarget.style.display = 'none';
            }}
            onLoad={() => console.log('Background image loaded successfully')}
          />
        </div>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">
              The fabrics are knitted using the Swiss Shullzer 6300 model,<br/>
              which guarantees a level of yarn quality and knitting precision<br/>
              with British textiles.
            </h1>
          </div>
          <div className="hero-buttons">
            <button className="hero-btn">TEXTILE</button>
            <button className="hero-btn">2025</button>
            <button className="hero-btn">WORK</button>
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="work-two-column">
        <div className="column-left">
          <div className="text-content">
            <h2 className="section-title">LIBRA</h2>
            <div className="separator-top"></div>
            <div className="branding-points">
              <div className="branding-item">
                <span className="bullet">•</span>
                <span className="branding-text">Branding</span>
              </div>
              <div className="branding-item">
                <span className="bullet">•</span>
                <span className="branding-text">Branding</span>
              </div>
              <div className="branding-item">
                <span className="bullet">•</span>
                <span className="branding-text">Branding vvvv</span>
              </div>
              <div className="branding-item">
                <span className="bullet">•</span>
                <span className="branding-text">Branding</span>
              </div>
              <div className="branding-item">
                <span className="bullet">•</span>
                <span className="branding-text">Branding</span>
              </div>
            </div>
            <div className="separator-bottom"></div>
            <p className="section-description">
              Perfectly balanced elegance in every thread. Tailored for structure, movement, and timeless style. 
              Technics Libra brings refined simplicity to modern wear.
            </p>
          </div>
        </div>
        <div className="column-right">
          <div className="image-container">
            <img 
              src="/홈페이지 소스정리/work/2.png" 
              alt="Textile Model" 
              className="section-image"
            />
          </div>
        </div>
      </div>

      {/* AQUARIUS Section */}
      <div className="work-two-column">
        <div className="column-left">
          <div className="text-content">
            <h2 className="section-title">AQUARIUS</h2>
            <div className="separator-top"></div>
            <div className="branding-points">
              <div className="branding-item">
                <span className="bullet">•</span>
                <span className="branding-text">Branding</span>
              </div>
              <div className="branding-item">
                <span className="bullet">•</span>
                <span className="branding-text">Branding</span>
              </div>
              <div className="branding-item">
                <span className="bullet">•</span>
                <span className="branding-text">Branding</span>
              </div>
              <div className="branding-item">
                <span className="bullet">•</span>
                <span className="branding-text">Branding vvvv</span>
              </div>
              <div className="branding-item">
                <span className="bullet">•</span>
                <span className="branding-text">Branding</span>
              </div>
            </div>
            <div className="separator-bottom"></div>
            <p className="section-description">
              Engineered for performance in any condition. Water-repellent, breathable, and built to last. 
              Technics Aquarius is technical fabric, redefined.
            </p>
          </div>
        </div>
        <div className="column-right">
          <div className="image-container">
            <img 
              src="/홈페이지 소스정리/work/3.png" 
              alt="Aquarius Model" 
              className="section-image"
            />
          </div>
        </div>
      </div>

      {/* FRÖMA Section */}
      <div className="work-two-column">
        <div className="column-left">
          <div className="text-content">
            <h2 className="section-title">FRÖMA</h2>
            <div className="separator-top"></div>
            <div className="branding-points">
              <div className="branding-item">
                <span className="bullet">•</span>
                <span className="branding-text">Branding</span>
              </div>
              <div className="branding-item">
                <span className="bullet">•</span>
                <span className="branding-text">Branding</span>
              </div>
              <div className="branding-item">
                <span className="bullet">•</span>
                <span className="branding-text">Branding</span>
              </div>
              <div className="branding-item">
                <span className="bullet">•</span>
                <span className="branding-text">Branding vvvv</span>
              </div>
              <div className="branding-item">
                <span className="bullet">•</span>
                <span className="branding-text">Branding</span>
              </div>
            </div>
            <div className="separator-bottom"></div>
            <p className="section-description">
              Inspired by nature, designed for motion. Soft, durable, and consciously made. 
              Technics Froma adapts to life in motion.
            </p>
          </div>
        </div>
        <div className="column-right">
          <div className="image-container">
            <img 
              src="/홈페이지 소스정리/work/4.png" 
              alt="Froma Model" 
              className="section-image"
            />
          </div>
        </div>
      </div>

      {/* DESIGNING FABRICS Section */}
      <div className="work-design-section">
        <div className="design-content">
          <div className="design-title-container">
            <div className="title-top">
              <h2 className="design-title-line">DESIGNING</h2>
              <h2 className="design-title-line">FABRICS WITH</h2>
            </div>
            <div className="title-bottom">
              <div className="title-image">
                <img 
                  src="/홈페이지 소스정리/work/5.png" 
                  alt="Fabric Swatches" 
                  className="fabric-image"
                />
              </div>
              <div className="title-right">
                <h2 className="design-title-line">PURPOSE +</h2>
                <h2 className="design-title-line">PRECISION</h2>
              </div>
            </div>
            <div className="design-text-container">
              <p className="design-paragraph">
                Every fabric we create begins with a clear purpose — to solve real needs, elevate design, and endure over time. 
                We don't just produce textiles; we craft them with intent, ensuring that every thread serves both function and meaning.
              </p>
              <p className="design-paragraph">
                Precision is embedded in our process — from fiber selection to final weave, every detail is carefully considered.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Model Section */}
      <div className="work-3d-section">
        <div className="model-3d-content">
          <div className="model-info">
            <h3 className="model-number">4060</h3>
            <div className="color-options">
              <div className="color-category">
                <span className="category-label">LIBRA</span>
                <div className="color-swatches">
                  {/* 컬러 스와치들 */}
                </div>
              </div>
              <div className="color-category">
                <span className="category-label">AQUARIUS</span>
                <div className="color-swatches">
                  {/* 컬러 스와치들 */}
                </div>
              </div>
              <div className="color-category">
                <span className="category-label">FRÖMA</span>
                <div className="color-swatches">
                  {/* 컬러 스와치들 */}
                </div>
              </div>
            </div>
          </div>
          <div className="model-3d-container">
            <Model3D 
              modelPath="/홈페이지 소스정리/work/lqm12.glb" 
              className="work-3d-model"
            />
          </div>
        </div>
      </div>

      {/* PROCESS Section */}
      <div className="work-process-section">
        <div className="process-content">
          <div className="process-left">
            <h2 className="process-title">PROCESS</h2>
            <div className="process-pagination">
              {processImages.map((_, index) => (
                <button
                  key={index}
                  className={`pagination-dot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="process-center">
            <div className="main-image-container" style={{ background: 'transparent' }}>
              <img 
                src={processImages[currentSlide]} 
                alt={`Process ${currentSlide + 1}`}
                className="main-process-image"
                style={{
                  filter: 'none',
                  opacity: 1,
                  transform: 'none',
                  imageRendering: 'crisp-edges',
                  objectFit: 'contain'
                }}
              />
            </div>
            <div className="process-description">
              <p>At Technics, we design fabrics with precision and purpose.</p>
              <p>Every material is developed to combine durability, comfort, and smart functionality — made to perform beautifully in everyday life.</p>
            </div>
          </div>
          
          <div className="process-right">
            <div className="thumbnail-list">
              {processImages.map((image, index) => (
                <div
                  key={index}
                  className={`thumbnail-item ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <MainFooter />
    </div>
  );
};

export default Work;
