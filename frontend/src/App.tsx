import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavigationLens from "./components/NavigationLens";
import './styles/global.css';
import './styles/navigation.css';
import './styles/home.css';
import './styles/pages.css';
import './styles/about.css';
import './styles/work.css';
import './styles/archive.css';
import './styles/archive1.css';
import './styles/archive2.css';
import './styles/archive3.css';
import './styles/stock.css';

// 홈 페이지만 즉시 로드 (가장 중요한 페이지)
import Home from './pages/Home';

// 나머지 페이지들은 지연 로딩
const About = lazy(() => import('./pages/About'));
const Aqua = lazy(() => import('./pages/Aqua'));
const Froma = lazy(() => import('./pages/Froma'));
const Libra = lazy(() => import('./pages/Libra'));
const Work = lazy(() => import('./pages/Work'));
const Archive = lazy(() => import('./pages/Archive'));
const Archive1 = lazy(() => import('./pages/Archive1'));
const Archive2 = lazy(() => import('./pages/Archive2'));
const Archive3 = lazy(() => import('./pages/Archive3'));
const Archive4 = lazy(() => import('./pages/Archive4'));
const Archive5 = lazy(() => import('./pages/Archive5'));
const Archive6 = lazy(() => import('./pages/Archive6'));
const Archive7 = lazy(() => import('./pages/Archive7'));
const Archive8 = lazy(() => import('./pages/Archive8'));
const Stock = lazy(() => import('./pages/Stock'));
const StockAdmin = lazy(() => import('./pages/StockAdmin'));

// 로딩 컴포넌트
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '18px',
    color: '#666'
  }}>
    로딩 중...
  </div>
);

// 페이지 이동 시 맨 위로 스크롤하는 컴포넌트
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

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

      <Routes>
        {/* 스톡 페이지는 네비게이션 바 없이 완전 격리 */}
        <Route path="/stock" element={<Stock />} />
        <Route path="/stock/admin" element={<StockAdmin />} />
        
        {/* 나머지 페이지들은 네비게이션 바와 함께 */}
        <Route path="/*" element={
          <div className="App">
            <ScrollToTop />
            <NavigationLens magnify={1.1}/>
            <main className="main-content">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/aqua" element={<Aqua />} />
                  <Route path="/froma" element={<Froma />} />
                  <Route path="/libra" element={<Libra />} />
                  <Route path="/work" element={<Work />} />
                  <Route path="/archive" element={<Archive />} />
                  <Route path="/archive1" element={<Archive1 />} />
                  <Route path="/archive2" element={<Archive2 />} />
                  <Route path="/archive3" element={<Archive3 />} />
                  <Route path="/archive4" element={<Archive4 />} />
                  <Route path="/archive5" element={<Archive5 />} />
                  <Route path="/archive6" element={<Archive6 />} />
                  <Route path="/archive7" element={<Archive7 />} />
                  <Route path="/archive8" element={<Archive8 />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
