import React, { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import Model3D from '../components/Model3D';
import ContactForm from '../components/ContactForm';
import MainFooter from '../components/MainFooter';
import '../styles/work.css';

const Work: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // 모델링 파일 경로를 반환하는 함수
  const getModelPath = (productCode: string): string => {
    // 제품코드를 소문자로 변환하여 파일명과 일치시킴
    const modelPath = `/홈페이지 소스정리/work/${productCode.toLowerCase()}.glb`;
    console.log('Loading model:', modelPath); // 디버깅용
    return modelPath;
  };
  
  // 디폴트 모델 경로
  const defaultModelPath = "/홈페이지 소스정리/work/lqm12.glb";
  
  // 리브라 컬러 팔레트 데이터
  const libraColors = [
    { id: 'LQT01', code: '757575', name: 'T.L.GRAY' },
    { id: 'LQT02', code: '6F6E6E', name: 'T.GRAY' },
    { id: 'LQT03', code: '535252', name: 'T.D.GRAY' },
    { id: 'LQT04', code: '3A3838', name: 'T.D.GRAY' },
    { id: 'LQT05', code: '12142F', name: 'T.D.NAVY' },
    { id: 'LQT06', code: '0B0C1E', name: 'T.D.NAVY' },
    { id: 'LQT07', code: '0B0B0B', name: 'T.BLACK' },
    { id: 'LQT08', code: '4A2510', name: 'T.BROWN' },
    { id: 'LQT09', code: '351B00', name: 'T.D.BROWN' },
    { id: 'LQT10', code: 'A4824C', name: 'T.BEIGE' },
    { id: 'LQM11', code: '363333', name: 'M.L.GRAY' },
    { id: 'LQM12', code: '3A3838', name: 'M.D.GRAY' },
    { id: 'LQC13', code: '151735', name: 'M.L.NAVY' },
    { id: 'LQM14', code: '101129', name: 'M.D.NAVY' },
    { id: 'LQM15', code: '0C0D1F', name: 'M.D.NAVY' },
    { id: 'LQM16', code: '030303', name: 'M.BLACK' },
    { id: 'LQM17', code: 'EDE4D1', name: 'M.IVORY' },
    { id: 'LQP18', code: '3A3838', name: 'S.P.GRAY' },
    { id: 'LQP19', code: '1F2144', name: 'S.P.NAVY' },
    { id: 'LQC20', code: '282727', name: 'S.C.GRAY' },
    { id: 'LQC21', code: '060E28', name: 'S.C.NAVY' },
    { id: 'LQH22', code: '1B1D3F', name: 'H.NAVY' },
    { id: 'LQH23', code: '292626', name: 'H.GRAY' },
    { id: 'LQH24', code: '060606', name: 'H.BLACK' },
    { id: 'LQH25', code: '311A03', name: 'H.BROWN' },
    { id: 'LQH26', code: '424040', name: 'H.GRAY' },
    { id: 'LQH27', code: '2F2D2D', name: 'H.D.GRAY' },
    { id: 'LQH28', code: '19241A', name: 'H.KHAKI' },
    { id: 'LQH29', code: '1F2144', name: 'H.NAVY' },
    { id: 'LQT30', code: '1C1D2F', name: 'T.MNAVY' }
  ];
  
  // 아쿠아 컬러 팔레트 데이터
  const aquariusColors = [
    { id: '1022', code: 'E5E5E5', name: 'S.WHITE' },
    { id: '1023', code: 'E2CEB3', name: 'S.IVORY' },
    { id: '1024', code: '2D1600', name: 'S.BROWN' },
    { id: '1025', code: '818181', name: 'S.LGRAY' },
    { id: '1026', code: '4A4A4A', name: 'S.GRAY' },
    { id: '1027', code: '202020', name: 'S.DGRAY' },
    { id: '1028', code: '1A1D44', name: 'S.LNAVY' },
    { id: '1029', code: '151633', name: 'S.NAVY' },
    { id: '1030', code: '0D0F24', name: 'S.DNAVY' },
    { id: '1031', code: '080A1B', name: 'S.DNAVY' },
    { id: '1032', code: '000000', name: 'S.BLACK' },
    { id: '1033', code: 'E5E5E5', name: 'WHITE' },
    { id: '1035', code: 'E2CEB3', name: 'IVORY' },
    { id: '1036', code: '2D1600', name: 'BROWN' },
    { id: '2020', code: '818181', name: 'LGRAY' },
    { id: '2021', code: '4A4A4A', name: 'GRAY' },
    { id: '2022', code: '202020', name: 'DGRAY' },
    { id: '2023', code: '1A1D44', name: 'LNAVY' },
    { id: '2024', code: '151633', name: 'NAVY' },
    { id: '2025', code: '0D0F24', name: 'DNAVY' },
    { id: '2026', code: '080A1B', name: 'DNAVY' },
    { id: '2027', code: '000000', name: 'BLACK' },
    { id: '2028', code: 'E5E5E5', name: 'WHITE' },
    { id: '2029', code: 'E2CEB3', name: 'IVORY' },
    { id: '2030', code: '2D1600', name: 'BROWN' }
  ];
  
  const [selectedLibraColor, setSelectedLibraColor] = useState(libraColors[0]);
  const [selectedAquariusColor, setSelectedAquariusColor] = useState(aquariusColors[0]);
  const [isLibraOpen, setIsLibraOpen] = useState(true);
  const [isAquariusOpen, setIsAquariusOpen] = useState(false);
  const [isFromaOpen, setIsFromaOpen] = useState(false);
  
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
          <div className="model-left-section">
            <div className="model-3d-container">
            <Model3D 
              modelPath={getModelPath(isLibraOpen ? selectedLibraColor.id : isAquariusOpen ? selectedAquariusColor.id : selectedLibraColor.id)}
              className="work-3d-model"
              selectedColor={`#${isLibraOpen ? selectedLibraColor.code : isAquariusOpen ? selectedAquariusColor.code : selectedLibraColor.code}`}
              defaultModelPath={defaultModelPath}
            />
            </div>
            {/* 실물 제품 사진 */}
            <div className="product-photo-container">
              <img 
                src="/홈페이지 소스정리/work/2.png" 
                alt="Product View" 
                className="product-photo"
              />
            </div>
          </div>
          <div className="model-info">
            <div className="product-info">
              <h3 className="product-code">
                {isLibraOpen ? selectedLibraColor.id : isAquariusOpen ? selectedAquariusColor.id : 'LQT01'}
              </h3>
              <h4 className="product-name">
                {isLibraOpen ? selectedLibraColor.name : isAquariusOpen ? selectedAquariusColor.name : 'T.L.GRAY'}
              </h4>
            </div>
            <div className="color-options">
              <div className="color-category">
                <div className="category-header" onClick={() => {
                  setIsLibraOpen(!isLibraOpen);
                  if (!isLibraOpen) {
                    setIsAquariusOpen(false);
                    setIsFromaOpen(false);
                  }
                }}>
                  <span className="category-label">LIBRA</span>
                  <button className="toggle-button">
                    <HiChevronDown className={`toggle-icon ${isLibraOpen ? 'open' : ''}`} />
                  </button>
                </div>
                {isLibraOpen && (
                  <div className="color-swatches">
                    {libraColors.map((color) => (
                      <button
                        key={color.id}
                        className={`color-swatch ${selectedLibraColor.id === color.id ? 'selected' : ''}`}
                        style={{ backgroundColor: `#${color.code}` }}
                        onClick={() => setSelectedLibraColor(color)}
                        title={`${color.id} - ${color.name}`}
                      >
                        {selectedLibraColor.id === color.id && (
                          <span className="selected-label">LIBRA</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="color-category">
                <div className="category-header" onClick={() => {
                  setIsAquariusOpen(!isAquariusOpen);
                  if (!isAquariusOpen) {
                    setIsLibraOpen(false);
                    setIsFromaOpen(false);
                  }
                }}>
                  <span className="category-label">AQUARIUS</span>
                  <button className="toggle-button">
                    <HiChevronDown className={`toggle-icon ${isAquariusOpen ? 'open' : ''}`} />
                  </button>
                </div>
                {isAquariusOpen && (
                  <div className="color-swatches">
                    {aquariusColors.map((color) => (
                      <button
                        key={color.id}
                        className={`color-swatch ${selectedAquariusColor.id === color.id ? 'selected' : ''}`}
                        style={{ backgroundColor: `#${color.code}` }}
                        onClick={() => setSelectedAquariusColor(color)}
                        title={`${color.id} - ${color.name}`}
                      >
                        {selectedAquariusColor.id === color.id && (
                          <span className="selected-label">AQUA</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="color-category">
                <div className="category-header" onClick={() => {
                  setIsFromaOpen(!isFromaOpen);
                  if (!isFromaOpen) {
                    setIsLibraOpen(false);
                    setIsAquariusOpen(false);
                  }
                }}>
                  <span className="category-label">FRÖMA</span>
                  <button className="toggle-button">
                    <HiChevronDown className={`toggle-icon ${isFromaOpen ? 'open' : ''}`} />
                  </button>
                </div>
                {isFromaOpen && (
                  <div className="color-swatches">
                    {/* 프로마 컬러 스와치들 - 나중에 추가 예정 */}
                  </div>
                )}
              </div>
            </div>
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
