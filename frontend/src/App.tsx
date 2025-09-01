import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'; // ← NavLink import
import NavigationLens from "./components/NavigationLens";
import './styles/global.css';
import './styles/navigation.css';
import './styles/home.css';
import './styles/pages.css';
import './styles/about.css';

// 페이지 컴포넌트들 import
import Home from './pages/Home';
import About from './pages/About';
import Aqua from './pages/Aqua';
import Froma from './pages/Froma';
import Libra from './pages/Libra';
import Work from './pages/Work';
import Archive from './pages/Archive';
import Archive1 from './pages/Archive1';
import Archive2 from './pages/Archive2';
import Archive3 from './pages/Archive3';
import Archive4 from './pages/Archive4';
import Archive5 from './pages/Archive5';
import Archive6 from './pages/Archive6';
import Archive7 from './pages/Archive7';
import Archive8 from './pages/Archive8';
// (선택) Contact/Cart가 없다면 링크를 지우거나 더미 페이지를 만들어요.
// import Contact from './pages/Contact';
// import Cart from './pages/Cart';

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

        <NavigationLens radius={48} magnify={1.1}/>

        <main className="main-content">
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
            {/* 라우트가 있다면 추가
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
