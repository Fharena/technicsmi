import React from 'react';
import ArchiveTimelineSection from '../components/ArchiveTimelineSection';
import ContactForm from '../components/ContactForm';
import MainFooter from '../components/MainFooter';

const Archive2: React.FC = () => {
  return (
    <div className="archive2-page">
      {/* Header Section */}
      <section className="archive2-header">
        <div className="header-container">
          <div className="logo-section">
            <img src="/홈페이지 소스정리/아카이브2/1.png" alt="TECHNICS Staff Badge" className="logo-image"/>
          </div>
          <div className="right-content">
            <div className="description-section">
              <div className="description-english">
                <p>The Technics staff badge is designed not merely for identification, but as a key visual element that expresses the brand's professionalism and sophistication. Through the badge, staff are presented not just as employees, but as essential representatives of the brand's core values. This approach helps reinforce Technics' commitment to innovation and trust.</p>
              </div>
              <div className="description-korean">
                <p>테크닉스 스태프 명찰은 단순한 신분 확인용이 아니라, 브랜드의 전문성과 세련됨을 시각적으로 표현하는 중요한 매개체입니다. 명찰 디자인을 통해 스태프가 단순한 직원이 아닌, 브랜드 가치를 대표하는 핵심 멤버임을 알리고자 했습니다. 이를 통해 테크닉스가 추구하는 혁신과 신뢰의 이미지를 강화하고자 합니다.</p>
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
                  <span className="detail-value">To design an internal ID system that embodies Technics' design philosophy clarity, hierarchy, structure — and communicates the brand's core values even within its internal culture.</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Deliverables</span>
                  <span className="detail-value">Staff badge system (visual hierarchy, color mapping), Material & layout prototyping, Typography and role structuring standard</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Industries</span>
                  <span className="detail-value">Textile / Fashion / Brand Communication</span>
                </div>
              </div>
              <div className="details-column">
                <div className="detail-item">
                  <span className="detail-label">Materials</span>
                  <span className="detail-value">Laminated PVC + writable coating, Offset-printed identification cards, Backside applied with NFC or adhesive variants (optional)</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Techniques</span>
                  <span className="detail-value">Die-cutting, Single-color flexographic printing, Precision typography layout</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Client</span>
                  <span className="detail-value">Technics (In-house project)</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Collaborators</span>
                  <span className="detail-value">
                    — Technics Design Team — Identity & Structural Direction<br/>
                    — Branding Team — Typography & Color Mapping<br/>
                    — People & Culture Team — Role Hierarchy Logic & Naming Convention<br/>
                    — Material Lab — Durability testing & reusability studies
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
      <section className="archive2-images">
        <div className="images-layout">
          {/* Top Image - Right Aligned 60% */}
          <div className="image-top">
            <img src="/홈페이지 소스정리/아카이브2/2.png" alt="Staff Badge Design" className="right-aligned-image"/>
          </div>
          
          {/* Middle Images - Two Side by Side */}
          <div className="image-middle">
            <div className="image-left">
              <img src="/홈페이지 소스정리/아카이브2/3.png" alt="Badge Typography" className="half-width-image"/>
            </div>
            <div className="image-right">
              <img src="/홈페이지 소스정리/아카이브2/4.png" alt="TECHNICS Badge Logo" className="half-width-image"/>
            </div>
          </div>
          
          {/* Bottom Image - Right Aligned 60% */}
          <div className="image-bottom">
            <img src="/홈페이지 소스정리/아카이브2/5.png" alt="Badge System Overview" className="right-aligned-image"/>
          </div>
        </div>
      </section>

      {/* ID Cards Section */}
      <section className="archive2-id-cards">
        <div className="id-cards-layout">
          {/* 6번 - 왼쪽 */}
          <div className="id-card-left">
            <img src="/홈페이지 소스정리/아카이브2/6.png" alt="ID Card 6" className="id-card-image"/>
          </div>
          
          {/* 7번 - 오른쪽 */}
          <div className="id-card-right">
            <img src="/홈페이지 소스정리/아카이브2/7.png" alt="ID Card 7" className="id-card-image"/>
          </div>
          
          {/* 8번 - 왼쪽 */}
          <div className="id-card-left">
            <img src="/홈페이지 소스정리/아카이브2/8.png" alt="ID Card 8" className="id-card-image"/>
          </div>
          
          {/* Bottom Design Mockups */}
          <div className="id-cards-mockups">
            <div className="mockup-left">
              <img src="/홈페이지 소스정리/아카이브2/9.png" alt="White ID Card Mockup" className="mockup-image"/>
            </div>
            <div className="mockup-right">
              <img src="/홈페이지 소스정리/아카이브2/10.png" alt="Black ID Card Mockup" className="mockup-image"/>
            </div>
          </div>
        </div>
      </section>

      {/* Text Section */}
      <section className="archive2-text">
        <div className="text-container">
          <div className="text-english">
            <p>At TECHNICS, we believe that branding begins with the details. That's why our staff badges break away from the conventional format to reflect a design language that is uniquely ours. We've incorporated halftone and bitmap effects onto staff portraits — a nod to vintage printmaking, reimagined through a modern, digital lens. This creates a distinctive visual identity that blurs the line between analog and contemporary digital aesthetics. Far beyond a simple identification tag, this badge is part of the brand experience. Each staff member becomes a memorable extension of the TECHNICS brand — not just a name, but a visual icon.</p>
          </div>
          <div className="text-korean">
            <p>우리 테크닉스(TECHNICS) 회사의 스태프 명찰은 일반적인 명찰 디자인과는 확실한 차별화를 추구합니다. 단순한 정보 전달용 명찰이 아닌, 브랜드 아이덴티티와 감각적인 디자인 요소를 결합한 결과물입니다. 특히, 인물 사진에는 하프톤(Halftone) 효과를 적용하여, 디지털적이면서도 트렌디한 감성을 담아냈습니다. 이 시각적 표현은 아날로그 인쇄 기술에서 영감을 얻은 동시에, 현대적인 그래픽 스타일을 통해 테크닉스만의 창의적이고 독창적인 이미지를 전달합니다. 이러한 디자인 접근 방식은 단순한 식별을 넘어, 스태프 개개인이 브랜드의 일원으로서 하나의 '비주얼 아이콘'이 되도록 의도되었습니다. 명찰 하나에도 디자인 철학을 담는 것이, 우리 회사가 추구하는 디테일의 차별화입니다.</p>
          </div>
        </div>
      </section>

      {/* Abstract Images Section */}
      <section className="archive2-abstract">
        <div className="abstract-top-section">
          <img src="/홈페이지 소스정리/아카이브2/11.png" alt="Abstract Image 1" />
        </div>
        <div className="abstract-bottom-section">
          <img src="/홈페이지 소스정리/아카이브2/12.png" alt="Abstract Image 2" />
        </div>
      </section>

      {/* Metaball Graphics Section */}
      <section className="archive2-metaball">
        
        <div className="metaball-graphics">
          <div className="metaball-left">
            <img src="/홈페이지 소스정리/아카이브2/13.png" alt="Metaball S Pattern" />
          </div>
          <div className="metaball-right">
            <img src="/홈페이지 소스정리/아카이브2/14.png" alt="Metaball Grid Pattern" />
          </div>
        </div>
        
        <div className="metaball-pattern">
          <img src="/홈페이지 소스정리/아카이브2/15.png" alt="Metaball Pattern" />
        </div>
        
        <div className="metaball-text">
          <div className="text-english">
            <p>"Connected dots. Circular patterns. Organic flow." <br></br><br></br>The metaball graphic represents more than just abstract shapes — it symbolizes a dynamic connection between ideas, technologies, and people. The smooth transition between round elements suggests a living system that's constantly evolving and interacting. Inspired by this concept, TECHNICS designed its logo based on this pattern, and extended it into a repeating visual motif for our staff badges.</p>
          </div>
          <div className="text-korean">
            <p>'연결된 점, 원형 패턴, 유기적인 흐름' <br></br>이런 요소들이 담긴 메타볼(Metaball) 그래픽은 단순한 형태 이상의 의미를 담고 있습니다. 점들이 서로 연결되며 하나의 유기체처럼 움직이는 이 형태는, 기술과 사람, 그리고 아이디어가 유기적으로 연결되는 흐름을 상징합니다. 테크닉스(TECHNICS)는 이러한 패턴에서 영감을 받아 자사 로고를 디자인해 그 로고를 반복 패턴화하여 스태프 명찰 디자인에 적용했습니다.</p>
          </div>
        </div>
      </section>

      {/* Timeline Table Section */}
      <ArchiveTimelineSection />

      {/* Contact Form */}
      <ContactForm />

      {/* Main Footer */}
      <MainFooter />

    </div>
  );
};

export default Archive2;