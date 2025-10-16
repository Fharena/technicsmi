import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React 관련 라이브러리들을 별도 청크로 분리
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // Three.js 코어를 별도 청크로 분리
          'three-core': ['three'],
          // React Three Fiber 관련
          'three-fiber': ['@react-three/fiber'],
          // Drei 유틸리티들
          'three-drei': ['@react-three/drei'],
          // Rive 애니메이션 라이브러리 (사용하지 않으므로 제거)
          // 'rive-vendor': ['@rive-app/canvas', '@rive-app/react-canvas'],
          // 기타 라이브러리들
          'utils-vendor': ['@emailjs/browser', 'react-icons']
        }
      }
    },
    // 청크 크기 경고 임계값을 1000KB로 증가 (현재 1.3MB이므로)
    chunkSizeWarningLimit: 1000
  },
  // 개발 서버 최적화
  server: {
    hmr: {
      overlay: false // HMR 오버레이 비활성화로 성능 향상
    }
  }
})
