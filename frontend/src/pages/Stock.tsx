import React, { useState, useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import MainFooter from '../components/MainFooter';
import { fetchProducts, adminLogin, getImageUrl } from '../services/api';
import type { Product } from '../services/api';
import '../styles/stock.css';

const Stock: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedLineup, setSelectedLineup] = useState<string>('전체');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // API에서 제품 데이터 불러오기
  useEffect(() => {
    loadAllProducts();
    loadProducts();
  }, []);

  // 라인업 변경 시 제품 데이터 다시 불러오기
  useEffect(() => {
    loadProducts();
  }, [selectedLineup]);

  const loadAllProducts = async () => {
    try {
      const data = await fetchProducts(); // 라인업 필터 없이 모든 제품 가져오기
      setAllProducts(data);
    } catch (err) {
      console.error('Failed to load all products:', err);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts(selectedLineup);
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

  // 라인업 목록 추출 (모든 제품에서)
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const lineups = ['전체', ...Array.from(new Set(allProducts.map(p => p.lineup)))];

  // 필터된 제품 목록
  const filteredProducts = selectedLineup === '전체' 
    ? products 
    : products.filter(p => p.lineup === selectedLineup);

  // 검색어로 필터링
  const searchFilteredProducts = filteredProducts.filter(product => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      product.productCode.toLowerCase().includes(search) ||
      product.color.toLowerCase().includes(search) ||
      product.lineup.toLowerCase().includes(search)
    );
  });

  // 페이지네이션 로직
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const itemsPerPage = isMobile ? 10 : 40; // 모바일: 10개, 데스크톱: 40개 (4열 x 10행)
  const totalPages = Math.ceil(searchFilteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = searchFilteredProducts.slice(startIndex, endIndex);

  // 라인업 변경 시 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLineup]);

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
        
        {/* 드롭다운을 별도로 분리 */}
        <div className="stock-dropdown-container">
          <select 
            value={selectedLineup} 
            onChange={(e) => setSelectedLineup(e.target.value)}
            className="stock-dropdown"
          >
            {lineups.map(lineup => (
              <option key={lineup} value={lineup}>
                {lineup === '전체' ? `전체 (${allProducts.length})` : `${lineup} (${allProducts.filter(p => p.lineup === lineup).length})`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 하단 재고 섹션 */}
      <div className="stock-content-section">
        <div className="stock-content-wrapper">

          {/* 재고 범례 */}
          <div className="stock-legend">
            <div className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: '#22c55e' }}></span>
              <span>재고많음</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: '#ffcc00' }}></span>
              <span>소량</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: '#ff4444' }}></span>
              <span>일시품절</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ backgroundColor: '#000000' }}></span>
              <span>영구품절</span>
            </div>
          </div>

          {/* 검색창 */}
          <div className="stock-search-container">
            <div className="stock-search-box">
              <input 
                type="text" 
                placeholder="Search(검색)" 
                className="stock-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="stock-search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* 제품 그리드 */}
          <div className="products-container">
            {loading && <div className="loading">로딩 중...</div>}
            {error && <div className="error">{error}</div>}
            <div className="products-grid">
              {!loading && currentProducts.map(product => (
                <div key={product.id} className="product-item">
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
                      {product.stock === 0 ? '일시품절' : 
                       product.stock <= 5 ? '소량' : 
                       product.stock <= 10 ? '재고많음' : '영구품절'}
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
            {!loading && filteredProducts.length > 0 && (
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
    </div>
  );
};

export default Stock;
