import React from 'react';
import ContactForm from '../components/ContactForm';
import MainFooter from '../components/MainFooter';
import '../styles/aqua.css';

const Aqua: React.FC = () => {

  return (
    <div className="aqua-page">
      {/* First Section - Image Only */}
      <section className="aqua-first-section">
        <img src="/홈페이지 소스정리/aqua/1.png" alt="Aqua" />
      </section>

      {/* Hero Section with Video Background */}
      <section className="aqua-hero">
        <video 
          className="aqua-hero-video"
          src="/홈페이지 소스정리/aqua/아쿠아1.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline
        />
        <div className="aqua-hero-overlay">
          <div className="aqua-hero-content">
            {/* Top Left Header */}
            <div className="aqua-header">
              <span className="aqua-number-small">02</span>
              <span className="aqua-collection-text">AQUARIUS COLLECTION</span>
            </div>

            {/* Main Content Grid */}
            <div className="aqua-main-grid">
              {/* Left Side - Title and Description */}
              <div className="aqua-left">
                <h1 className="aqua-title">AQUARIUS COLLECTION</h1>
                <p className="aqua-description">
                  Aquarius Collection is more than just fabric. It combines the sophistication of New Zealand wool with advanced textile technology to deliver softness, structure, and refined minimalism. Designed for the modern lifestyle, it offers reasonable luxury that flows with your rhythm.
                </p>
              </div>

              {/* Right Side - Features */}
              <div className="aqua-right">
                <div className="aqua-features">
                  <div className="aqua-feature">
                    <h3>British Class Softness with New Zealand Origins</h3>
                    <p>Crafted using premium wool from New Zealand matched to the same micron standard as luxurious British fabrics the Aquarius Collection offers a silky-smooth texture and refined touch.</p>
                  </div>
                  <div className="aqua-feature">
                    <h3>Optimized Blend for Everyday Wear</h3>
                    <p>With a well-balanced 80/20 wool-polyester composition, the fabric provides both the natural sophistication of wool and the durability of polyester.</p>
                  </div>
                  <div className="aqua-feature">
                    <h3>Advanced Carbon Finishing Touch</h3>
                    <p>To eliminate the rough texture often associated with synthetic fibers, advanced carbon finishing techniques have been applied. This process enhances the softness of the fabric, making it gentle against the skin.</p>
                  </div>
                  <div className="aqua-feature">
                    <h3>Detail Matters: Pulling</h3>
                    <p>The use of pulling technology adds a subtle three-dimensional texture to the surface, giving the fabric visual depth and a premium structure. This detail contributes to a more tailored silhouette and a polished overall appearance.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Large Number */}
            <div className="aqua-large-number">02</div>
          </div>
        </div>
      </section>

      {/* Aqua2 Image Section */}
      <section className="aqua-image-section">
        <img src="/홈페이지 소스정리/aqua/아쿠아2.png" alt="Aqua2" />
      </section>

      {/* Aqua3 Quote Section */}
      <div className="aqua-quote-section">
        <img 
          src="/홈페이지 소스정리/aqua/아쿠아3.png" 
          alt="Aqua3 Section Background" 
          className="aqua-quote-bg"
        />
        <div className="aqua-quote-content">
          <div className="main-quote">
            <span className="quote-mark">"</span>
            <h2 className="quote-text">Tailored Texture,<br />&nbsp;&nbsp;Timeless Touch."</h2>
          </div>
          <div className="sub-quotes">
            <div className="left-quote">
              <p>Precision in<br />Every Thread</p>
            </div>
            <div className="right-quote">
              <p>Designed to<br />Move with You</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <ContactForm />

      {/* Main Footer */}
      <MainFooter />
    </div>
  );
};

export default Aqua;