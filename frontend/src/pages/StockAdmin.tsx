import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, createProduct, updateProduct, deleteProduct, uploadImage, getImageUrl } from '../services/api';
import type { Product } from '../services/api';
import '../styles/stock.css';

const StockAdmin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // 새 제품 폼 상태
  const [newProduct, setNewProduct] = useState({
    lineup: '',
    productCode: '',
    color: '',
    image: '',
    stock: 0,
  });

  // 비밀번호 변경 상태
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // API에서 제품 불러오기
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to load products:', err);
      alert('제품 데이터를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 제품 추가
  const handleAddProduct = async () => {
    if (!newProduct.lineup || !newProduct.productCode || !newProduct.color) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    try {
      await createProduct(newProduct);
      await loadProducts();
      
      setNewProduct({
        lineup: '',
        productCode: '',
        color: '',
        image: '',
        stock: 0,
      });
      setShowAddForm(false);
      alert('제품이 추가되었습니다.');
    } catch (err) {
      console.error('Failed to add product:', err);
      alert('제품 추가에 실패했습니다.');
    }
  };

  // 제품 수정
  const handleUpdateProduct = async (id: string, updates: Partial<Product>) => {
    try {
      // 수정 전 제품 정보 가져오기 (이미지 변경 확인용)
      const originalProduct = products.find(p => p.id === id);
      
      await updateProduct(id, updates);
      
      // 이미지가 변경된 경우 이전 이미지 캐시 정리
      if (originalProduct?.image && updates.image && originalProduct.image !== updates.image) {
        try {
          const oldImageFilename = originalProduct.image.replace('/uploads/', '');
          
          // 로컬 스토리지에서 이전 이미지 캐시 삭제
          const cacheKeys = Object.keys(localStorage);
          cacheKeys.forEach(key => {
            if (key.includes(oldImageFilename) || key.includes(originalProduct.image)) {
              localStorage.removeItem(key);
              console.log(`Removed old cached image from localStorage: ${key}`);
            }
          });
        } catch (cacheError) {
          console.warn('Failed to clear old image cache:', cacheError);
        }
      }
      
      await loadProducts();
    } catch (err) {
      console.error('Failed to update product:', err);
      alert('제품 수정에 실패했습니다.');
    }
  };

  // 제품 삭제
  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        // 삭제할 제품의 이미지 정보 가져오기
        const productToDelete = products.find(p => p.id === id);
        
        await deleteProduct(id);
        
        // 로컬 스토리지에서 이미지 캐시 정리
        if (productToDelete?.image) {
          try {
            // 이미지 파일명 추출
            const imageFilename = productToDelete.image.replace('/uploads/', '');
            
            // 로컬 스토리지에서 해당 이미지 캐시 삭제
            const cacheKeys = Object.keys(localStorage);
            cacheKeys.forEach(key => {
              if (key.includes(imageFilename) || key.includes(productToDelete.image)) {
                localStorage.removeItem(key);
                console.log(`Removed cached image from localStorage: ${key}`);
              }
            });
            
            // 브라우저 캐시도 정리 (선택적)
            if ('caches' in window) {
              caches.keys().then(cacheNames => {
                cacheNames.forEach(cacheName => {
                  caches.open(cacheName).then(cache => {
                    cache.delete(productToDelete.image);
                  });
                });
              });
            }
          } catch (cacheError) {
            console.warn('Failed to clear image cache:', cacheError);
          }
        }
        
        await loadProducts();
        alert('제품이 삭제되었습니다.');
      } catch (err) {
        console.error('Failed to delete product:', err);
        alert('제품 삭제에 실패했습니다.');
      }
    }
  };

  // 재고 수정 (드롭다운)
  const handleStockChange = async (id: string, stockStatus: string) => {
    let stockValue = 0;
    switch(stockStatus) {
      case '품절': stockValue = 0; break;
      case '입고예정': stockValue = 3; break;
      case '재고있음': stockValue = 8; break;
      case '재고많음': stockValue = 15; break;
    }
    await handleUpdateProduct(id, { stock: stockValue });
  };

  // 재고 값을 상태 문자열로 변환
  const getStockStatus = (stock: number): string => {
    if (stock === 0) return '품절';
    if (stock <= 5) return '입고예정';
    if (stock <= 10) return '재고있음';
    return '재고많음';
  };

  // 이미지 파일 업로드 처리
  const handleImageUpload = async (file: File) => {
    if (file && file.type.startsWith('image/')) {
      try {
        // 파일 크기 체크 (5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('파일 크기는 5MB 이하여야 합니다.');
          return;
        }
        
        // 서버에 업로드
        const imageUrl = await uploadImage(file);
        setNewProduct({...newProduct, image: imageUrl});
      } catch (error) {
        console.error('Image upload failed:', error);
        alert('이미지 업로드에 실패했습니다.');
      }
    } else {
      alert('이미지 파일만 업로드 가능합니다.');
    }
  };

  // 드래그 앤 드롭 이벤트
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) await handleImageUpload(file);
  };

  // 비밀번호 변경
  const handleChangePassword = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      alert('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    // 여기서는 간단히 로컬 스토리지 사용 (실제로는 서버에서 처리해야 함)
    alert('비밀번호 변경 기능은 서버 측에서 구현이 필요합니다.');
    setShowPasswordModal(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  // 로컬 스토리지 이미지 캐시 전체 정리
  const handleClearImageCache = () => {
    if (window.confirm('모든 이미지 캐시를 정리하시겠습니까?')) {
      try {
        const cacheKeys = Object.keys(localStorage);
        let clearedCount = 0;
        
        cacheKeys.forEach(key => {
          // 이미지 관련 캐시 키들 정리
          if (key.includes('/uploads/') || key.includes('image') || key.includes('cache')) {
            localStorage.removeItem(key);
            clearedCount++;
          }
        });
        
        // 브라우저 캐시도 정리
        if ('caches' in window) {
          caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => {
              caches.delete(cacheName);
            });
          });
        }
        
        alert(`이미지 캐시 ${clearedCount}개가 정리되었습니다.`);
      } catch (error) {
        console.error('Failed to clear image cache:', error);
        alert('캐시 정리 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-content-wrapper">
        <header className="admin-header">
        <h1>재고 관리 시스템</h1>
        <div className="admin-actions">
          <button className="btn-add" onClick={() => setShowAddForm(true)}>
            + 제품 추가
          </button>
          <button className="btn-cache" onClick={handleClearImageCache}>
            🗑️ 캐시 정리
          </button>
          <button className="btn-password" onClick={() => setShowPasswordModal(true)}>
            🔒 비밀번호 변경
          </button>
          <button className="btn-back" onClick={() => navigate('/stock')}>
            재고 현황으로
          </button>
        </div>
      </header>

      {/* 제품 추가 폼 */}
      {showAddForm && (
        <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
          <div className="modal-content form-modal" onClick={(e) => e.stopPropagation()}>
            <h3>새 제품 추가</h3>
            <div className="form-group">
              <label>라인업 *</label>
              <input
                type="text"
                value={newProduct.lineup}
                onChange={(e) => setNewProduct({...newProduct, lineup: e.target.value})}
                placeholder="예: LIBRA"
              />
            </div>
            <div className="form-group">
              <label>제품 코드 *</label>
              <input
                type="text"
                value={newProduct.productCode}
                onChange={(e) => setNewProduct({...newProduct, productCode: e.target.value})}
                placeholder="예: LQT01"
              />
            </div>
            <div className="form-group">
              <label>컬러 *</label>
              <input
                type="text"
                value={newProduct.color}
                onChange={(e) => setNewProduct({...newProduct, color: e.target.value})}
                placeholder="예: M.D.BLACK"
              />
            </div>
            <div className="form-group">
              <label>이미지</label>
              <div 
                className={`image-upload-area ${dragOver ? 'drag-over' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                {newProduct.image ? (
                  <div className="image-preview">
                    <img src={getImageUrl(newProduct.image)} alt="Preview" />
                    <button 
                      className="btn-remove-image"
                      onClick={(e) => {
                        e.stopPropagation();
                        setNewProduct({...newProduct, image: ''});
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <div className="upload-icon">📁</div>
                    <p>클릭하거나 이미지를 드래그하세요</p>
                    <span>JPG, PNG, GIF 지원</span>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) await handleImageUpload(file);
                }}
              />
            </div>
            <div className="form-group">
              <label>재고</label>
              <select
                value={getStockStatus(newProduct.stock)}
                onChange={(e) => {
                  const status = e.target.value;
                  let stockValue = 0;
                  switch(status) {
                    case '품절': stockValue = 0; break;
                    case '입고예정': stockValue = 3; break;
                    case '재고있음': stockValue = 8; break;
                    case '재고많음': stockValue = 15; break;
                  }
                  setNewProduct({...newProduct, stock: stockValue});
                }}
                className="stock-status-select"
              >
                <option value="품절">🔴 품절</option>
                <option value="입고예정">🟡 입고예정</option>
                <option value="재고있음">🟢 재고있음</option>
                <option value="재고많음">⚫ 재고많음</option>
              </select>
            </div>
            <div className="modal-buttons">
              <button className="btn-primary" onClick={handleAddProduct}>추가</button>
              <button className="btn-secondary" onClick={() => {
                setShowAddForm(false);
                setNewProduct({
                  lineup: '',
                  productCode: '',
                  color: '',
                  image: '',
                  stock: 0,
                });
              }}>취소</button>
            </div>
          </div>
        </div>
      )}

      {/* 비밀번호 변경 모달 */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>비밀번호 변경</h3>
            <div className="form-group">
              <label>현재 비밀번호</label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                placeholder="현재 비밀번호"
              />
            </div>
            <div className="form-group">
              <label>새 비밀번호</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                placeholder="새 비밀번호 (최소 6자)"
              />
            </div>
            <div className="form-group">
              <label>새 비밀번호 확인</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                placeholder="새 비밀번호 확인"
              />
            </div>
            <div className="modal-buttons">
              <button className="btn-confirm" onClick={handleChangePassword}>변경</button>
              <button className="btn-cancel" onClick={() => {
                setShowPasswordModal(false);
                setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
              }}>취소</button>
            </div>
          </div>
        </div>
      )}

      {/* 제품 목록 테이블 */}
      {loading ? (
        <div className="loading">제품 목록을 불러오는 중...</div>
      ) : (
        <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>이미지</th>
              <th>라인업</th>
              <th>제품코드</th>
              <th>컬러</th>
              <th>재고</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  {product.image ? (
                    <img src={getImageUrl(product.image)} alt={product.productCode} className="table-image" />
                  ) : (
                    <div className="table-no-image">No Image</div>
                  )}
                </td>
                <td>
                  {editingProduct?.id === product.id ? (
                    <input
                      type="text"
                      value={editingProduct.lineup}
                      onChange={(e) => setEditingProduct({...editingProduct, lineup: e.target.value})}
                    />
                  ) : (
                    product.lineup
                  )}
                </td>
                <td>
                  {editingProduct?.id === product.id ? (
                    <input
                      type="text"
                      value={editingProduct.productCode}
                      onChange={(e) => setEditingProduct({...editingProduct, productCode: e.target.value})}
                    />
                  ) : (
                    product.productCode
                  )}
                </td>
                <td>
                  {editingProduct?.id === product.id ? (
                    <input
                      type="text"
                      value={editingProduct.color}
                      onChange={(e) => setEditingProduct({...editingProduct, color: e.target.value})}
                    />
                  ) : (
                    product.color
                  )}
                </td>
                <td>
                  <select
                    value={getStockStatus(product.stock)}
                    onChange={(e) => handleStockChange(product.id, e.target.value)}
                    className="stock-status-select"
                  >
                    <option value="품절">🔴 품절</option>
                    <option value="입고예정">🟡 입고예정</option>
                    <option value="재고있음">🟢 재고있음</option>
                    <option value="재고많음">⚫ 재고많음</option>
                  </select>
                </td>
                <td>
                  <div className="table-actions">
                    {editingProduct?.id === product.id ? (
                      <>
                        <button 
                          className="btn-save"
                          onClick={() => {
                            handleUpdateProduct(editingProduct.id, editingProduct);
                            setEditingProduct(null);
                          }}
                        >
                          저장
                        </button>
                        <button 
                          className="btn-cancel"
                          onClick={() => setEditingProduct(null)}
                        >
                          취소
                        </button>
                      </>
                    ) : (
                      <>
                        <button 
                          className="btn-edit"
                          onClick={() => setEditingProduct(product)}
                        >
                          수정
                        </button>
                        <button 
                          className="btn-delete"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      </div>
    </div>
  );
};

export default StockAdmin;
