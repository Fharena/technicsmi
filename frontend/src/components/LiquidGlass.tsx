import React, { useEffect, useRef } from 'react';

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
}

const LiquidGlass: React.FC<LiquidGlassProps> = ({ children, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const container = containerRef.current;

    if (!canvas || !ctx || !container) return;

    // Canvas 크기 설정
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // 이미지가 로드된 후 굴절 효과 적용
      const img = container.querySelector('img');
      if (img && img.complete) {
        applyRefractionEffect();
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 굴절 효과 적용 함수
    const applyRefractionEffect = () => {
      const img = container.querySelector('img');
      if (!img) return;

      const { width, height } = canvas;
      
      // 네비게이션 바 위치에 해당하는 이미지 부분만 잘라내기
      const imgRect = img.getBoundingClientRect();
      const navTop = 2 * 16; // 2rem을 픽셀로 변환
      const navHeight = 100; // 네비게이션 바 높이
      
      // 이미지를 Canvas에 그리기 (네비게이션 바 영역만)
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(
        img, 
        0, navTop, imgRect.width, navHeight, // 소스 이미지에서 잘라낼 부분
        0, 0, width, height // Canvas에 그릴 부분
      );
      
      // 굴절 효과를 위한 이미지 데이터 가져오기
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      // 굴절 맵 생성 (볼록렌즈 효과)
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          
          // 중앙으로부터의 거리 계산
          const centerX = width / 2;
          const centerY = height / 2;
          const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          const maxDistance = Math.min(width, height) / 2;
          
          // 굴절 강도 계산 (중앙에서 가장 강함)
          const refractionStrength = Math.max(0, 1 - (distance / maxDistance));
          const refraction = refractionStrength * 30; // 굴절 강도 증가
          
          // 굴절된 위치 계산
          const refractedX = Math.max(0, Math.min(width - 1, x + (x - centerX) * refraction / 100));
          const refractedY = Math.max(0, Math.min(height - 1, y + (y - centerY) * refraction / 100));
          
          // 굴절된 위치의 픽셀 색상 가져오기
          const refractedIndex = (Math.floor(refractedY) * width + Math.floor(refractedX)) * 4;
          
          if (refractedIndex >= 0 && refractedIndex < data.length - 4) {
            data[index] = data[refractedIndex];     // R
            data[index + 1] = data[refractedIndex + 1]; // G
            data[index + 2] = data[refractedIndex + 2]; // B
            data[index + 3] = data[refractedIndex + 3] * 0.95; // A (약간 투명하게)
          }
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
    };

    // 이미지 로드 완료 후 굴절 효과 적용
    const img = container.querySelector('img');
    if (img) {
      if (img.complete) {
        applyRefractionEffect();
      } else {
        img.addEventListener('load', applyRefractionEffect);
      }
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      const img = container.querySelector('img');
      if (img) {
        img.removeEventListener('load', applyRefractionEffect);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`liquid-glass-container ${className}`}>
      <canvas
        ref={canvasRef}
        className="liquid-glass-canvas"
        style={{
          position: 'absolute',
          top: '2rem', // 네비게이션 바 위치에 맞춤
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px', // 네비게이션 바와 동일한 너비
          height: '100px', // 네비게이션 바 높이
          pointerEvents: 'none',
          zIndex: 2,
          borderRadius: '50px',
          overflow: 'hidden'
        }}
      />
      {children}
    </div>
  );
};

export default LiquidGlass;
