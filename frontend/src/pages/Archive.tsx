import React from 'react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import MainFooter from '../components/MainFooter';
import TimelineTable from '../components/TimelineTable';
import type { TimelineItem } from '../components/TimelineTable';

const Archive: React.FC = () => {
  // 타임라인 데이터 정의
  const timelineData: TimelineItem[] = [
    { year: "2025", title: "가나다라마바사", description: "가나다라마바사아자차카타파하가나다라마바사아자차카파파하하하" },
    { year: "2025", title: "가나다라마바사아자차", description: "가나다라마바사아자차차차차" },
    { year: "2025", title: "가나다라마바사아자차카타파", description: "가나다라마바사가나다라마바사아자차카타파하하아자차카차파하하하아자차" },
    { year: "2025", title: "가나다라마바사아자", description: "가나다라마바사아 아자" },
    { year: "2025", title: "가나다라마바", description: "가나다라마바사아자차카타파아자카치파파하아자" },
    { year: "2025", title: "가나다라", description: "가나다라마바사가나다라마바사아자차카차파하" },
    { year: "2025", title: "가나다라마", description: "가나다라마바사 가나다라마바사아자차카타파하가나다라마바사아자차카" },
    { year: "2025", title: "가나", description: "가나다라마바사아자아, 가나다라마바사아자차카파하하가나다라마" },
    { year: "2025", title: "가나다라마바사", description: "가나다라마바사가나다라마아자타카타차파하하하하아" },
    { year: "2025", title: "가나다라마바사아자차카타파", description: "가나다라마바사가나다라마아자타카타차파하하하하아가나 (가나)" },
    { year: "2025", title: "가나다라마바사아자", description: "가나다라마바사아자 가나다라마아자타카타차파하하하하아" },
    { year: "2025", title: "가나다라마바사", description: "가나다라마바사가나다라마아자타카타차파하하하하아" },
    { year: "2025", title: "가나다라마바사아자차카타파", description: "가나다라마바사아자차카타파하아자차 가나다라마아자타카타차" },
    { year: "2025", title: "가나다라마바사", description: "가나다라마바사 가나다라마아자타카타차파" },
    { year: "2025", title: "가나다라마바", description: "가나다라마바 가나다라마아자타카타차파하하하하아 가나다라마아" },
    { year: "2025", title: "가나다라", description: "가나다라 아자차카차, 가나다라마아자타카타차파하하하하아히." },
    { year: "2025", title: "가나다라마", description: "가나다라마가나다라마아자타카타차파하하하하아가나다라마아자타카타차파하" },
    { year: "2025", title: "가나다라마바사아자", description: "가나다라마바사아자가나다라마아자타카타차파하하하하아" },
    { year: "2025", title: "가나", description: "가나가나다라마아자타카타차파하하하하아 아자차카차파하다하" },
    { year: "2025", title: "가나다라", description: "가나다라가나다라마아자타카타차파하하하하아 라라" }
  ];

  return (
    <div className="archive-page">
      {/* Hero Section */}
      <section className="archive-hero">
        <div className="hero-background">
          <img 
            src="/홈페이지 소스정리/아카이브/1.png" 
            alt="Archive Hero" 
            className="hero-bg-img"
          />
        </div>
        <div className="hero-overlay">

          
          {/* Hero Content */}
          <div className="hero-content">
            <h1 className="hero-title">
              This archive presents the visuals, structures, and aesthetic references that inform our work.
            </h1>
            <p className="hero-subtitle">
              What we make. What we design.
            </p>
          </div>
          
          {/* Hero Buttons */}
          <div className="hero-buttons">
            <span className="hero-btn">Technics</span>
            <span className="hero-btn">2025</span>
            <span className="hero-btn">Textile</span>
          </div>
        </div>
      </section>

      {/* Text and Image Section */}
      <section className="text-image-section">
        <div className="text-image-container">
          <div className="text-top">
            <p className="section-text">
              We believe identity is built, not declared. These are the fragments we gather to build ours.
            </p>
          </div>
          <div className="image-full">
            <img 
              src="/홈페이지 소스정리/아카이브/2.png" 
              alt="Fabric and Book" 
              className="section-img"
            />
          </div>
        </div>
      </section>

      {/* Collage and Text Section */}
      <section className="collage-text-section">
        <div className="collage-text-container">
          <div className="collage-left">
            <img 
              src="/홈페이지 소스정리/아카이브/3.png" 
              alt="Design Collage" 
              className="collage-img"
            />
          </div>
          <div className="text-right">
            <p className="collage-text">
              We believe the best work comes from diverse minds coming together. From designers to developers, strategists to storytellers, everyone has a voice at the table. Collaboration fuels our creativity, and we thrive on open communication, mutual respect and the kind of teamwork that turns challenges into opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Main Statement Section */}
      <section className="statement-section">
        <div className="statement-container">
          <h2 className="main-statement">
            Great ideas dont happen in isolation. They are born through conversation, challenged through debate, and refined through collaboration.
          </h2>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="values-container">
          <div className="values-left">
            <h3 className="values-title">What We Stand For</h3>
            <p className="values-text">
              We believe that how we work matters as much as what we make. Our values guide every decision grounded in respect, curiosity, clarity, and care. These aren't just words. They are the quiet structure behind everything we build.
            </p>
          </div>
          <div className="values-right">
            <h3 className="values-title">Our Values, Lived Daily</h3>
            <p className="values-text">
              Respect, honesty, and curiosity aren't just words we hang on a wall. They show up in every conversation, every collaboration, every choice. We live our values not for appearance, but for alignment.
            </p>
          </div>
        </div>
      </section>

      {/* Label Section */}
      <section className="label-section">
        <div className="label-container">
          <h2 className="label-title">LABEL</h2>
          <div className="label-content">
            <div className="label-left">
              <p className="label-text">
                With Libra, we drew inspiration from the constellation of Aries-bold, instinctive, and driven by origin. These qualities are woven into every line, form, and function of the product
              </p>
              <span className="label-collection">LIBRA COLLECTION</span>
            </div>
            <div className="label-divider"></div>
            <div className="label-right">
              <p className="label-text">
                In FRÖMA, we echo the language of architecture rigorous lines, intentional spaces, and subtle tension, all woven into tactile form.
              </p>
              <span className="label-collection">FRÖMA collection</span>
            </div>
          </div>
        </div>
      </section>

      {/* Images Section */}
      <section className="images-section">
        <div className="images-container">
          <div className="image-left">
            <img 
              src="/홈페이지 소스정리/아카이브/a.png" 
              alt="Aries Constellation" 
              className="constellation-img"
            />
          </div>
          <div className="image-right">
            <img 
              src="/홈페이지 소스정리/아카이브/b.png" 
              alt="Modern Staircase" 
              className="staircase-img"
            />
          </div>
        </div>
      </section>

      {/* Timeline Table Section */}
      <TimelineTable items={timelineData} />

      {/* Contact Form */}
      <ContactForm />

      {/* Main Footer */}
      <MainFooter />

    </div>
  );
};

export default Archive;
