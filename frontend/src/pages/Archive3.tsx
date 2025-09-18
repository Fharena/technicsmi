import React from 'react';
import TimelineTable from '../components/TimelineTable';
import type { TimelineItem } from '../components/TimelineTable';
import ContactForm from '../components/ContactForm';
import MainFooter from '../components/MainFooter';

const Archive3: React.FC = () => {
  // 타임라인 데이터 정의
  const timelineData: TimelineItem[] = [
    { year: "2025", title: "라벨링 시스템 연구", description: "현재 라벨링 시스템과 워크플로우 요구사항 분석" },
    { year: "2025", title: "디자인 개발", description: "그리드 기반 레이아웃과 컬러 코딩 시스템 구축" },
    { year: "2025", title: "프로토타입 테스트", description: "QC팀과의 현장 테스트 및 피드백 통합" },
    { year: "2025", title: "최종 구현", description: "프로덕션 준비 완료된 라벨과 분류 스티커" }
  ];

  return (
    <div className="archive3-page">
      {/* Header Section */}
      <section className="archive3-header">
        <div className="header-container">
          <div className="logo-section">
            <img src="/홈페이지 소스정리/아카이브3/1.png" alt="TECHNICS Product Labels" className="logo-image"/>
          </div>
          <div className="right-content">
            <div className="description-section">
              <div className="description-english">
                <p>Product management is not separate from brand experience it is a part of it. At Technics, we apply design thinking to quality control tags and fabric classification labels, using them not only for function but also as a way to maintain visual consistency and operational clarity. These small interventions help reinforce both internal workflow and brand expression.</p>
              </div>
              <div className="description-korean">
                <p>제품을 관리하는 방식 또한 브랜드 경험의 일부가 될 수 있습니다. Technics는 품질 확인 태그와 원단 분류 스티커와 같은 디테일 요소에 디자인을 적극적으로 반영하고자 합니다. 이는 단순한 표기 수단을 넘어, 제품 흐름을 명확히 하고 내부 운영의 효율성을 높이는 동시에, 브랜드의 시각 언어를 일관되게 유지하기 위한 전략적 접근입니다.</p>
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
                  <span className="detail-value">Enhancing product traceability and internal workflow through structured labeling</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Deliverables</span>
                  <span className="detail-value">QC check labels, Fabric classification stickers</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Industries</span>
                  <span className="detail-value">Textile / Product Management</span>
                </div>
              </div>
              <div className="details-column">
                <div className="detail-item">
                  <span className="detail-label">Materials</span>
                  <span className="detail-value">Label stock, Adhesive paper</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Techniques</span>
                  <span className="detail-value">Grid-based layout, Color coding, Functional typography</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Client</span>
                  <span className="detail-value">Technics (In-house project)</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Collaborators</span>
                  <span className="detail-value">Technics Design Team — System design & visual direction, QC Team — Field testing & feedback integration</span>
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

      {/* QC Tags Section */}
      <section className="archive3-qc-tags">
        <div className="qc-tags-layout">
          <div className="qc-tag-large">
            <img src="/홈페이지 소스정리/아카이브3/2.png" alt="Large QC Tag" />
          </div>
          <div className="qc-tag-small-container">
            <div className="qc-tag-small">
              <img src="/홈페이지 소스정리/아카이브3/3.png" alt="Small QC Tag" />
            </div>
            <div className="qc-tag-text">
              <div className="qc-text-english">
                <p>We needed QC elements that would present information clearly and be easy to distinguish. The reference featured bold colors and structured typography, offering both function and refinement guiding Technics toward a QC system that integrates clarity with design sensibility.</p>
              </div>
              <div className="qc-text-korean">
                <p>우리는 정보가 명확히 전달되고 쉽게 구분될 수 있는 QC 요소가 필요했습니다. 참고한 레퍼런스는 시인성 높은 색상과 정제된 타이포그래피를 통해 기능성과 시각적 완성도를 동시에 보여주었고, 이를 통해 Technics는 디자인과 실용성을 아우르는 QC 시스템의 방향을 설정할 수 있었습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QC Tag Grid Section */}
      <section className="archive3-qc-grid">
        <div className="qc-grid-layout">
          <div className="qc-top-section">
            <img src="/홈페이지 소스정리/아카이브3/4.png" alt="Q.C CHECKED Tag" />
          </div>
          <div className="qc-bottom-section">
            <img src="/홈페이지 소스정리/아카이브3/5.png" alt="Q.C PASSED Tag 1" />
            <img src="/홈페이지 소스정리/아카이브3/6.png" alt="Q.C PASSED Tag 2" />
          </div>
        </div>
      </section>

      {/* QC System Description Section */}
      <section className="archive3-qc-system">
        <div className="qc-system-layout">
          <div className="qc-system-text">
            <div className="qc-system-english">
              <p>By using high-saturation colors as a base and organizing detailed check items with clarity, we developed a visually effective and efficient QC label system. The refined layout allows for greater focus on product care while improving consistency in internal processes.</p>
            </div>
            <div className="qc-system-korean">
              <p>채도가 높은 컬러를 기반으로 섬세한 체크 항목을 구조화하여 시각적으로 명확하고 효율적인 QC 라벨 시스템을 구축하였습니다. 완성도 높은 레이아웃은 제품 관리에 대한 집중도를 높이고, 내부 작업의 일관성을 향상시키는 데 기여하고 있습니다.</p>
            </div>
            <br></br>
          </div>
          <div className="qc-system-images">
            <div className="qc-image-grid">
              <div className="qc-image-item qc-image-1">
                <img src="/홈페이지 소스정리/아카이브3/7.png" alt="Modern Building Facade" />
              </div>
              <div className="qc-image-item qc-image-2">
                <img src="/홈페이지 소스정리/아카이브3/8.png" alt="Vaulted Interior Ceiling" />
              </div>
              <div className="qc-image-item qc-image-3">
                <img src="/홈페이지 소스정리/아카이브3/9.png" alt="Technical Drawing" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Inspiration Section */}
      <section className="archive3-architecture">
        <div className="architecture-layout">
          <div className="architecture-text">
            <div className="architecture-english">
              <p>Technics holds deep respect for contemporary architecture. Its structural reasoning, refined proportions, and material expression offer an ongoing source of inspiration. Within these forms, we observe a balance of order and tension—qualities we seek to reflect in our own design language.</p>
            </div>
            <div className="architecture-korean">
              <p>Jjj자운드의 박스를 처음 마주했을 때, 우리는 단순한 물리적 포장을 넘어 디자인이 어떻게 '태도'를 전달할 수 있는지를 고민하게 되었습니다. Technics의 원단을 담는 박스라면, 그 자체로 기능성과 정제된 인상을 동시에 전달해야 합니다. 단단하지만 과시적이지 않고, 단순하지만 비어 있지 않아야 하며, 열었을 때의 여백과 접힘의 감각이 곧 브랜드의 태도를 말해주어야 합니다. 우리는 이 박스를 단지 보호재가 아닌, Technics의 철학을 시각적으로 정리한 '첫 번째 터치'로 제안하고자 합니다.</p>
            </div>
          </div>
          <div className="architecture-media">
            <div className="architecture-video">
              <video 
                src="/홈페이지 소스정리/아카이브3/10.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline
                className="architecture-video-element"
                style={{ width: '100%', height: 'auto', minHeight: '300px' }}
                onLoadStart={() => console.log('Video loading started')}
                onLoadedData={() => console.log('Video data loaded')}
                onCanPlay={() => console.log('Video can play')}
                onError={(e) => {
                  console.error('Video failed to load:', e);
                }}
                onLoadedMetadata={() => console.log('Video metadata loaded')}
                onSuspend={() => console.log('Video loading suspended')}
              >
                <p>영상을 재생할 수 없습니다. 브라우저에서 자동재생이 차단되었을 수 있습니다.</p>
              </video>
            </div>
            <div className="architecture-images">
              <img src="/홈페이지 소스정리/아카이브3/11.png" alt="Architecture Image 1" />
              <img src="/홈페이지 소스정리/아카이브3/12.png" alt="Architecture Image 2" />
            </div>
          </div>
        </div>
      </section>

      {/* Visual Language Section */}
      <section className="archive3-visual-language">
        <div className="visual-language-layout">
          <div className="visual-language-content">
            <div className="visual-language-english">
              <p>We aimed to translate this structural beauty into a visual language. The fabric classification sticker was designed to reflect the sense of order found in architectural drawings, while the placement of key information prioritized legibility through a carefully considered layout.</p>
            </div>
            <div className="visual-language-korean">
              <p>이러한 아름다움의 구조를 시각 언어로 구현하고자 하였습니다. 원단을 분류하는 스티커에는 설계 도면에서 느껴지는 구조적 질서를 반영하고자 했으며, 가장 중요한 정보가 위치하는 영역에는 가독성을 최우선으로 고려하여 레이아웃을 설계하였습니다.</p>
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

export default Archive3;