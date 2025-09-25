import React from 'react';
import ArchiveTimelineSection from '../components/ArchiveTimelineSection';
import ContactForm from '../components/ContactForm';
import MainFooter from '../components/MainFooter';
import '../styles/archive7.css';

const Archive7: React.FC = () => {
  return (
    <div className="archive7-page">
      {/* Header Section */}
      <section className="archive7-header">
        <div className="header-container">
          <div className="logo-section">
            <img src="/홈페이지 소스정리/아카이브7/1.png" alt="TECHNICS Logo" className="logo-image"/>
          </div>
          <div className="right-content">
            <div className="description-section">
              <div className="description-english">
                <p>Before language, there was sensation. We gestured before we spoke. We felt before we explained. The hand became our first tool of meaning to communicate, to remember, to design. At Technics, we explore the language of fabric through what is not said, but felt. We look at structure like gesture, and softness as something built—not incidental. We learn from silence, build through touch, and design for what you can sense, even before you understand.</p>
              </div>
              <div className="description-korean">
                <p>언어보다 먼저, 감각이 있었습니다. 우리는 말보다 몸짓을 먼저 했습니다. 설명보다 먼저 느꼈습니다. 손은 의미의 첫 번째 도구가 되어 소통하고, 기억하고, 설계했습니다. 
                Technics 팀은 설명되지 않는 원단의 언어를 탐구합니다. 우리는 구조를 몸짓처럼 보고, 부드러움을 우연이 아닌 설계된 것으로 디자인합니다. 
                우리는 침묵에서 배우고, 손으로 구조하며, 이해보다 먼저 감각되는 것을 위해 디자인합니다.</p>
              </div>
            </div>
            
            {/* Project Details */}
            <div className="details-section">
              <div className="details-column">
                <div className="detail-item">
                  <span className="detail-label">Year</span>
                  <span className="detail-value">2025</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Goal</span>
                  <span className="detail-value">To explore how gesture, touch, and texture can communicate meaning beyond language.</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Deliverables</span>
                  <span className="detail-value">Sensory-driven editorial content<br/>
                    Tactile language exploration for fabric branding<br/>
                    Visual and textural narrative for magazine</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Industries</span>
                  <span className="detail-value">Textile / Cultural Communication / Design Research</span>
                </div>
              </div>
                
              <div className="details-column">
                <div className="detail-item">
                  <span className="detail-label">Materials</span>
                  <span className="detail-value">Hand gestures (archival and contemporary)<br/>
                    Motion data & softness index</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Techniques</span>
                  <span className="detail-value">Multi-language gesture mapping<br/>
                    Softness vs motion correlation graphs<br/>
                    Editorial composition with tactile metaphors</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Client</span>
                  <span className="detail-value">Technics (in-house project)</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Collaborators</span>
                  <span className="detail-value">Visual Research Team — Gesture & semiotic structure<br/>
                    Fabric Lab — Fiber data, softness index mapping<br/>
                    Editorial Unit — Narrative building, bilingual writing</span>
                </div>
              </div>
                
              <div className="details-column">
                <div className="detail-item">
                  <span className="detail-label">Awards</span>
                  <span className="detail-value">—</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collage Section */}
      <section className="collage-section">
        <div className="collage-container">
          <div className="archive7-collage-grid">
            {/* First Row - Two Images No Gap */}
            <div className="collage-row-first">
              <div className="collage-image-no-gap">
                <img src="/홈페이지 소스정리/아카이브7/2.png" alt="Collage Image 1" />
              </div>
              <div className="collage-image-no-gap">
                <img src="/홈페이지 소스정리/아카이브7/3.png" alt="Collage Image 2" />
              </div>
            </div>

            {/* Second Row - Two Images No Gap */}
            <div className="collage-row-second">
              <div className="collage-image-no-gap">
                <img src="/홈페이지 소스정리/아카이브7/4.png" alt="Collage Image 3" />
              </div>
              <div className="collage-image-no-gap">
                <img src="/홈페이지 소스정리/아카이브7/5.png" alt="Collage Image 4" />
              </div>
            </div>

            {/* Third Row - Single Image */}
            <div className="collage-row-third">
              <img src="/홈페이지 소스정리/아카이브7/6.png" alt="Collage Image 5" />
            </div>
          </div>
        </div>
      </section>

      {/* Text Section */}
      <section className="archive7-text-section">
        <div className="archive7-text-container">
          <div className="archive7-text-content">
            <h2>Before language, there was sensation. We understood the world first through senses—not through words. At Technics, we pay attention to this layer of perception, especially through the hand. Gesture, touch, tension, and texture—nonverbal communication has always existed. We explore how that silent language becomes visible through fabric.</h2>
            <p>언어보다 먼저, 감각이 있었습니다. 우리는 세상을 말보다 먼저 오감으로 이해했습니다. Technics는 이 감각의 층위, 그것에서도 '손'을 통한 인식과 진영에 주목합니다. 몸짓, 촉감, 긴장감, 질감 바이어의 소통은 언제나 존재해 왔으며, 우리는 그것이 원단 위에서 어떻게 드러나는지를 탐구합니다.</p>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="charts-section">
        <div className="charts-container">
          <div className="chart-item">
            <video autoPlay loop muted playsInline>
              <source src="/홈페이지 소스정리/아카이브7/7.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="chart-item">
            <video autoPlay loop muted playsInline>
              <source src="/홈페이지 소스정리/아카이브7/8.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* Images Section */}
      <section className="images-section">
        <div className="images-container">
          <div className="image-item">
            <img src="/홈페이지 소스정리/아카이브7/9.png" alt="Fabric Texture 1" />
          </div>
          <div className="image-item">
            <img src="/홈페이지 소스정리/아카이브7/10.png" alt="Fabric Texture 2" />
          </div>
          <div className="image-item">
            <img src="/홈페이지 소스정리/아카이브7/11.png" alt="Fabric Texture 3" />
          </div>
          <div className="image-item">
            <img src="/홈페이지 소스정리/아카이브7/12.png" alt="Fabric Texture 4" />
          </div>
        </div>
      </section>

      {/* Final Text Section */}
      <section className="final-text-section">
        <div className="final-text-container">
          <div className="final-text-content">
            <h2>Touch is more than a sensation—it is a structure.<br></br> At Technics, we treat softness not as a trait, but as a decision. Like a gesture, we design structure with intent. What you feel at your fingertips is not incidental— it is built, planned, and quietly speaks our language.</h2>
            <p>촉감은 단순한 감각이 아니라, 하나의 구조입니다. Technics는 부드러움을 하나의 성질이 아닌 하나의 선택으로 다룹니다. 몸짓처럼 구조를 설계하고, 손끝에서 느끼는 것들이 구조체 다. 그 촉감은 우연이 아니라 의도된 결과이며, 그 질감 속에서 우리는 우리만의 언어를 말합니다.</p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="timeline-container">
          <ArchiveTimelineSection />
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-container">
          <ContactForm />
        </div>
      </section>

      {/* Footer Section */}
      <MainFooter />
    </div>
  );
};

export default Archive7;
