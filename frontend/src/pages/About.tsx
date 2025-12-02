import React, { useEffect, useRef } from 'react';
import ContactForm from '../components/ContactForm';
import MainFooter from '../components/MainFooter';
import '../styles/about.css';

const About: React.FC = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const textSectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // 자동재생 실패 시 무시
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);

  // 스크롤 애니메이션 효과
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 부모 컨테이너에 visible 클래스 추가
            entry.target.classList.add('visible');
            // 부모 컨테이너 내의 모든 scroll-animate 요소에도 visible 클래스 추가
            const scrollAnimateElements = entry.target.querySelectorAll('.scroll-animate');
            scrollAnimateElements.forEach((el) => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    textSectionRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
        // 초기 로드 시 화면에 보이는 요소는 즉시 visible 클래스 추가
        const rect = ref.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight && rect.bottom > 0) {
          ref.classList.add('visible');
          const scrollAnimateElements = ref.querySelectorAll('.scroll-animate');
          scrollAnimateElements.forEach((el) => {
            el.classList.add('visible');
          });
        }
      }
    });

    return () => {
      textSectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-background">
          <video 
            src="/홈페이지 소스v2/about/어바웃 영상.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline
            className="hero-bg-img"
          />
        </div>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">
              Effortless style and comfort for<br/>
              every part of your day.
            </h1>
            <p className="hero-subtitle">Tailored Style for Business and Everyday Life</p>
          </div>
          <div className="hero-buttons">
            <button className="hero-btn">Technics</button>
            <button className="hero-btn">2025</button>
            <button className="hero-btn">Textile</button>
          </div>
        </div>
      </div>
      
      {/* A New Chapter in the Wool Story 섹션 */}
      <div className="wool-story-section">
        <div className="wool-story-background">
          <img src="/홈페이지 소스v2/about/Group 1461.png" alt="Wool Story Background" className="wool-story-bg-image" />
        </div>
        <div className="wool-story-content" ref={(el) => { textSectionRefs.current[0] = el; }}>
          <h2 className="wool-story-title scroll-animate">A New Chapter in the Wool Story</h2>
          <div className="wool-story-text">
            <p className="wool-story-text-english scroll-animate">
              We have long woven function, aesthetics, and ethics into our fabrics. These are the values we hold above all else. We imagine what comes next and create it in our own way. TECHNICS does not rely on "deep heritage," "national power," or the illusion of softness. We create only by our own standards and technology nothing borrowed, nothing imitated. We believe a fabric should have the power to suggest new ways of being used. By adding structure, designing with architectural precision, and considering every moment of use, TECHNICS continues to expand the possibilities of wool.
            </p>
            <p className="wool-story-text-korean scroll-animate">
              우리는 오랫동안 기능, 미학, 그리고 윤리를 직조해왔습니다. 이것은 우리가 가장 중요하게 여기는 가치입니다. 우리는 그다음을 상상하고, 스스로의 방식으로 만들어갑니다. TECHNICS는 '깊은 헤리티지'나 '내셔널 파워', 혹은 겉으로만 부드러운 것에 기대지 않습니다. 우리는 오직 우리의 기준과 기술로 진짜를 만듭니다. 원단이 스스로 새로운 사용 방식을 제안할 수 있는 힘을 가져야 한다고 믿습니다. 구조를 더하고, 설계도처럼 정밀하게 디자인하며, 실제 사용의 순간까지 고려함으로써 TECHNICS는 울이 지닐 수 있는 가능성을 확장해 나갑니다.
            </p>
          </div>
        </div>
      </div>
      
      {/* Video Collage Section */}
      <div className="video-collage-section">
        <div className="video-collage-container">
          <video 
            ref={(el) => { videoRefs.current[0] = el; }}
            src="/홈페이지 소스v2/about/어바웃 프로세스 뭉친영상.mp4" 
            muted 
            loop 
            playsInline
            preload="metadata"
            className="collage-video"
          />
        </div>
      </div>
      
      {/* Crafted for Classy Textiles Section */}
      <div className="crafted-textiles-section">
        <div className="crafted-top-section" ref={(el) => { textSectionRefs.current[1] = el; }}>
          <div className="crafted-top-col-1">
            <h2 className="crafted-main-title scroll-animate">Crafted for Classy Textiles, One Thread at a Time.</h2>
          </div>
          <div className="crafted-top-col-2">
            <p className="crafted-text-english scroll-animate">
              Technics aims for progress. It is a fabric created for better color, enhanced strength, improved friction, and greater durability. We strive for excellence within the framework of fundamentals. We craft our fabrics through a rigorous and disciplined process. Every stage is guided by precision, expertise, and integrity. Within this framework, true perfection in fabric is not an accident it's our standard.
            </p>
          </div>
          <div className="crafted-top-col-3">
            <p className="crafted-text-korean scroll-animate">
              원단은 더 깊은 색감, 강화된 강도, 향상된 마찰력, 그리고 뛰어난 내구성을 위해 제작되었습니다. 우리는 기본에 충실한 원칙 안에서 탁월함을 추구합니다. 우리는 엄격하고 체계적인 공정을 통해 원단을 만듭니다. 모든 단계는 정밀함, 전문성, 그리고 진정성에 의해 이끌어집니다. 이 과정 속에서 완벽한 원단은 우연이 아닌, 우리의 기준입니다.
            </p>
          </div>
        </div>
        
        <div className="crafted-bottom-section">
          <div className="crafted-bottom-left" ref={(el) => { textSectionRefs.current[2] = el; }}>
            <h3 className="crafted-sub-title scroll-animate">Precision as Philosophy.</h3>
            <p className="crafted-text-english scroll-animate">
              At Technics, every fabric begins with discipline. From the first thread to the final finish, each stage follows a strict and deliberate process one built on precision, patience, and mastery. We believe that true quality is never improvised; it is the result of method, time, and unwavering attention to detail. Through this journey, every weave becomes a reflection of our integrity and pursuit of perfection.
            </p>
            <p className="crafted-text-korean scroll-animate">
              테크닉스의 모든 원단은 '규율'에서 시작됩니다. 첫 실을 짜는 순간부터 마지막 마감에 이르기까지, 모든 단계는 정밀함과 인내, 그리고 숙련된 손길이 깃 든 엄격하고 치밀한 공정을 따릅니다. 우리는 진정 한 품질이 즉흥적으로 만들어지지 않는다고 믿습니 다. 그것은 오랜 시간과 세심한 과정이 쌓아낸 결과 입니다. 이 여정 속에서, 한 올 한 올의 직조는 테크 닉스가 지향하는 완성도와 진정성의 증명이 됩니다.
            </p>
          </div>
          <div className="crafted-bottom-right">
            <div className="weaving-process-container">
              <video 
                src="/홈페이지 소스v2/about/종이.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline
                className="weaving-process-video"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Quality Quote Section */}
      <div className="quality-quote-section">
        <div className="quality-quote-content" ref={(el) => { textSectionRefs.current[3] = el; }}>
          <h2 className="quality-quote-english scroll-animate">Quality is not a result, but an attitude</h2>
          <p className="quality-quote-korean scroll-animate">품질은 결과가 아니라 태도입니다</p>
        </div>
        <div className="quality-quote-image">
          <img src="/홈페이지 소스v2/about/Group 1462.png" alt="Quality Image" className="quality-quote-img" />
        </div>
      </div>
      
      {/* How We Think About Process Section */}
      <div className="process-section">
        <div ref={(el) => { textSectionRefs.current[4] = el; }}>
          <h2 className="process-title scroll-animate">How We Think About Process</h2>
          <div className="process-content">
            <div className="process-text-column">
              <p className="process-text-english scroll-animate">
                For us, process is more than production it is a discipline built on integrity. Each step values precision over speed, care over convenience. Even the unseen details are shaped with intention and respect. We believe true mastery lies not in haste, but in quiet craftsmanship that endures over time.
              </p>
            </div>
            <div className="process-text-column">
              <p className="process-text-korean scroll-animate">
                우리에게 '공정'은 생산의 절차 이상입니다. 그것은 하나의 규율이자, 정직함에 대한 약속 입니다. 모든 단계는 속도보다 정밀함을, 편의보다 세심함을 우선합니다. 눈에 보이지 않 는 디테일조차도 동일한 의도와 존중으로 다뤄집니다. 우리는 서두름보다 정확함을, 반복 보다 숙련을 믿습니다. 그 결과 탄생한 원단은 시간과 장인정신, 그리고 정직함을 조용히 품고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Form Section */}
      <ContactForm />
      
      {/* Main Footer Section */}
      <MainFooter />
    </div>
  );
};

export default About;

