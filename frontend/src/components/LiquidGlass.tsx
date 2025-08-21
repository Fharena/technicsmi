import React from 'react';

interface LiquidGlassProps {
  children: React.ReactNode;
  className?: string;
}

// LiquidGlass 컴포넌트 완전 비활성화 - 왜곡 효과 제거
const LiquidGlass: React.FC<LiquidGlassProps> = ({ children, className = '' }) => {
  // 모든 효과 제거하고 children만 반환

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default LiquidGlass;
