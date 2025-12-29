import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, Center } from '@react-three/drei';
import ContactForm from '../components/ContactForm';
import MainFooter from '../components/MainFooter';
import { fetchProducts, adminLogin, getImageUrl, getGlbUrl } from '../services/api';
import type { Product } from '../services/api';
import '../styles/stock.css';

// 3D 모델 컴포넌트
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={2.5} />;
}

const Stock: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('전체');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedSuggestionIndex, setFocusedSuggestionIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);

  // 라인업 목록 추출
  const lineups = ['전체', ...Array.from(new Set(allProducts.map(p => p.lineup)))];

  // API에서 제품 데이터 불러오기
  useEffect(() => {
    loadAllProducts();
    loadProducts();
  }, []);

  // 필터 변경 시 제품 데이터 다시 불러오기
  useEffect(() => {
    loadProducts();
  }, [selectedFilter]);

  const loadAllProducts = async () => {
    try {
      const data = await fetchProducts();
      setAllProducts(data);
    } catch (err) {
      console.error('Failed to load all products:', err);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts(selectedFilter === '전체' ? undefined : selectedFilter);
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError('제품 데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 재고 상태에 따른 색상 반환
  const getStockColor = (stock: number) => {
    if (stock === 0) return '#ff4444'; // 일시품절 (빨강)
    if (stock <= 5) return '#ffcc00'; // 소량 (노랑)
    if (stock <= 10) return '#22c55e'; // 재고많음 (초록)
    return '#000000'; // 영구품절 (검정)
  };

  // 재고 상태 텍스트 반환
  const getStockStatus = (stock: number): string => {
    if (stock === 0) return '일시품절';
    if (stock <= 5) return '소량';
    if (stock <= 10) return '재고많음';
    return '영구품절';
  };

  // 검색어로 필터링 (재고 상태로도 검색 가능)
  const searchFilteredProducts = products.filter(product => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    const stockStatus = getStockStatus(product.stock).toLowerCase();
    return (
      product.productCode.toLowerCase().includes(search) ||
      product.color.toLowerCase().includes(search) ||
      product.lineup.toLowerCase().includes(search) ||
      stockStatus.includes(search)
    );
  });

  // 연관검색어 생성
  const getSuggestions = (): string[] => {
    if (!searchTerm || searchTerm.length < 1) return [];
    
    const search = searchTerm.toLowerCase();
    const suggestions = new Set<string>();
    
    // 재고 상태 검색어
    const stockStatuses = ['재고많음', '소량', '일시품절', '영구품절'];
    stockStatuses.forEach(status => {
      if (status.includes(search)) {
        suggestions.add(status);
      }
    });
    
    // 제품 데이터에서 연관검색어 추출
    allProducts.forEach(product => {
      // 제품코드
      if (product.productCode.toLowerCase().includes(search)) {
        suggestions.add(product.productCode);
      }
      // 컬러
      if (product.color.toLowerCase().includes(search)) {
        suggestions.add(product.color);
      }
      // 라인업
      if (product.lineup.toLowerCase().includes(search)) {
        suggestions.add(product.lineup);
      }
    });
    
    // 최대 8개까지만 반환
    return Array.from(suggestions).slice(0, 8);
  };

  const suggestions = getSuggestions();

  // 연관검색어 선택
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    setFocusedSuggestionIndex(-1);
  };

  // 키보드 네비게이션
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedSuggestionIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
    } else if (e.key === 'Enter' && focusedSuggestionIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[focusedSuggestionIndex]);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setFocusedSuggestionIndex(-1);
    }
  };

  // 페이지네이션 로직
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const itemsPerPage = isMobile ? 10 : 40; // 모바일: 10개, 데스크톱: 40개 (4열 x 10행)
  const totalPages = Math.ceil(searchFilteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = searchFilteredProducts.slice(startIndex, endIndex);

  // 검색어 또는 필터 변경 시 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedFilter]);

  // 관리자 페이지 접근 (새창으로 열기)
  const handleAdminAccess = async () => {
    try {
      const success = await adminLogin(adminPassword);
      if (success) {
        // 새창으로 관리자 페이지 열기
        window.open('/stock/admin', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
        setShowPasswordModal(false);
        setAdminPassword('');
      } else {
        alert('비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      alert('인증 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="stock-page">
      {/* 상단 이미지 섹션 */}
      <div className="stock-hero-section">
        <div className="stock-background-image">
          <img src="/홈페이지 소스정리/재고현황/배너.png" alt="Stock Background" />
        </div>
        <div className="stock-text-overlay">
          <div className="stock-title-container">
            <h1 className="stock-title">
              TCS TEXTILE
            </h1>
            <div className="stock-small-text">
              CRAFTED WITH PURPOSE
            </div>
          </div>
        </div>
        
        {/* 커스텀 드롭다운 - 라인업만 */}
        <div className="stock-dropdown-container">
          <div 
            className={`stock-dropdown-custom ${showDropdown ? 'open' : ''}`}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="dropdown-selected-text">
              {selectedFilter === '전체' 
                ? '전체' 
                : `${selectedFilter} (${allProducts.filter(p => p.lineup === selectedFilter).length})`
              }
            </span>
            <span className="dropdown-arrow">
              <svg width="10" height="6" viewBox="0 0 10 6">
                <path fill="white" d="M1 0L5 4L9 0L10 1L5 6L0 1z"/>
              </svg>
            </span>
          </div>
          
          {showDropdown && (
            <>
              <div 
                className="dropdown-backdrop" 
                onClick={() => setShowDropdown(false)}
              />
              <div className="stock-dropdown-list">
                <div 
                  className={`dropdown-option ${selectedFilter === '전체' ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedFilter('전체');
                    setShowDropdown(false);
                  }}
                >
                  전체
                </div>
                {lineups.filter(l => l !== '전체').map(lineup => (
                  <div 
                    key={lineup}
                    className={`dropdown-option ${selectedFilter === lineup ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedFilter(lineup);
                      setShowDropdown(false);
                    }}
                  >
                    {lineup} ({allProducts.filter(p => p.lineup === lineup).length})
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* 하단 재고 섹션 */}
      <div className="stock-content-section">
        <div className="stock-content-wrapper">

          {/* 재고 범례 - 클릭하면 해당 재고 상태로 필터링 */}
          <div className="stock-legend">
            <div 
              className={`legend-item clickable ${searchTerm === '재고많음' ? 'active' : ''}`}
              onClick={() => setSearchTerm(searchTerm === '재고많음' ? '' : '재고많음')}
            >
              <span className="legend-dot" style={{ backgroundColor: '#22c55e' }}></span>
              <span>재고많음</span>
            </div>
            <div 
              className={`legend-item clickable ${searchTerm === '소량' ? 'active' : ''}`}
              onClick={() => setSearchTerm(searchTerm === '소량' ? '' : '소량')}
            >
              <span className="legend-dot" style={{ backgroundColor: '#ffcc00' }}></span>
              <span>소량</span>
            </div>
            <div 
              className={`legend-item clickable ${searchTerm === '일시품절' ? 'active' : ''}`}
              onClick={() => setSearchTerm(searchTerm === '일시품절' ? '' : '일시품절')}
            >
              <span className="legend-dot" style={{ backgroundColor: '#ff4444' }}></span>
              <span>일시품절</span>
            </div>
            <div 
              className={`legend-item clickable ${searchTerm === '영구품절' ? 'active' : ''}`}
              onClick={() => setSearchTerm(searchTerm === '영구품절' ? '' : '영구품절')}
            >
              <span className="legend-dot" style={{ backgroundColor: '#000000' }}></span>
              <span>영구품절</span>
            </div>
          </div>

          {/* 검색창 */}
          <div className="stock-search-container">
            <div className={`stock-search-box ${showSuggestions && suggestions.length > 0 ? 'has-suggestions' : ''}`}>
              <input 
                type="text" 
                placeholder="Search(검색)" 
                className="stock-search-input"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(true);
                  setFocusedSuggestionIndex(-1);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                  // 약간의 딜레이를 줘서 클릭 이벤트가 먼저 처리되도록
                  setTimeout(() => setShowSuggestions(false), 200);
                }}
                onKeyDown={handleSearchKeyDown}
              />
              <div className="stock-search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              
              {/* 연관검색어 드롭다운 */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="search-suggestions">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={suggestion}
                      className={`search-suggestion-item ${index === focusedSuggestionIndex ? 'focused' : ''}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <span className="suggestion-text">{suggestion}</span>
                      {['재고많음', '소량', '일시품절', '영구품절'].includes(suggestion) && (
                        <span className="suggestion-badge">재고상태</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 제품 그리드 */}
          <div className="products-container">
            {loading && <div className="loading">로딩 중...</div>}
            {error && <div className="error">{error}</div>}
            <div className="products-grid">
              {!loading && currentProducts.map(product => (
                <div 
                  key={product.id} 
                  className="product-item"
                  onClick={() => setSelectedProduct(product)}
                  style={{ cursor: 'pointer' }}
                >
                <div className={`product-image-wrapper ${product.restockMessage ? 'blurred' : ''}`}>
                  {product.image ? (
                    <img src={getImageUrl(product.image)} alt={product.productCode} />
                  ) : (
                    <div className="no-image"></div>
                  )}
                  {product.restockMessage && (
                    <div className="restock-overlay">
                      <div className="restock-text">{product.restockMessage}</div>
                    </div>
                  )}
                </div>
                <div className="product-details">
                  <div className="product-code">{product.productCode}</div>
                  <div className="stock-status-bar">
                    <span 
                      className="legend-dot" 
                      style={{ backgroundColor: getStockColor(product.stock) }}
                    ></span>
                    <span className="stock-text">
                      {getStockStatus(product.stock)}
                    </span>
                  </div>
                  <div className="product-lineup">{product.lineup}</div>
                  <div className="product-color">{product.color}</div>
                  <div className="product-remarks">
                    {product.remarks || ''}
                  </div>
                </div>
                </div>
              ))}
            </div>

            {/* 페이지네이션 */}
            {!loading && searchFilteredProducts.length > 0 && (
              <div className="pagination">
                <button 
                  className="pagination-btn"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  &lt;
                </button>
                
                <div className="pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button 
                  className="pagination-btn"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <ContactForm />

      {/* Main Footer */}
      <MainFooter />

      {/* 관리자 버튼 (하단 고정) */}
      <button 
        className="floating-admin-button"
        onClick={() => setShowPasswordModal(true)}
      >
        관리자
      </button>

      {/* 비밀번호 모달 */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>관리자 인증</h3>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="비밀번호 입력"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAdminAccess();
                }
              }}
            />
            <div className="modal-buttons">
              <button className="btn-confirm" onClick={handleAdminAccess}>확인</button>
              <button className="btn-cancel" onClick={() => {
                setShowPasswordModal(false);
                setAdminPassword('');
              }}>취소</button>
            </div>
          </div>
        </div>
      )}

      {/* 3D 제품 모달 */}
      {selectedProduct && (
        <div className="product-3d-modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="product-3d-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="product-3d-modal-close"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>
            <div className="product-3d-modal-header">
              <h2 className="product-3d-modal-title">{selectedProduct.productCode}</h2>
            </div>
            <div className="product-3d-modal-content">
              {selectedProduct.glbFile ? (
                <Canvas
                  camera={{ position: [0, 0, 3], fov: 50 }}
                  style={{ background: '#f5f5f5' }}
                >
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                  <pointLight position={[-10, -10, -10]} />
                  <Suspense fallback={null}>
                    <Center>
                      <Model url={getGlbUrl(selectedProduct.glbFile)} />
                    </Center>
                    <Environment preset="studio" />
                  </Suspense>
                  <OrbitControls 
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    autoRotate={false}
                  />
                </Canvas>
              ) : (
                <div className="product-3d-no-model">
                  {selectedProduct.image ? (
                    <img 
                      src={getImageUrl(selectedProduct.image)} 
                      alt={selectedProduct.productCode}
                      className="product-3d-fallback-image"
                    />
                  ) : (
                    <div className="product-3d-no-content">
                      <p>3D 모델이 없습니다</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stock;
