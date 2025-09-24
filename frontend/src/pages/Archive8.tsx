import React from 'react';
import TimelineTable from '../components/TimelineTable';
import type { TimelineItem } from '../components/TimelineTable';
import ContactForm from '../components/ContactForm';
import MainFooter from '../components/MainFooter';
import '../styles/archive8.css';

const Archive8: React.FC = () => {
  // 타임라인 데이터 정의
  const timelineData: TimelineItem[] = [
    { year: "2025", title: "Archive 8 Development", description: "Technics의 새로운 아카이브 프로젝트가 시작되었습니다." },
    { year: "2025", title: "Research Phase", description: "프로젝트의 연구 단계가 진행되었습니다." },
    { year: "2025", title: "Design Implementation", description: "디자인 구현 단계가 완료되었습니다." },
    { year: "2025", title: "Final Documentation", description: "최종 문서화 작업이 완료되었습니다." }
  ];

  return (
    <div className="archive8-page">
      {/* Header Section */}
      <section className="archive8-header">
        <div className="header-container">
          <div className="logo-section">
            <img src="/홈페이지 소스정리/아카이브8/1.png" alt="TECHNICS Logo" className="logo-image"/>
          </div>
          <div className="right-content">
            <div className="description-section">
              <div className="description-english">
                <p>Before form, there is intention. Before volume, there is proportion. At Technics, we learned early that detail is not ornament — it's orientation. Through the works of others — notably the graphic clarity of Ahn Graphics we understood that the smallest decisions build the clearest impressions. We see alignment as integrity. Silence as balance. Paper cuts and label gaps as tools of rhythm, not just material finish. We design not for decoration, but for direction. Detail is where clarity begins.</p>
              </div>
              <div className="description-korean">
                <p>형태보다 앞서는 것은 의도입니다. 부피보다 앞서 오는 것은 비례입니다. 테크닉스는 일찍이 장식이 아닌다. 
                우리는 Ahn Graphics의 명확한 그래픽 언어를 통해서 작은 결정이 가장 명확한 인상을 남긴다는 것을 이해했습니다. 정렬은 성실함이고, 침묵은 균형입니다. 
                종이의 단차, 라벨의 틈새 역시 단지 마감이 아닌 리듬으로의 도구라고 여깁니다. 우리는 장식을 위한 디자인이 아닌, 방향을 위한 디자인을 합니다. 명확함은 디테일에서 시작됩니다.</p>
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
                  <span className="detail-value">To articulate Technics' core visual philosophy through an editorial study of micro-detail: how graphic, editorial, structural alignment, and visual consistency build material standards.</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Deliverables</span>
                  <span className="detail-value">Visual editorial essay<br/>
                    Photographic analysis of Ahn Graphics' influence<br/>
                    Detail study guide for Technics internal material standards</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Industries</span>
                  <span className="detail-value">Textile / Brand Design / Material Communication</span>
                </div>
              </div>
              
              <div className="details-column">
                <div className="detail-item">
                  <span className="detail-label">Materials</span>
                  <span className="detail-value">Visual references (cropped, embossed, matte)<br/>
                    Label stickers, fabric tags, cut-715kg samples</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Techniques</span>
                  <span className="detail-value">Micro-scale photography, composition<br/>
                    Proportionality analysis, referential<br/>
                    Photography of minimal packaging references</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Client</span>
                  <span className="detail-value">Technics (in-house project)</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Collaborators</span>
                  <span className="detail-value">Design Direction Team — Layout & Material Lens<br/>
                    Visual Curation Team — Reference analysis<br/>
                    Product Standards Team — Test & cut alignment test</span>
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

      {/* Gallery Section */}
      <section className="gallery-section">
        <div className="gallery-container">
          <div className="gallery-grid">
            {/* First Row - Single Image */}
            <div className="gallery-row-first">
              <div className="gallery-image-single">
                <img src="/홈페이지 소스정리/아카이브8/2.png" alt="Gallery Image 1" />
              </div>
            </div>

            {/* Second Row - Single Image */}
            <div className="gallery-row-second">
              <div className="gallery-image-single">
                <img src="/홈페이지 소스정리/아카이브8/3.png" alt="Gallery Image 2" />
              </div>
            </div>

            {/* Third Row - Single Image */}
            <div className="gallery-row-third">
              <div className="gallery-image-single">
                <img src="/홈페이지 소스정리/아카이브8/4.png" alt="Gallery Image 3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail Images Section */}
      <section className="detail-images-section">
        <div className="detail-images-container">
          <div className="detail-image-item">
            <img src="/홈페이지 소스정리/아카이브8/5.png" alt="Detail Image 1" />
          </div>
          <div className="detail-image-item">
            <img src="/홈페이지 소스정리/아카이브8/6.png" alt="Detail Image 2" />
          </div>
          <div className="detail-image-item">
            <img src="/홈페이지 소스정리/아카이브8/7.png" alt="Detail Image 3" />
          </div>
        </div>
      </section>

      {/* Text Section */}
      <section className="archive8-text-section">
        <div className="archive8-text-container">
          <div className="archive8-text-content">
            <h2>Ahn Graphics' book and package design reveals a discipline in detail. Nothing is left accidental — from the margin width to the spine glue, from paper choice to type weight. At first, the choices feel small. But these "small" things build difference. To Technics, their work became a mirror: an example of how restraint can become richness, and how detail, when done with intention, becomes identity.</h2>
            <p>안그래픽스의 책과 패키지 디자인에는 디테일에 대한 세심함이 묻어있다. 여백의 너비부터 책의 접착제, 종이 선택과 활자의 두께까지 어느 하나도 우연이 아니기 때문입니다. 처음에 시스템 요인이며, 글꼴 이 시스템이 대표를 만들어냅니다. 테크닉스에게 안그래픽스는 하나의 거울이었습니다. 절제 속에서 어떻게 풍요가 생기는지, 설계가 의도를 가지고 이루어질 때 어떻게 정체성이 되는지를 보여주는 사례였죠.</p>
          </div>
        </div>
      </section>

      {/* Final Gallery Section */}
      <section className="final-gallery-section">
        <div className="final-gallery-container">
          <div className="final-gallery-item">
            <img src="/홈페이지 소스정리/아카이브8/8.png" alt="Final Gallery Image 1" />
          </div>
          <div className="final-gallery-item">
            <img src="/홈페이지 소스정리/아카이브8/9.png" alt="Final Gallery Image 2" />
          </div>
          <div className="final-gallery-item">
            <img src="/홈페이지 소스정리/아카이브8/10.png" alt="Final Gallery Image 3" />
          </div>
          <div className="final-gallery-item">
            <img src="/홈페이지 소스정리/아카이브8/11.png" alt="Final Gallery Image 4" />
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

export default Archive8;