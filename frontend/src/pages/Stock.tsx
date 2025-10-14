import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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

  // 관리자 페이지 접근
  const handleAdminAccess = async () => {
    try {
      const success = await adminLogin(adminPassword);
      if (success) {
        navigate('/stock/admin');
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
      <div className="stock-content-wrapper">
        {/* 로고 */}
        <div className="stock-logo-section">
          <img src="/홈페이지 소스정리/재고현황/대지 1 1.png" alt="TCS Logo" className="tcs-logo" />
        </div>

        {/* 중앙 로고 */}
        <div className="stock-center-logo">
          <img src="/홈페이지 소스정리/재고현황/Frame 391.png" alt="Center Logo" className="center-logo-img" />
        </div>

        {/* 라인업 필터 */}
        <div className="lineup-selector">
          <select 
            value={selectedLineup} 
            onChange={(e) => setSelectedLineup(e.target.value)}
            className="lineup-dropdown"
          >
            {lineups.map(lineup => (
              <option key={lineup} value={lineup}>
                {lineup === '전체' ? `전체 (${allProducts.length})` : `${lineup} (${allProducts.filter(p => p.lineup === lineup).length})`}
              </option>
            ))}
          </select>
        </div>

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

        {/* 제품 그리드 */}
        <div className="products-container">
          {loading && <div className="loading">로딩 중...</div>}
          {error && <div className="error">{error}</div>}
          <div className="products-grid">
            {!loading && filteredProducts.map(product => (
              <div key={product.id} className="product-item">
                <div className="product-image-wrapper">
                  {product.image ? (
                    <img src={getImageUrl(product.image)} alt={product.productCode} />
                  ) : (
                    <div className="no-image"></div>
                  )}
                </div>
                <div className="product-details">
                  <div className="product-code">{product.productCode}</div>
                  <div className="product-lineup">{product.lineup}</div>
                  <div className="product-color">{product.color}</div>
                  <div className="stock-status-bar">
                    <span 
                      className="color-bar" 
                      style={{ backgroundColor: getStockColor(product.stock) }}
                    ></span>
                  </div>
                </div>
              </div>
            ))}
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
