import React from 'react';
import TimelineTable from '../components/TimelineTable';
import type { TimelineItem } from '../components/TimelineTable';
import ContactForm from '../components/ContactForm';
import MainFooter from '../components/MainFooter';
import '../styles/archive6.css';

const Archive6: React.FC = () => {
  // 타임라인 데이터 정의
  const timelineData: TimelineItem[] = [
    { year: "2025", title: "Archive 6 Development", description: "Technics의 새로운 아카이브 프로젝트가 시작되었습니다." },
    { year: "2025", title: "Research Phase", description: "프로젝트의 연구 단계가 진행되었습니다." },
    { year: "2025", title: "Design Implementation", description: "디자인 구현 단계가 완료되었습니다." },
    { year: "2025", title: "Final Documentation", description: "최종 문서화 작업이 완료되었습니다." }
  ];

  return (
    <div className="archive6-page">
      {/* Header Section */}
      <section className="archive6-header">
        <div className="header-container">
          <div className="logo-section">
            <img src="/홈페이지 소스정리/아카이브6/1.png" alt="TECHNICS Logo" className="logo-image"/>

          </div>
          <div className="right-content">
            <div className="description-section">
              <div className="description-english">
                <p>This piece centers on a factory process film produced by Technics. It is not a conventional brand video, but a visual structure—an articulation of how we make our fabrics, the logic behind each movement, and the clarity with which we choose to present it. Rather than relying on explanation, the film focuses on what can be understood through the process itself. Every sequence and transition reflects order, intention, and the discipline of making.</p>
              </div>
              <div className="description-korean">
                <p>Technics가 제작한 공장 공정 영상을 중심으로 구성된 작품입니다. 이는 영상은 단순한 브랜드 영상이 아니라, 우리가 원단을 만드는 방법, 각 움직임 뒤에 있는 논리, 그리고 그것을 어떻게 명확하게 보여줄지에 대한 시각적 구조입니다. 설명에 의존하기보다는, 공정 자체를 이해할 수 있는 것에 중점을 두었습니다. 모든 시퀀스와 전환은 질서, 의도, 그리고 제작의 규율을 반영합니다.</p>
              </div>
            </div>

            <div className="details-section">
              <div className="details-column">
                <div className="detail-item">
                  <span className="detail-label">Year</span>
                  <span className="detail-value">2025</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Goal</span>
                  <span className="detail-value">To document and communicate the precision-driven process behind Technics fabrics — in both product and presentation.</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Deliverables</span>
                  <span className="detail-value">
                    Factory process video<br/>
                    Editorial documentation for internal and external branding<br/>
                    Visual storytelling layout for magazines
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Industries</span>
                  <span className="detail-value">Textile / Manufacturing / Brand Communication</span>
                </div>
              </div>
              <div className="details-column">
                <div className="detail-item">
                  <span className="detail-label">Materials</span>
                  <span className="detail-value">
                    High-resolution digital footage<br/>
                    Process documentation<br/>
                    Mono-directional on-site audio
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Techniques</span>
                  <span className="detail-value">
                    Grid-aligned subtitle overlays<br/>
                    Textile-focused visual tone<br/>
                    Reference tagging: hue-lightness-temperature logic
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Client</span>
                  <span className="detail-value">Technics (In-house project)</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Collaborators</span>
                  <span className="detail-value">
                    Technics Fabric Team — Production process and site coordination<br/>
                    Creative Studio — Video direction and editorial structuring<br/>
                    Design Team — Tone consistency and brand translation measures<br/>
                    Brand Team — Palette communication & application rules
                  </span>
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

      {/* Next Section */}
      <section className="next-section">
        <div className="next-container">
          <div className="next-content">
            {/* Top Row - Two Images Side by Side */}
            <div className="next-row-top">
              <div className="next-image-left">
                <img src="/홈페이지 소스정리/아카이브6/2.png" alt="Manufacturing Process Left" />
              </div>
              <div className="next-image-right">
                <img src="/홈페이지 소스정리/아카이브6/3.png" alt="Manufacturing Process Right" />
              </div>
            </div>

            {/* Bottom Row - Single Large Image */}
            <div className="next-row-bottom">
              <img src="/홈페이지 소스정리/아카이브6/4.png" alt="Factory Equipment" />
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="image-gallery-section">
        <div className="image-gallery-container">
          <div className="image-gallery">


            {/* Row 2: Single image left aligned */}
            <div className="gallery-row-second">
              <img src="/홈페이지 소스정리/아카이브6/5.png" alt="Technical Process" />
            </div>

            {/* Row 3: Single image right aligned */}
            <div className="gallery-row-third">
              <img src="/홈페이지 소스정리/아카이브6/6.png" alt="Quality Control" />
            </div>
          </div>
        </div>
      </section>

      {/* Text Section */}
      <section className="text-section">
        <div className="text-container">
          <div className="text-content">
            <div className="text-english">
              <p>This is not a promotional piece. It is a visual construction that captures not only how our fabrics are made, but how we think about the act of making. Each sequence was designed to reveal intention through structure not performance, not narration, but process itself.</p>
            </div>
            <div className="text-korean">
              <p>이 영상은 단순한 홍보물이 아닙니다. 우리가 원단을 어떻게 만드는지 그뿐만 아니라 제작 행위 자체에 대해 어떻게 생각하는지를 담은 시각적 구조물입니다. 각 시퀀스는 연기나 내레이션이 아닌 공정 자체를 통해 의도를 드러내도록 설계되었습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Images Section */}
      <section className="final-images-section">
        <div className="final-images-container">
          <div className="final-images-row">
            <div className="final-image-left">
              <img src="/홈페이지 소스정리/아카이브6/7.png" alt="Manufacturing Process Detail" />
            </div>
            <div className="final-image-right">
              <img src="/홈페이지 소스정리/아카이브6/8.png" alt="Textile Production" />
            </div>
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

export default Archive6;
