import React from 'react';
import ContactForm from '../components/ContactForm';
import MainFooter from '../components/MainFooter';
import '../styles/work.css';

const Work: React.FC = () => {

  return (
    <div className="work-page">
      {/* Hero Section */}
      <div className="work-hero">
        <div className="hero-background">
          <img 
            src="/홈페이지 소스v2/work/3원단 1.png" 
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
              Effortless style and comfort for<br/>
              every part of your day.
            </h1>
            <p className="hero-subtitle">Tailored Style for Business and Everyday Life</p>
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
                <span className="branding-text">WOOL 100</span>
              </div>
            </div>
            <div className="separator-bottom"></div>
            <p className="section-description">
              The Libra Collection embodies the perfect balance created by nature, crafted from 100% pure wool. Its deep hues shift subtly with the light, and its refined texture is born from the finest craftsmanship. Even over time, the fabric retains its shape and quality, gracefully adapting to the wearer while revealing deeper elegance.
            </p>
            <br></br>
            <p className="section-description">
              It is more than just cloth it represents a harmony between sustainability and nature. With its natural resilience, breathability, and gentle luster, the Libra Collection preserves timeless sophistication, seamlessly blending into daily life as a true fabric for modern classics.
            </p>
          </div>
        </div>
        <div className="column-right">
          <div className="image-container">
            <img 
              src="/홈페이지 소스v2/work/libra.png" 
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
                <span className="branding-text">80/20</span>
              </div>
            </div>
            <div className="separator-bottom"></div>
            <p className="section-description">
              The AQUARIUS Collection represents the harmony of technology and nature through its T/W 80/20 composition a perfect expression of Smart Material Balance that unites comfort and durability.
            </p>
            <br></br>
            <p className="section-description">
              Wool brings natural warmth and texture, while polyester adds strength and stability, creating a fabric that resists wrinkles and deformation even with frequent wear. Its smooth yet resilient hand feel flows naturally with movement, making the Aquarius Collection a true hybrid fabric that combines modern sensibility with lasting practicality.
            </p>
          </div>
        </div>
        <div className="column-right">
          <div className="image-container">
            <img 
              src="/홈페이지 소스v2/work/aqua.png" 
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
                <span className="branding-text">60/40</span>
              </div>
            </div>
            <div className="separator-bottom"></div>
            <p className="section-description">
              The FROMA Collection embodies the fusion of natural character and modern functionality through its T/W 80/20 composition. True to its name, Hybrid by Nature, it balances the refined texture of wool with the structural stability of polyester.
            </p>
            <br></br>
            <p className="section-description">
              Wool provides softness and breathability for everyday comfort, while polyester enhances strength and resilience, maintaining a clean silhouette over time. Resistant to wrinkles and deformation, it retains an elegant drape and sophisticated touch. The FROMA Collection moves naturally with the wearer a modern hybrid fabric that unites refined style with sustainable practicality.
            </p>
          </div>
        </div>
        <div className="column-right">
          <div className="image-container">
            <img 
              src="/홈페이지 소스v2/work/froma.png" 
              alt="Froma Model" 
              className="section-image"
            />
          </div>
        </div>
      </div>

      {/* 아래 섹션들은 별도 컴포넌트로 분리됨 (WorkDesignSection, Work3DModelSection, WorkProcessSection) */}
      {/* 필요시 import하여 사용 가능 */}

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <MainFooter />
    </div>
  );
};

export default Work;
