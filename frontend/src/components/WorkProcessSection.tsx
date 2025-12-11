import React, { useState } from 'react';
import '../styles/work.css';

const WorkProcessSection: React.FC = () => {
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
  );
};

export default WorkProcessSection;

