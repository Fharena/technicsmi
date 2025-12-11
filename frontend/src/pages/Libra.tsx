import React, { useState } from 'react';
import ContactForm from '../components/ContactForm';
import MainFooter from '../components/MainFooter';
import LibraColorPalette from '../components/LibraColorPalette';
import type { LibraColor } from '../components/LibraColorPalette';
import { libraColors } from '../components/LibraColorPalette';
import '../styles/libra.css';

const Libra: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<LibraColor>(libraColors[0]);

  // 제품 코드에서 이미지 파일명 생성 (LQT01 -> 01.png, LQT02 -> 02.png 등)
  const getProductImagePath = (productId: string): string => {
    // 제품 코드의 마지막 두 숫자 추출 (예: LQT01 -> 01, LQM11 -> 11)
    const match = productId.match(/\d{2}$/);
    const imageNumber = match ? match[0] : '01';
    // 실제 존재하는 경로: public/홈페이지 소스v2/리브라/01.png ...
    return `/홈페이지 소스v2/리브라/${imageNumber}.png`;
  };

  // 제품 코드에서 패턴 타입 확인
  const getPatternType = (productId: string): 'twill' | 'matte' | 'herringbone' => {
    if (productId.startsWith('LQT')) {
      return 'twill';
    } else if (productId.startsWith('LQM') || productId.startsWith('LQC') || productId.startsWith('LQP')) {
      return 'matte';
    } else if (productId.startsWith('LQH')) {
      return 'herringbone';
    }
    return 'twill'; // 기본값
  };

  const patternType = getPatternType(selectedColor.id);
  const selectedPatternIndex = patternType === 'twill' ? 0 : 2; // 1행 1열 = 0, 1행 3열 = 2

  return (
    <div className="libra-page">
      {/* Main Video Section */}
      <section className="libra-main-video">
        <video 
          className="libra-video"
          src="/홈페이지 소스v2/리브라/리브라 메인.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline
        />
      </section>

      {/* LIBRA Image Section */}
      <section className="libra-image-section">
        <img 
          src="/홈페이지 소스v2/리브라/LIBRA.png" 
          alt="LIBRA" 
          className="libra-image"
        />
        {/* Product Info and Color Palette Section */}
        <section className="libra-product-section">
        <div className="libra-product-container">
          <div className="libra-product-left">
            <div className="libra-section-line"></div>
            <h3 className="libra-product-code">{selectedColor.id}</h3>
            <div className="libra-product-image-container">
              <img 
                src={getProductImagePath(selectedColor.id)} 
                alt={selectedColor.name}
                className="libra-product-image"
              />
            </div>
          </div>
          <div className="libra-color-palette-wrapper">
            <div className="libra-section-line"></div>
            <LibraColorPalette 
              selectedColor={selectedColor}
              onColorSelect={setSelectedColor}
            />
          </div>
        </div>
        <div className="libra-product-divider"></div>
        <div className="libra-twill-section">
          <div className="libra-twill-info">
            {patternType === 'twill' ? (
              <>
                <h4 className="libra-twill-title">Twill weave</h4>
                <p className="libra-twill-description">
                  Twill fabric features a diagonal weave that offers a smooth drape
                  and refined texture. It combines durability and wrinkle resistance,
                  making it ideal for tailored garments.
                </p>
                <p className="libra-twill-description-kr">
                  트윌 원단은 사선 조직으로 부드러운 드레이프와 고급스러운 질감을 지니
                  며, 내구성과 구김 방지 기능을 갖춰 정장용 의류에 적합합니다.
                </p>
              </>
            ) : patternType === 'matte' ? (
              <>
                <h4 className="libra-twill-title">MATTE</h4>
                <p className="libra-twill-description">
                  Matte fabric is characterized by its soft texture and lack of surface shine, creating a calm and understated appearance.
                </p>
                <p className="libra-twill-description">
                  It offers a refined, modern look that emphasizes structure and color depth rather than gloss.
                </p>
                <p className="libra-twill-description-kr">
                  매트 원단은 표면의 광택이 거의 없고 부드러운 질감이 특징으로, 차분하고 절제
                  된 인상을 줍니다. 윤기보다는 형태감과 색의 깊이를 강조하는 세련되고 현대적
                  인 원단입니다.
                </p>
              </>
            ) : (
              <>
                <h4 className="libra-twill-title">HERRINGBONE</h4>
                <p className="libra-twill-description">
                  A herringbone weave is a variation of the twill weave featuring a distinctive zigzag pattern.
                </p>
                <p className="libra-twill-description-kr">
                  헤링본은 트윌 조직의 변형으로, 지그재그 모양의 독특한 패턴이 특징입니다.
                </p>
              </>
            )}
          </div>
          <div className="libra-twill-patterns">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num, index) => (
              <div 
                key={num}
                className={`libra-pattern-icon ${index === selectedPatternIndex ? 'selected' : ''}`}
              >
                <img src={`/홈페이지 소스v2/텍스터/${num}.png`} alt={`Pattern ${num}`} />
              </div>
            ))}
          </div>
        </div>
        </section>
      </section>

      {/* Libra Description Video Section */}
      <section className="libra-description-video">
        <video 
          className="libra-video"
          src="/홈페이지 소스v2/리브라/11.11 리브라 설명.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline
        />
      </section>

      {/* Contact Form */}
      <ContactForm />

      {/* Main Footer */}
      <MainFooter />
    </div>
  );
};

export default Libra;
