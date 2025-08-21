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

    let animationId: number;

    // 스크롤과 함께 업데이트되는 렌즈 효과
    const updateLensEffect = () => {
      const nav = document.querySelector('.navigation') as HTMLElement;
      if (!nav) return;

      // 내비게이션 바의 현재 위치 가져오기
      const navRect = nav.getBoundingClientRect();
      
      // Canvas 크기를 내비게이션 바에 맞춤
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = navRect.width * pixelRatio;
      canvas.height = navRect.height * pixelRatio;
      canvas.style.width = navRect.width + 'px';
      canvas.style.height = navRect.height + 'px';
      
      // Canvas 위치를 내비게이션 바와 정확히 일치시킴
      canvas.style.left = navRect.left + 'px';
      canvas.style.top = navRect.top + 'px';
      
      ctx.scale(pixelRatio, pixelRatio);
      ctx.clearRect(0, 0, navRect.width, navRect.height);

      // 배경 이미지 캡처 및 렌즈 효과 적용
      applyBorderLensEffect(navRect);
      
      // 다음 프레임에서 다시 업데이트
      animationId = requestAnimationFrame(updateLensEffect);
    };

    // 테두리를 따라 굴절되는 렌즈 효과
    const applyBorderLensEffect = (navRect: DOMRect) => {
      const { width, height } = navRect;
      const centerX = width / 2;
      const centerY = height / 2;
      const borderRadius = 23; // 내비바의 border-radius
      
      // 배경 캡처 (가상의 이미지 데이터 생성)
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      
      // 페이지에서 배경 색상 샘플링
      const bodyBg = window.getComputedStyle(document.body).backgroundColor;
      const [r, g, b] = extractRGB(bodyBg);
      
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          
          // 둥근 테두리 내부인지 확인
          const isInsideBorder = isInsideRoundedRect(x, y, width, height, borderRadius);
          
          if (isInsideBorder) {
            // 테두리로부터의 거리 계산
            const distanceFromBorder = getDistanceFromBorder(x, y, width, height, borderRadius);
            const maxDistance = Math.min(width, height) / 4;
            
            // 테두리 근처에서 굴절 강도가 높아짐
            const refractionStrength = Math.max(0, 1 - (distanceFromBorder / maxDistance));
            const lensEffect = refractionStrength * 15; // 렌즈 효과 강도
            
            // 테두리 방향으로 굴절 계산
            const borderVector = getBorderVector(x, y, width, height, borderRadius);
            const refractedX = x + borderVector.x * lensEffect;
            const refractedY = y + borderVector.y * lensEffect;
            
            // 굴절된 색상 계산 (그라데이션 효과)
            const intensity = 1 - refractionStrength * 0.3;
            data[index] = Math.floor(r * intensity);     // R
            data[index + 1] = Math.floor(g * intensity); // G  
            data[index + 2] = Math.floor(b * intensity); // B
            data[index + 3] = 255 * (0.1 + refractionStrength * 0.2); // A
          } else {
            // 테두리 밖은 투명
            data[index + 3] = 0;
          }
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      // 테두리 하이라이트 추가
      addBorderHighlight(width, height, borderRadius);
    };

    // 유틸리티 함수들
    const extractRGB = (colorStr: string): [number, number, number] => {
      const match = colorStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
      }
      return [255, 255, 255]; // 기본값: 흰색
    };

    const isInsideRoundedRect = (x: number, y: number, w: number, h: number, r: number): boolean => {
      const rx = Math.max(0, Math.min(r, Math.abs(x - w/2) - (w/2 - r)));
      const ry = Math.max(0, Math.min(r, Math.abs(y - h/2) - (h/2 - r)));
      return rx * rx + ry * ry <= r * r;
    };

    const getDistanceFromBorder = (x: number, y: number, w: number, h: number, r: number): number => {
      const centerX = w / 2;
      const centerY = h / 2;
      const dx = Math.abs(x - centerX) - (w/2 - r);
      const dy = Math.abs(y - centerY) - (h/2 - r);
      return Math.max(0, Math.sqrt(Math.max(0, dx) ** 2 + Math.max(0, dy) ** 2) - r);
    };

    const getBorderVector = (x: number, y: number, w: number, h: number, r: number): {x: number, y: number} => {
      const centerX = w / 2;
      const centerY = h / 2;
      const dx = x - centerX;
      const dy = y - centerY;
      const length = Math.sqrt(dx * dx + dy * dy);
      return length > 0 ? { x: dx / length, y: dy / length } : { x: 0, y: 0 };
    };

    const addBorderHighlight = (w: number, h: number, r: number) => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      
      // 수동으로 둥근 사각형 그리기 (브라우저 호환성)
      ctx.moveTo(r, 0);
      ctx.lineTo(w - r, 0);
      ctx.arcTo(w, 0, w, r, r);
      ctx.lineTo(w, h - r);
      ctx.arcTo(w, h, w - r, h, r);
      ctx.lineTo(r, h);
      ctx.arcTo(0, h, 0, h - r, r);
      ctx.lineTo(0, r);
      ctx.arcTo(0, 0, r, 0, r);
      ctx.closePath();
      
      ctx.stroke();
    };

    // 초기 시작
    updateLensEffect();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`liquid-glass-container ${className}`}>
      <canvas
        ref={canvasRef}
        className="liquid-glass-canvas"
        style={{
          position: 'fixed', // fixed로 변경하여 스크롤에 따라 움직임
          pointerEvents: 'none',
          zIndex: 3, // 내비게이션 바보다 위에 표시
          borderRadius: '23px', // 내비바와 동일한 border-radius
          mixBlendMode: 'multiply', // 배경과 자연스럽게 블렌딩
          opacity: 0.8 // 약간의 투명도
        }}
      />
      {children}
    </div>
  );
};

export default LiquidGlass;
