import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationLens from "./components/NavigationLens";
import './styles/global.css';
import './styles/navigation.css';
import './styles/home.css';
import './styles/stock.css';

// 페이지 컴포넌트들 import (stock 페이지만)
import Stock from './pages/Stock';
import StockAdmin from './pages/StockAdmin';

function App() {
  return (
    <Router>
      {/* App.tsx / App.tsx의 JSX 안 (한 번만) */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="nav-refract" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves={2} seed={4} result="noise" />
          <feGaussianBlur in="noise" stdDeviation="0.5" result="map" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale="36" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>





      <div className="App">
        {/* (권장) SVG 굴절 필터는 컨트롤센터 룩과 거리가 있어 성능상 삭제/주석 처리 */}
        {/* ...필요 없으면 통째로 제거 */}

        <NavigationLens magnify={1.1}/>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Stock />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/stock/admin" element={<StockAdmin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
