import React, { useEffect, useRef, useState } from 'react';
import ContactForm from '../components/ContactForm';
import MainFooter from '../components/MainFooter';
import ArchiveTimelineSection from '../components/ArchiveTimelineSection';
import '../styles/archive4.css';

const Archive4: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [lineProgress, setLineProgress] = useState(0);
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!timelineRef.current) return;

          const timeline = timelineRef.current;
          const timelineRect = timeline.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // 타임라인이 화면에 들어왔는지 확인 (더 빠른 시작)
          if (timelineRect.top < windowHeight + 200 && timelineRect.bottom > 0) {
            setIsTimelineVisible(true);
            
            const items = timeline.querySelectorAll('.timeline-item');
            const newVisibleItems: number[] = [];
            
            items.forEach((item, index) => {
              const itemRect = item.getBoundingClientRect();
              const itemTop = itemRect.top;
              const viewportBottom = windowHeight;
              
              // 아이템이 화면 하단에 도달하기 전에 미리 보이게 함 (더 늦게)
              if (itemTop < viewportBottom - 50) {
                newVisibleItems.push(index);
              }
            });
            
            setVisibleItems(newVisibleItems);
            
            // 선 그리기: 뎁스 10%부터 시작하는 2중 체크
            const scrollY = window.scrollY;
            const timelineOffsetTop = timeline.offsetTop;
            const timelineHeight = timelineRect.height;
            
            // 1차 체크: 타임라인이 화면에 들어왔는지 확인
            const timelineStart = timelineOffsetTop - windowHeight;
            const timelineEnd = timelineOffsetTop + timelineHeight;
            
            if (scrollY >= timelineStart && scrollY <= timelineEnd) {
              // 2차 체크: 뎁스 10%부터 선 그리기 시작
              const depthStart = timelineStart + (timelineHeight * 0.1); // 뎁스 10% 지점
              const depthEnd = timelineEnd - (timelineHeight * 0.1); // 뎁스 90% 지점
              
              if (scrollY >= depthStart) {
                // 뎁스 10%부터 90%까지 선 그리기
                const currentDepth = scrollY - depthStart;
                const maxDepth = depthEnd - depthStart;
                const progress = Math.max(0, Math.min(1, currentDepth / maxDepth));
                const lineHeight = progress * timelineHeight;
                
                setLineProgress(lineHeight);
              } else {
                // 뎁스 10% 이전에는 선 숨김
                setLineProgress(0);
              }
            } else {
              // 타임라인 범위 밖에서는 선 숨김
              setLineProgress(0);
            }
          } else {
            // 타임라인이 화면 밖에 있을 때는 선을 완전히 숨김
            setIsTimelineVisible(false);
            setLineProgress(0);
            setVisibleItems([]);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 초기 실행

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="archive4-page">
      {/* Header Section */}
      <section className="archive4-header">
        <div className="header-container">
          <div className="logo-section">
            <img src="/홈페이지 소스정리/아카이브4/1.png" alt="TECHNICS Logo" className="logo-image"/>
          </div>
          <div className="right-content">
            <div className="description-section">
              <div className="description-english">
                <p>The suit was born in Europe, and wool was its foundation. From the looms of industrial Britain to the elegance of Italy, from Japan's precision engineering to the codes of modern tailoring wool has always reflected the time in which it was woven. Now, Technics writes the next chapter. A Korean brand rooted in order, geometry, and cultural clarity, we bring a new layer of meaning to wool. We learn from tradition, design in the present, and weave for what comes next.</p>
              </div>
              <div className="description-korean">
                <p>수트가 태어난 곳은 유럽이었고, 울은 그 뼈대였습니다. 산업혁명의 기계에서, 이탈리아 장인의 손끝에서, 일본의 정밀 공정 안에서 울 원단은 시대를 입었습니다. 그리고 지금, 우리는 그 역사의 다음 장을 짜고 있습니다. Technics는 한국의 브랜드입니다. 한국 고유의 질서와 구조적 미감을 바탕으로, 울 원단에 새로운 언어와 쓰임을 부여합니다. 전통에서 배우고, 현재에서 설계하며, 미래를 직조합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wool History Timeline Section */}
      <section className="wool-timeline">
        <div className="timeline-container" ref={timelineRef}>
          {/* 애니메이션 선 - 타임라인이 화면에 들어올 때만 렌더링 */}
          {isTimelineVisible && (
            <div 
              className="timeline-line-animated" 
              ref={lineRef}
              style={{
                height: `${lineProgress}px`,
                background: `linear-gradient(to bottom, #000 0%, #000 100%, transparent 100%)`
              }}
            ></div>
          )}
          {/* 1800s Section */}
          <div className={`timeline-item visible`}>
            <div className="timeline-left">
              <h2 className="year-title">1800s</h2>
              <div className="timeline-image">
                <img src="/홈페이지 소스정리/아카이브4/3.png" alt="British Wool Mills" />
              </div>
              <div className="timeline-content">
                <h3 className="content-title">The Rise of Britain's Iconic Wool Mills</h3><br></br><br></br>
                <div className="companies">
                  <div className="company">1772 | Fox Brothers</div><br></br>
                  <div className="company">1896 | Dugdale Bros & Co</div><br></br>
                  <div className="company">Early 1900s | Huddersfield Fine Worsteds</div>
                </div>
              </div>
            </div>
            <div className="timeline-right">
              <h2 className="section-title">UK: Birth of Tailoring, Industrial Wool</h2>
              <p className="description">The Industrial Revolution elevated wool from handwoven textile to mass produced cloth. Yorkshire emerged as a hub for worsted wool, defining the backbone of British tailoring. As Savile Row was born, wool became the cornerstone of the English gentleman's suit.</p>
              <p className="korean-description">산업혁명은 울 소재를 수작업 작물에서 대량 생산원단으로 끌어올렸다. 이 과정에서 요크서 지역 온 워스테드풀 생산의 중심지로 부상하며, 영국 테일러링 전통의 근간을 형성했다. 그리고 새별로 (Savile Rowi의 등장과 함께, 옳은 영국 신사 수트의 상징적인 기반이 되었다.</p>
              <div className="fabric-samples">
                <div className="fabric-sample-row">
                  <div className="fabric-sample">
                    <img src="/홈페이지 소스정리/아카이브4/4.png" alt="Fox Brothers Fabric" />
                  </div>
                  <div className="fabric-sample">
                    <img src="/홈페이지 소스정리/아카이브4/5.png" alt="Huddersfield Fabric" />
                  </div>
                </div>
                <div className="fabric-sample">
                  <img src="/홈페이지 소스정리/아카이브4/6.png" alt="Genesis Fabric" />
                </div>
              </div>
            </div>
          </div>

          {/* 1900s Section */}
          <div className={`timeline-item ${visibleItems.includes(1) ? 'visible' : ''}`}>
            <div className="timeline-left">
              <h2 className="year-title">1900s</h2>
              <div className="timeline-image">
                <img src="/홈페이지 소스정리/아카이브4/7.png" alt="Italian Tailoring" />
              </div>
              <div className="timeline-content">
                <h3 className="content-title">Italian Wool, The Curve of Classic</h3><br></br>
                <div className="companies">
                  <div className="company">1663 | Vitale Barberis Canonico</div><br></br>
                  <div className="company">1910 | Ermenegildo Zegna</div><br></br>
                  <div className="company">1924 | Loro Piana</div>
                </div>
              </div>
            </div>
            <div className="timeline-right">
              <h2 className="section-title">Italy: Lightness, Flow, Elegance</h2>
              <p className="description">From the Biella region came lighter, glossier, and softer wools. Italy's Super 100s wool gave suits a Mediterranean sensibility — less rigid, more human. As tailoring evolved, the fabric began to follow the body rather than restrict it.</p>
              <p className="korean-description">이탈리아 비엘라 지역에서는 더 가볍고 부드럽고 은은한 광택을 지닌 울이 탄생했다. 특히 Super 100s급 원단은 수트에 딱딱함 대신 지중해 특유의 여유와 감성을 불어넣었고, 테일러링 역시 몸의 움직임을 제약하기보다 자연스럽게 따라가는 방향으로 진화해갔다.</p>
              <div className="fabric-samples">
                <div className="fabric-sample">
                  <img src="/홈페이지 소스정리/아카이브4/8.png" alt="Vitale Barberis Canonico" />
                </div>
                <div className="fabric-sample-row">
                  <div className="fabric-sample">
                    <img src="/홈페이지 소스정리/아카이브4/9.png" alt="Italian Wool" />
                  </div>
                  <div className="fabric-sample">
                    <img src="/홈페이지 소스정리/아카이브4/10.png" alt="Loro Piana" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 1960s Section */}
          <div className={`timeline-item ${visibleItems.includes(2) ? 'visible' : ''}`}>
            <div className="timeline-left">
              <h2 className="year-title">1960s</h2>
              <div className="timeline-image">
                <img src="/홈페이지 소스정리/아카이브4/11.png" alt="Japanese Precision" />
              </div>
              <div className="timeline-content">
                <h3 className="content-title">Where Wool Is Woven with Precision</h3>
                <div className="companies">
                  <div className="company">1905 | Miyuki Keori</div>
                </div>
              </div>
            </div>
            <div className="timeline-right">
              <h2 className="section-title">Japan: Precision Engineered Wool</h2>
              <p className="description">Japan harnessed precision textile engineering to create consistent, high-quality wool. Its technical blends wrinkle-resistant, stretchable, light weight made suits efficient and accessible. Behind every roll of Japanese wool: accuracy measured in microns.</p>
              <p className="korean-description">일본은 정밀 섬유공학 기술을 바탕으로, 균일하고 고품질의 울 원단을 탄생시켰다. 구김이 잘 가지 않고, 신축성이 있으며, 가벼운 기능성 혼방 울은 수트를 더욱 실용적이고 대중적인 옷으로 만들었다. 일본산 울 한 롤마다 깃든 것은 바로 마이크론 단위까지 설계된 정밀함이다.</p>
              <div className="fabric-samples">
                <div className="fabric-sample">
                  <img src="/홈페이지 소스정리/아카이브4/12.png" alt="Miyuki Keori" />
                </div>

              </div>
            </div>
          </div>

          {/* 2000s Section */}
          <div className={`timeline-item ${visibleItems.includes(3) ? 'visible' : ''}`}>
            <div className="timeline-left">
              <h2 className="year-title">2000s</h2>
              <div className="timeline-image">
                <div className="fabric-sample">
                  <img src="/홈페이지 소스정리/아카이브4/13.png" alt="Sustainable Wool" />
                </div>
                <div className="fabric-sample">
                  <img src="/홈페이지 소스정리/아카이브4/14(대체예정).png" alt="Modern Wool" />
                </div>
              </div>

            </div>
            <div className="timeline-right">
              <h2 className="section-title">Global: Sustainability, Traceability, and Conscious Luxury</h2>
              <p className="description">Modern wool is no longer just about touch or drape. Standards like RWS (Responsible Wool Standard) and brands like Reda or Zegna now address consumer demand for transparency, animal welfare, and eco-responsibility. The suit, once a symbol of formality, is now a reflection of value-driven design.</p>
              <p className="korean-description">오늘날 울 원단은 더 이상 촉감이나 흐름만으로 평가되지 않는다. RWS (Responsible Wool Standard)와 같은 윤리적 기준, 그리고 Reda, Zegna와 같은 지속가능 브랜드의 등장으로, 소비자들은 이제 원단이 어디서 왔는지, 어떻게 만들어졌는지에 주목한다. 수트는 이제 격식의 상징을 넘어서, 가치와 철학이 담긴 디자인의 결과물로 다시 정의되고 있다.</p>
              <div className="fabric-samples">


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Section */}
      <section className="next-section">
        <div className="next-container">
          <div className="next-logo">
            <img src="/홈페이지 소스정리/아카이브4/1.png" alt="TECHNICS Logo" />
          </div>
          <div className="next-content">
            <div className="next-text">
              <h2 className="next-title">A New Chapter in the Wool Story</h2>
              <p className="next-description-english">
                Wool has evolved from heritage to elegance, from precision to responsibility. But the next chapter has yet to be written. Technics is that next chapter. We believe wool should not only be soft, refined, or ethical it should be intelligent, architectural, and intentional. At Technics, we don't just weave fabric. We design it like a blueprint, and we engineer it to meet the needs of the next generation.
              </p>
              <p className="next-description-korean">
                지금까지 울은 기능과 미학, 윤리를 직조해왔다. 하지만 우리는 거기서 멈추지 않는다. Technics가 그 다음 장을 쓴다. 우리는 재료만으로는, 윤리적이고 부드럽기만으로는 충분하지 않다고 믿었다. 우리는 직물이 새로운 쓰임을 제안할 수 있어야 한다고 믿었다. 그래서 Technics는 직물에 구조를 더하고, 청사진처럼 디자인하며, 어떻게 사용될지를 고려한 차세대 울 원단을 만든다.
              </p>
            </div>
            <div className="next-image-main">
              <img src="/홈페이지 소스정리/아카이브4/a.png" alt="Industrial Machinery" />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Diagrams Section */}
      <section className="philosophy-section">
        <div className="philosophy-container">
          <div className="philosophy-images">
            <div className="philosophy-image">
              <img src="/홈페이지 소스정리/아카이브4/15.png" alt="Philosophy Diagram 1" />
            </div>
            <div className="philosophy-image">
              <img src="/홈페이지 소스정리/아카이브4/16.png" alt="Philosophy Diagram 2" />
            </div>
          </div>
        </div>
      </section>

      {/* Korean Philosophy Section */}
      <section className="korean-philosophy-section">
        <div className="korean-philosophy-container">
          <div className="korean-philosophy-content">
            <div className="korean-philosophy-image">
              <img src="/홈페이지 소스정리/아카이브4/17.png" alt="Korean Flag" />
            </div>
            <div className="korean-philosophy-text">
              <h2 className="korean-philosophy-title">Weaving Korean Thought into Every Thread</h2>
              <p className="korean-philosophy-english">
                Technics is not just a wool brand we are a Korean brand with a design philosophy rooted in balance, symbolism, and structure. From the flowing logic of yin and yang to the symmetrical clarity of the trigrams, we translate Korean order and thought into the geometry of fabric. Because what we weave is not just material it is meaning, shaped by Korean hands.
              </p>
              <p className="korean-philosophy-korean">
                Technics는 단순한 울 브랜드가 아닙니다. 우리는 균형, 상징성, 구조에 뿌리를 둔 디자인 철학을 가진 한국 브랜드입니다. 음양의 흐르는 논리부터 괘의 대칭적 명확성까지, 우리는 한국의 질서와 사고를 직물의 기하학으로 번역합니다. 우리가 직조하는 것은 단순한 재료가 아니라, 한국의 손으로 만들어진 의미입니다.
              </p>
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

export default Archive4;
