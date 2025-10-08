import React from 'react';
import ContactForm from '../components/ContactForm';
import MainFooter from '../components/MainFooter';
import '../styles/libra.css';

const Libra: React.FC = () => {
  return (
    <div className="libra-page">
      {/* Top Image Section */}
      <section className="libra-top-image">
        <img src="/홈페이지 소스정리/libra/1원단영상(대체예정).png" alt="Libra Fabric" />
      </section>

      {/* Hero Section with Video Background */}
      <section className="libra-hero">
        <video 
          className="libra-hero-video"
          src="/홈페이지 소스정리/libra/libra상단영상.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline
        />
        <div className="libra-hero-overlay">
          <div className="libra-hero-content">
            <div className="libra-hero-left">
              <div className="libra-hero-text">
                <h2>LIBRA COLLECTION</h2>
                <p className="libra-description">
                  The Libra Collection is crafted from 100% wool, delivering a soft and luxurious feel. 
                  Its distinctive texture and refined quality make it an ideal choice for premium apparel and textile applications.
                </p>
              </div>
            </div>
            <div className="libra-hero-right">
              <div className="libra-number">01</div>
            </div>
          </div>
          <div className="libra-hero-bottom">
            <div className="libra-feature">
              <h3>100% Wool, 100% Sophistication</h3>
              <p>Crafted from pure wool, the Libra Collection offers a naturally soft and refined touch. Its smooth texture and breathable comfort elevate both the look and feel of every garment, embodying timeless quality</p>
            </div>
            <div className="libra-feature">
              <h3>New Zealand Yarns, British Standards</h3>
              <p>We use New Zealand wool matched to the micron level of traditional British fabrics, delivering exceptional consistency, finesse, and structure. The result is a fabric that stands up to luxury tailoring standards.</p>
            </div>
            <div className="libra-feature">
              <h3>Tailored Elegance for Every Occasion</h3>
              <p>Whether worn as a custom suit or styled for casual or formal settings, the Libra Collection ensures a polished, graceful appearance. Designed for versatility, it transitions seamlessly from day to night.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />

      {/* Main Footer */}
      <MainFooter />
    </div>
  );
};

export default Libra;
