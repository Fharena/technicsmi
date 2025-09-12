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