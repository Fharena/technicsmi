import React from 'react';
import TimelineTable from '../components/TimelineTable';
import type { TimelineItem } from '../components/TimelineTable';
import ContactForm from '../components/ContactForm';
import MainFooter from '../components/MainFooter';

const Archive1: React.FC = () => {
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
    { year: "2025", title: "가나다라마바사아자차카타파", description: "가나다라마바사가나다라마아자타카타차파하하하하아가나 (가나)" }
  ];

  return (
    <div className="archive1-page">
      {/* Header Section */}
      <section className="archive1-header">
        <div className="header-container">
          <div className="logo-section">
            <img src="/홈페이지 소스정리/아카이브1/1.png" alt="TECHNICS Logo" className="logo-image"/>
          </div>
          <div className="right-content">
            <div className="description-section">
              <div className="description-english">
                <p>Beyond protection and logistics, packaging can function as a tangible medium for communicating brand identity and information. Technics seeks to develop a shipping box optimized for wool fabrics, with structural stability and visual clarity as core considerations. This archive aims to analyze the functional and visual requirements of packaging, and to propose a form that aligns with the brand's values.</p>
              </div>
              <div className="description-korean">
                <p>패키지는 제품을 보호하고 운송하는 기능 외에도, 브랜드의 정체성과 정보를 전달하는 물리적 매개체로 활용될 수 있습니다. Technics는 울 원단의 특성을 고려하여, 구조적 안정성과 시각적 명확성을 갖춘 박스 디자인을 구축하고자 했습니다. 본 아카이브는 택배 박스의 기능적 요건과 디자인 방향성을 체계적으로 분석하고, 브랜드에 부합하는 패키지 형태를 제안하는 것을 목표로 합니다.</p>
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
                  <span className="detail-value">Designing a shipping box that reflects Technics' brand values and material philosophy</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Deliverables</span>
                  <span className="detail-value">Packaging design, Structural prototyping, Material specification</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Industries</span>
                  <span className="detail-value">Textile / Fashion Logistics</span>
                </div>
              </div>
              <div className="details-column">
                <div className="detail-item">
                  <span className="detail-label">Materials</span>
                  <span className="detail-value">Corrugated cardboard, Kraft paper label</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Techniques</span>
                  <span className="detail-value">Die-cutting, Single-color flexographic printing</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Client</span>
                  <span className="detail-value">Technics (In-house project)</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Collaborators</span>
                  <span className="detail-value">
                    — Technics Design Team — Packaging direction & development<br/>
                    — Local manufacturer (undisclosed) — Prototyping & production<br/>
                    — Product Team — Material compatibility and transport safety review
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

      {/* Images Section */}
      <section className="archive1-images">
        <div className="images-layout">
          {/* Top Image - Right Aligned 60% */}
          <div className="image-top">
            <img src="/홈페이지 소스정리/아카이브1/2.png" alt="Stacked Packaging Boxes" className="right-aligned-image"/>
          </div>
          
          {/* Middle Images - Two Side by Side */}
          <div className="image-middle">
            <div className="image-left">
              <img src="/홈페이지 소스정리/아카이브1/3.png" alt="Box Certificate Stamp" className="half-width-image"/>
            </div>
            <div className="image-right">
              <img src="/홈페이지 소스정리/아카이브1/4.png" alt="TECHNICS Logo Box" className="half-width-image"/>
            </div>
          </div>
          
          {/* Bottom Image - Right Aligned 60% */}
          <div className="image-bottom">
            <img src="/홈페이지 소스정리/아카이브1/5.png" alt="Computer Monitor Design" className="right-aligned-image"/>
          </div>
        </div>
      </section>

      {/* Text Section */}
      <section className="archive1-text">
        <div className="text-container">
          <div className="text-english">
            <p>Encountering the jjjjound box prompted us to reflect on packaging not as containment, but as a visual statement of intent. If a box is to carry Technics' wool fabric, it must speak a quiet language of structure and restraint—functional without being forceful, minimal without feeling empty. Every crease, every edge, and every moment of unboxing should echo the brand's philosophy. We propose this box not as mere protection, but as the first tactile expression of Technics itself.</p>
          </div>
          <div className="text-korean">
            <p>Jjj자운드의 박스를 처음 마주했을 때, 우리는 단순한 물리적 포장을 넘어 디자인이 어떻게 '태도'를 전달할 수 있는지를 고민하게 되었습니다. Technics의 원단을 담는 박스라면, 그 자체로 기능성과 정제된 인상을 동시에 전달해야 합니다. 단단하지만 과시적이지 않고, 단순하지만 비어 있지 않아야 하며, 열었을 때의 여백과 접힘의 감각이 곧 브랜드의 태도를 말해주어야 합니다. 우리는 이 박스를 단지 보호재가 아닌, Technics의 철학을 시각적으로 정리한 '첫 번째 터치'로 제안하고자 합니다.</p>
          </div>
        </div>
      </section>

      {/* Installation Art Section - 7, 8, 9 */}
      <section className="archive1-installation-section">
        <div className="installation-images-layout">
          {/* Top Images - Two Side by Side */}
          <div className="installation-image-top">
            <div className="image-left">
              <img src="/홈페이지 소스정리/아카이브1/7.png" alt="Cardboard Installation Art" className="half-width-image"/>
            </div>
            <div className="image-right">
              <img src="/홈페이지 소스정리/아카이브1/8.png" alt="Cardboard Maze Installation" className="half-width-image"/>
            </div>
          </div>
          
          {/* Bottom Image - Single Full Width */}
          <div className="installation-image-bottom">
            <img src="/홈페이지 소스정리/아카이브1/9.png" alt="Fashion Editorial with Cardboard" className="full-width-image"/>
          </div>
        </div>
      </section>

      {/* Next Section - 10, 11 */}
      <section className="archive1-next-section">
        <div className="next-images-layout">
          {/* Top Image - Right Aligned */}
          <div className="next-image-top">
            <img src="/홈페이지 소스정리/아카이브1/10.png" alt="Cardboard Installation Art" className="right-aligned-image"/>
          </div>
          
          {/* Bottom Image - Full Width */}
          <div className="next-image-bottom">
            <img src="/홈페이지 소스정리/아카이브1/11.png" alt="Fashion Editorial with Cardboard" className="full-width-image"/>
          </div>
        </div>
      </section>

      {/* Text and Fashion Section - 12, 13 */}
      <section className="archive1-text-fashion-section">
        {/* Text Section */}
        <div className="text-fashion-text">
          <div className="text-container">
            <div className="text-english">
              <p>Through the work of designer Niklas Hansen, we gained a renewed perspective. We learned that a shipping box isn't merely protective packaging or disposable waste after unboxing it can become a meaningful object that brings order and emotional depth to a space.</p>
            </div>
            <div className="text-korean">
              <p>우리는 디자이너 Niklas Hansen 작업을 통해 새로운 시각을 얻게 되었습니다. 택배 박스는 단순히 제품을 보호하는 포장재이자, 개봉 후 버려지는 부산물이 아니라, 공간을 정돈하고 감성을 더하는 하나의 오브젝트가 될 수 있다는 가능성을 배웠습니다.</p>
            </div>
          </div>
        </div>

        {/* Fashion Images Section */}
        <div className="fashion-images-layout">
          <div className="fashion-image-left">
            <img src="/홈페이지 소스정리/아카이브1/12.png" alt="Fashion Editorial 1" className="half-width-image"/>
          </div>
          <div className="fashion-image-right">
            <img src="/홈페이지 소스정리/아카이브1/13.png" alt="Fashion Editorial 2" className="half-width-image"/>
          </div>
        </div>
      </section>

      {/* Next Image Section - 14 */}
      <section className="archive1-next-image-section">
        <div className="next-image-container">
          <img src="/홈페이지 소스정리/아카이브1/14.png" alt="Next Image" className="full-width-image"/>
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

export default Archive1;