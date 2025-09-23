import React from 'react';
import TimelineTable from '../components/TimelineTable';
import type { TimelineItem } from '../components/TimelineTable';
import ContactForm from '../components/ContactForm';
import MainFooter from '../components/MainFooter';
import '../styles/archive7.css';

const Archive7: React.FC = () => {
  // 타임라인 데이터 정의
  const timelineData: TimelineItem[] = [
    { year: "2025", title: "Archive 7 Development", description: "Technics의 새로운 아카이브 프로젝트가 시작되었습니다." },
    { year: "2025", title: "Research Phase", description: "프로젝트의 연구 단계가 진행되었습니다." },
    { year: "2025", title: "Design Implementation", description: "디자인 구현 단계가 완료되었습니다." },
    { year: "2025", title: "Final Documentation", description: "최종 문서화 작업이 완료되었습니다." }
  ];

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
          </div>
        </div>
        
        {/* Project Details Table */}
        <div className="project-details">
          <div className="details-container">
            <div className="details-grid">
              <div className="details-column">
                <div className="detail-item">
                  <h4>Year</h4>
                  <p>2025</p>
                </div>
                <div className="detail-item">
                  <h4>Goal</h4>
                  <p>To explore how gesture, touch, and texture can communicate meaning beyond language.</p>
                </div>
                <div className="detail-item">
                  <h4>Deliverables</h4>
                  <p>Sensory-driven editorial content<br/>
                  Tactile language exploration for fabric branding<br/>
                  Visual and textural narrative for magazine</p>
                </div>
                <div className="detail-item">
                  <h4>Industries</h4>
                  <p>Textile / Cultural Communication / Design Research</p>
                </div>
              </div>
              
              <div className="details-column">
                <div className="detail-item">
                  <h4>Materials</h4>
                  <p>Hand gestures (archival and contemporary)<br/>
                  Motion data & softness index</p>
                </div>
                <div className="detail-item">
                  <h4>Techniques</h4>
                  <p>Multi-language gesture mapping<br/>
                  Softness vs motion correlation graphs<br/>
                  Editorial composition with tactile metaphors</p>
                </div>
                <div className="detail-item">
                  <h4>Client</h4>
                  <p>Technics (in-house project)</p>
                </div>
                <div className="detail-item">
                  <h4>Collaborators</h4>
                  <p>Visual Research Team — Gesture & semiotic structure<br/>
                  Fabric Lab — Fiber data, softness index mapping<br/>
                  Editorial Unit — Narrative building, bilingual writing</p>
                </div>
              </div>
              
              <div className="details-column">
                <div className="detail-item">
                  <h4>Awards</h4>
                  <p>—</p>
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

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="timeline-container">
          <TimelineTable items={timelineData} />
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
