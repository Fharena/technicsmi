import React from 'react';
import ArchiveTimelineSection from '../components/ArchiveTimelineSection';
import ContactForm from '../components/ContactForm';
import MainFooter from '../components/MainFooter';
import '../styles/archive5.css';

const Archive5: React.FC = () => {
  return (
    <div className="archive5-page">
      {/* Header Section */}
      <section className="archive5-header">
        <div className="header-container">
          <div className="logo-section">
            <img src="/홈페이지 소스정리/아카이브5/1.png" alt="TECHNICS Logo" className="logo-image"/>

          </div>
          <div className="right-content">
            <div className="description-section">
              <div className="description-english">
                <p>We draw color from both the natural and the constructed. From grape skins and pale stone, to weathered wood, softened fabric, and shadowed architecture color for us is not just seen, it is felt. Technics observes the world with a quiet eye, noticing the tones that exist between texture and time. Our palette is made not of noise, but of nuance. Familiar, but refined. Worn, but weighted. This is how we color wool.</p>
              </div>
              <div className="description-korean">
                <p>우리는 자연물과 인공물 모두에게서 색상의 실마리를 발견합니다. 가장 본질적인 색 흙빛 포도, 미지근한 석재, 건축의 흰 음영, 묵직한 나무결, 그리고 가죽, 금속, 과일껍질, 입 혀진 옷감의 무게감 속에서 색은 단순히 "보이는 것"을 넘어 느껴지는 것이 됩니다. Technics는 자연에서 채집된 색과 구조물에서 반사되는 빛의 감도를 함께 수집합니다. 그렇 게 모아진 색은 익숙하지만 새롭고, 조용하지만 또렷한 감도로 울 원단 위에 구현됩니다. 우리가 말하는 세련됨이란, 보는 사람이 본 적 없는 색이 아니라, 느껴본 적 있는 색을 더 정제되게 마주하는 순간입니다.</p>
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
                  <span className="detail-value">To build a foundational color archive that reflects Technics' design principles — restraint, harmony, material realism — and to systemize the palette development process based on both natural and industrial visual cues.</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Deliverables</span>
                  <span className="detail-value">
                    Color material archive (natural & structural references)<br/>
                    Visual analysis framework for palette classification<br/>
                    Internal-use color naming logic & documentation system
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Industries</span>
                  <span className="detail-value">Textile / Fashion / Material Design</span>
                </div>
              </div>
              <div className="details-column">
                <div className="detail-item">
                  <span className="detail-label">Materials</span>
                  <span className="detail-value">Image-based visual research archive</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Techniques</span>
                  <span className="detail-value">
                    Color extraction & categorization<br/>
                    Tone-mapping by material interaction<br/>
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
                    Technics Color Lab — Visual research & tone curation<br/>
                    Design Direction Team — Naming system & visual structure<br/>
                    Fabric Engineering Team — Color-fiber interaction validation<br/>
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

      {/* Color Philosophy Section */}
      <section className="color-philosophy-section">
        <div className="color-philosophy-container">
          {/* First Image - Full Width */}
          <div className="color-philosophy-image">
            <img src="/홈페이지 소스정리/아카이브5/2.png" alt="Grapes" />
          </div>
          
        </div>
      </section>

      {/* Next Section with Grid Layout */}
      <section className="next-section">
        <div className="next-container">
          <div className="next-content">
            <div className="next-image">
              <img src="/홈페이지 소스정리/아카이브5/3.png" alt="Color Research" />
            </div>
            <div className="next-text">
              <p className="next-description-english">
                When we think of grapes, we think of purple. But look closely: beneath the skin is a glassy green, while the surface holds a shade so deep, it's almost black. Colors seen under real light, at real scale, and in real time they rarely match what we've been taught. At Technics, we don't trust color swatches. We trust direct experience. Colors we feel, not just see. We capture the tension of gloss, the weight of shadows, and we let those sensations guide how we color wool.
              </p>
              <p className="next-description-korean">
                일반적으로 포도의 색이라 하면 우리는 보라색을 떠올립니다. 하지만 실제로 포도를 가까이서 보면, 껍질 안쪽에는 투명한 녹색의 물기가 감돌고, 겉면은 거의 검정에 가까운 깊은 색감을 띱니다. 빛의 방향에 따라 색은 바뀌고, 우리가 지식으로 배운 색과 실제 경험으로 본 색은 다릅니다. Technics는 직접 관찰한 색 눈으로 본 그대로가 아닌 느껴진 색을 수집합니다. 우리는 색을 '이름'으로 정의하지 않습니다. 대신 빛, 질감, 온도, 거리감으로 기억하고, 그 감도를 바탕으로 물 위에 색을 짭니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* New Section */}
      <section className="new-section">
        <div className="new-container">
          <div className="new-content">
            {/* Top Image - Full Width */}
            <div className="new-image-top">
              <img src="/홈페이지 소스정리/아카이브5/4.png" alt="Architecture Study" />
            </div>

            {/* Second Image - Left Aligned */}
            <div className="new-image-single-left">
              <img src="/홈페이지 소스정리/아카이브5/5.png" alt="Fabric Texture" />
            </div>

            {/* Third and Fourth Images Side by Side */}
            <div className="new-image-middle">
              <div className="new-image-left">
                <img src="/홈페이지 소스정리/아카이브5/6.png" alt="Wood Grain" />
              </div>
              <div className="new-image-right">
                <img src="/홈페이지 소스정리/아카이브5/7.png" alt="Material Study" />
              </div>
            </div>

            {/* Last Image - Right Aligned */}
            <div className="new-image-single-right">
              <img src="/홈페이지 소스정리/아카이브5/8.png" alt="Surface Detail" />
            </div>
          </div>
        </div>
      </section>

      {/* Another Section */}
      <section className="another-section">
        <div className="another-container">
          <div className="another-content">
            {/* First Row - Two Images No Gap */}
            <div className="another-row-first">
              <div className="another-image-no-gap">
                <img src="/홈페이지 소스정리/아카이브5/9.png" alt="Fabric Detail" />
              </div>
              <div className="another-image-no-gap">
                <img src="/홈페이지 소스정리/아카이브5/10.png" alt="Nature Study" />
              </div>
            </div>

            {/* Second Row - Single Image */}
            <div className="another-row-second">
              <img src="/홈페이지 소스정리/아카이브5/11.png" alt="Lemon Study" />
            </div>

            {/* Third Row - Two Images With Gap */}
            <div className="another-row-third">
              <div className="another-image-with-gap">
                <img src="/홈페이지 소스정리/아카이브5/12.png" alt="Vegetable Study" />
              </div>
              <div className="another-image-with-gap">
                <img src="/홈페이지 소스정리/아카이브5/13.png" alt="Additional Study" />
              </div>
            </div>
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

export default Archive5;