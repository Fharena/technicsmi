import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, createProduct, updateProduct, deleteProduct, uploadImage, uploadGlb, getImageUrl, deleteImage, deleteGlb } from '../services/api';
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
  
  // 이미지 수정을 위한 상태
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState<string | null>(null);
  
  // 검색 및 필터 상태
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLineup, setSelectedLineup] = useState('전체');

  // 새 제품 폼 상태
  const [newProduct, setNewProduct] = useState({
    lineup: '',
    productCode: '',
    color: '',
    image: '',
    stock: 0,
    restockMessage: '',
    remarks: '',
    glbFile: '',
  });
  
  // GLB 업로드 ref
  const glbInputRef = useRef<HTMLInputElement>(null);

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
        restockMessage: '',
        remarks: '',
        glbFile: '',
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
      console.log('Updating product:', id, updates);
      const updatedProduct = await updateProduct(id, updates);
      
      // 전체 새로고침 대신 해당 제품만 업데이트
      setProducts(prevProducts => 
        prevProducts.map(p => p.id === id ? updatedProduct : p)
      );
      
      alert('제품이 수정되었습니다.');
    } catch (err) {
      console.error('Failed to update product:', err);
      alert(`제품 수정에 실패했습니다: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  // 제품 삭제
  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteProduct(id);
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
      case '일시품절': stockValue = 0; break;
      case '소량': stockValue = 3; break;
      case '재고많음': stockValue = 8; break;
      case '영구품절': stockValue = 15; break;
    }
    
    // 해당 제품의 전체 정보를 찾아서 함께 전송
    const product = products.find(p => p.id === id);
    if (product) {
      await handleUpdateProduct(id, { 
        lineup: product.lineup,
        productCode: product.productCode,
        color: product.color,
        image: product.image,
        stock: stockValue,
        restockMessage: product.restockMessage || '',
        remarks: product.remarks || '',
        glbFile: product.glbFile || ''
      });
    }
  };

  // 재고 값을 상태 문자열로 변환
  const getStockStatus = (stock: number): string => {
    if (stock === 0) return '일시품절';
    if (stock <= 5) return '소량';
    if (stock <= 10) return '재고많음';
    return '영구품절';
  };

  // 필터링 및 검색된 제품 목록
  const filteredProducts = products.filter(product => {
    const matchesLineup = selectedLineup === '전체' || product.lineup === selectedLineup;
    const matchesSearch = searchTerm === '' || 
      product.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.lineup.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLineup && matchesSearch;
  });

  // 라인업 목록 추출
  const lineups = ['전체', ...Array.from(new Set(products.map(p => p.lineup)))];


  // 기존 제품 이미지 수정
  const handleProductImageUpdate = async (productId: string, file: File) => {
    if (file && file.type.startsWith('image/')) {
      try {
        setImageUploading(productId);
        
        // 파일 크기 체크 (5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('파일 크기는 5MB 이하여야 합니다.');
          return;
        }
        
        // 서버에 업로드
        const imageUrl = await uploadImage(file);
        
        // 제품 정보 업데이트
        const product = products.find(p => p.id === productId);
        if (product) {
          await handleUpdateProduct(productId, { 
            lineup: product.lineup,
            productCode: product.productCode,
            color: product.color,
            image: imageUrl,
            stock: product.stock,
            restockMessage: product.restockMessage || '',
            remarks: product.remarks || '',
            glbFile: product.glbFile || ''
          });
        }
        
        setEditingImage(null);
        alert('이미지가 업데이트되었습니다.');
      } catch (error) {
        console.error('Image update failed:', error);
        alert('이미지 업데이트에 실패했습니다.');
      } finally {
        setImageUploading(null);
      }
    } else {
      alert('이미지 파일만 업로드 가능합니다.');
    }
  };

  // 새 제품용 이미지 파일 업로드 처리
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

  // 새 제품용 GLB 파일 업로드 처리
  const handleGlbUpload = async (file: File) => {
    const ext = file.name.toLowerCase().split('.').pop();
    if (ext === 'glb' || ext === 'gltf') {
      try {
        // 파일 크기 체크 (50MB)
        if (file.size > 50 * 1024 * 1024) {
          alert('GLB 파일 크기는 50MB 이하여야 합니다.');
          return;
        }
        
        // 서버에 업로드
        const glbUrl = await uploadGlb(file);
        setNewProduct({...newProduct, glbFile: glbUrl});
      } catch (error) {
        console.error('GLB upload failed:', error);
        alert('GLB 업로드에 실패했습니다.');
      }
    } else {
      alert('GLB/GLTF 파일만 업로드 가능합니다.');
    }
  };

  // 기존 제품 GLB 업데이트
  const handleProductGlbUpdate = async (productId: string, file: File) => {
    const ext = file.name.toLowerCase().split('.').pop();
    if (ext === 'glb' || ext === 'gltf') {
      try {
        // 파일 크기 체크 (50MB)
        if (file.size > 50 * 1024 * 1024) {
          alert('GLB 파일 크기는 50MB 이하여야 합니다.');
          return;
        }
        
        // 서버에 업로드
        const glbUrl = await uploadGlb(file);
        
        // 제품 정보 업데이트
        const product = products.find(p => p.id === productId);
        if (product) {
          await handleUpdateProduct(productId, { 
            lineup: product.lineup,
            productCode: product.productCode,
            color: product.color,
            image: product.image,
            stock: product.stock,
            restockMessage: product.restockMessage || '',
            remarks: product.remarks || '',
            glbFile: glbUrl
          });
        }
        
        alert('GLB 파일이 업데이트되었습니다.');
      } catch (error) {
        console.error('GLB update failed:', error);
        alert('GLB 업데이트에 실패했습니다.');
      }
    } else {
      alert('GLB/GLTF 파일만 업로드 가능합니다.');
    }
  };

  // 이미지 삭제
  const handleDeleteImage = async (productId: string) => {
    if (!window.confirm('이미지를 삭제하시겠습니까?')) {
      return;
    }

    try {
      const product = products.find(p => p.id === productId);
      if (!product || !product.image) {
        alert('삭제할 이미지가 없습니다.');
        return;
      }

      // 이미지 URL에서 파일명 추출
      let filename = '';
      if (product.image.startsWith('/uploads/')) {
        filename = product.image.replace('/uploads/', '');
      } else if (product.image.includes('/uploads/')) {
        filename = product.image.split('/uploads/')[1];
      } else {
        alert('업로드된 이미지만 삭제할 수 있습니다.');
        return;
      }

      // 서버에서 파일 삭제
      await deleteImage(filename);

      // 제품 정보에서 이미지 필드 제거
      await handleUpdateProduct(productId, {
        lineup: product.lineup,
        productCode: product.productCode,
        color: product.color,
        image: '',
        stock: product.stock,
        restockMessage: product.restockMessage || '',
        remarks: product.remarks || '',
        glbFile: product.glbFile || ''
      });

      alert('이미지가 삭제되었습니다.');
    } catch (error) {
      console.error('Image delete failed:', error);
      alert('이미지 삭제에 실패했습니다.');
    }
  };

  // GLB 파일 삭제
  const handleDeleteGlb = async (productId: string) => {
    if (!window.confirm('GLB 파일을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const product = products.find(p => p.id === productId);
      if (!product || !product.glbFile) {
        alert('삭제할 GLB 파일이 없습니다.');
        return;
      }

      // GLB URL에서 파일명 추출
      let filename = '';
      if (product.glbFile.startsWith('/uploads/')) {
        filename = product.glbFile.replace('/uploads/', '');
      } else if (product.glbFile.includes('/uploads/')) {
        filename = product.glbFile.split('/uploads/')[1];
      } else {
        alert('업로드된 GLB 파일만 삭제할 수 있습니다.');
        return;
      }

      // 서버에서 파일 삭제
      await deleteGlb(filename);

      // 제품 정보에서 GLB 필드 제거
      await handleUpdateProduct(productId, {
        lineup: product.lineup,
        productCode: product.productCode,
        color: product.color,
        image: product.image,
        stock: product.stock,
        restockMessage: product.restockMessage || '',
        remarks: product.remarks || '',
        glbFile: ''
      });

      alert('GLB 파일이 삭제되었습니다.');
    } catch (error) {
      console.error('GLB delete failed:', error);
      alert('GLB 파일 삭제에 실패했습니다.');
    }
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
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

  return (
    <div className="admin-page">
      <div className="admin-content-wrapper">
        <header className="admin-header">
        <h1>재고 관리 시스템</h1>
        <div className="admin-actions">
          <button className="btn-add" onClick={() => setShowAddForm(true)}>
            + 제품 추가
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
              <label>3D 모델 (GLB)</label>
              <div 
                className={`glb-upload-area ${newProduct.glbFile ? 'has-file' : ''}`}
                onClick={() => glbInputRef.current?.click()}
              >
                {newProduct.glbFile ? (
                  <div className="glb-file-info">
                    <div className="glb-icon">📦</div>
                    <p>GLB 파일 업로드됨</p>
                    <button 
                      className="btn-remove-glb"
                      onClick={(e) => {
                        e.stopPropagation();
                        setNewProduct({...newProduct, glbFile: ''});
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <div className="upload-icon">📦</div>
                    <p>클릭하여 GLB 파일 업로드</p>
                    <span>GLB, GLTF 지원 (최대 50MB)</span>
                  </div>
                )}
              </div>
              <input
                ref={glbInputRef}
                type="file"
                accept=".glb,.gltf"
                style={{ display: 'none' }}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) await handleGlbUpload(file);
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
                    case '일시품절': stockValue = 0; break;
                    case '소량': stockValue = 3; break;
                    case '재고많음': stockValue = 8; break;
                    case '영구품절': stockValue = 15; break;
                  }
                  setNewProduct({...newProduct, stock: stockValue});
                }}
                className="stock-status-select"
              >
                <option value="재고많음">🟢 재고많음</option>
                <option value="소량">🟡 소량</option>
                <option value="일시품절">🔴 일시품절</option>
                <option value="영구품절">⚫ 영구품절</option>
              </select>
            </div>
            <div className="form-group">
              <label>재입고 메시지</label>
              <textarea
                value={newProduct.restockMessage}
                onChange={(e) => setNewProduct({...newProduct, restockMessage: e.target.value})}
                placeholder="예: 9/17일 재입고 예정"
                rows={2}
                style={{ resize: 'vertical', minHeight: '60px' }}
              />
            </div>
            <div className="form-group">
              <label>비고</label>
              <textarea
                value={newProduct.remarks}
                onChange={(e) => setNewProduct({...newProduct, remarks: e.target.value})}
                placeholder="비고 메시지 입력"
                rows={2}
                style={{ resize: 'vertical', minHeight: '60px' }}
              />
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
                  restockMessage: '',
                  remarks: '',
                  glbFile: '',
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
        <>
        {/* 검색 및 필터 */}
        <div className="admin-filter-section">
          <div className="filter-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="제품코드, 컬러, 라인업 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button 
                  className="clear-search"
                  onClick={() => setSearchTerm('')}
                >
                  ✕
                </button>
              )}
            </div>
            <div className="lineup-filter">
              <select 
                value={selectedLineup}
                onChange={(e) => setSelectedLineup(e.target.value)}
                className="lineup-select"
              >
                {lineups.map(lineup => (
                  <option key={lineup} value={lineup}>{lineup}</option>
                ))}
              </select>
            </div>
            <div className="filter-info">
              총 {filteredProducts.length}개 제품
            </div>
          </div>
        </div>

        <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>이미지</th>
              <th>3D 모델</th>
              <th>라인업</th>
              <th>제품코드</th>
              <th>컬러</th>
              <th>재고</th>
              <th>재입고 메시지</th>
              <th>비고</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td>
                  <div className="table-image-cell">
                    {editingImage === product.id ? (
                      <div className="image-edit-area">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) await handleProductImageUpdate(product.id, file);
                          }}
                          style={{ marginBottom: '8px' }}
                        />
                        <div className="image-edit-actions">
                          <button 
                            className="btn-cancel"
                            onClick={() => setEditingImage(null)}
                            style={{ fontSize: '12px', padding: '4px 8px' }}
                          >
                            취소
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="image-display-area">
                        {product.image ? (
                          <img src={getImageUrl(product.image)} alt={product.productCode} className="table-image" />
                        ) : (
                          <div className="table-no-image">No Image</div>
                        )}
                        <div style={{ display: 'flex', gap: '4px', marginTop: '4px', flexWrap: 'wrap' }}>
                          <button 
                            className="btn-edit-image"
                            onClick={() => setEditingImage(product.id)}
                            style={{ 
                              fontSize: '10px', 
                              padding: '2px 6px', 
                              backgroundColor: '#007bff',
                              color: 'white',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: 'pointer'
                            }}
                          >
                            수정
                          </button>
                          {product.image && (
                            <button 
                              className="btn-delete-image"
                              onClick={() => handleDeleteImage(product.id)}
                              style={{ 
                                fontSize: '10px', 
                                padding: '2px 6px', 
                                backgroundColor: '#dc3545',
                                color: 'white',
                                border: 'none',
                                borderRadius: '3px',
                                cursor: 'pointer'
                              }}
                            >
                              삭제
                            </button>
                          )}
                        </div>
                        {imageUploading === product.id && (
                          <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                            업로드 중...
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="table-glb-cell">
                    {product.glbFile ? (
                      <div className="glb-status has-glb">
                        <span className="glb-badge">📦 GLB</span>
                        <input
                          type="file"
                          accept=".glb,.gltf"
                          style={{ display: 'none' }}
                          id={`glb-input-${product.id}`}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) await handleProductGlbUpdate(product.id, file);
                          }}
                        />
                        <div style={{ display: 'flex', gap: '4px', marginTop: '4px', flexWrap: 'wrap', justifyContent: 'center' }}>
                          <button 
                            className="btn-edit-glb"
                            onClick={() => document.getElementById(`glb-input-${product.id}`)?.click()}
                          >
                            변경
                          </button>
                          <button 
                            className="btn-delete-glb"
                            onClick={() => handleDeleteGlb(product.id)}
                            style={{ 
                              fontSize: '10px', 
                              padding: '2px 6px', 
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: 'pointer'
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="glb-status no-glb">
                        <input
                          type="file"
                          accept=".glb,.gltf"
                          style={{ display: 'none' }}
                          id={`glb-input-${product.id}`}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) await handleProductGlbUpdate(product.id, file);
                          }}
                        />
                        <button 
                          className="btn-add-glb"
                          onClick={() => document.getElementById(`glb-input-${product.id}`)?.click()}
                        >
                          + GLB
                        </button>
                      </div>
                    )}
                  </div>
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
                    <option value="재고많음">🟢 재고많음</option>
                    <option value="소량">🟡 소량</option>
                    <option value="일시품절">🔴 일시품절</option>
                    <option value="영구품절">⚫ 영구품절</option>
                  </select>
                </td>
                <td>
                  {editingProduct?.id === product.id ? (
                    <textarea
                      value={editingProduct.restockMessage || ''}
                      onChange={(e) => setEditingProduct({...editingProduct, restockMessage: e.target.value})}
                      placeholder="재입고 메시지 입력"
                      rows={2}
                      style={{ width: '100%', minHeight: '40px', resize: 'vertical' }}
                    />
                  ) : (
                    <div style={{ 
                      fontSize: '12px', 
                      color: product.restockMessage ? '#ff4444' : '#999',
                      wordWrap: 'break-word',
                      maxWidth: '150px'
                    }}>
                      {product.restockMessage || '-'}
                    </div>
                  )}
                </td>
                <td>
                  {editingProduct?.id === product.id ? (
                    <textarea
                      value={editingProduct.remarks || ''}
                      onChange={(e) => setEditingProduct({...editingProduct, remarks: e.target.value})}
                      placeholder="비고 입력"
                      rows={2}
                      style={{ width: '100%', minHeight: '40px', resize: 'vertical' }}
                    />
                  ) : (
                    <div style={{ 
                      fontSize: '12px', 
                      color: product.remarks ? '#666' : '#999',
                      wordWrap: 'break-word',
                      maxWidth: '150px'
                    }}>
                      {product.remarks || '-'}
                    </div>
                  )}
                </td>
                <td>
                  <div className="table-actions">
                    {editingProduct?.id === product.id ? (
                      <>
                        <button 
                          className="btn-save"
                          onClick={() => {
                            const { id, ...updateData } = editingProduct;
                            
                            // 필수 필드 검증
                            if (!updateData.lineup || !updateData.productCode || !updateData.color) {
                              alert('라인업, 제품코드, 컬러는 필수 입력 항목입니다.');
                              return;
                            }
                            
                            // 빈 문자열 검증
                            if (updateData.lineup.trim() === '' || updateData.productCode.trim() === '' || updateData.color.trim() === '') {
                              alert('라인업, 제품코드, 컬러는 빈 값으로 저장할 수 없습니다.');
                              return;
                            }
                            
                            // 강제로 기본값 설정 (디버깅용)
                            const safeUpdateData = {
                              ...updateData,
                              lineup: updateData.lineup || 'UNKNOWN',
                              productCode: updateData.productCode || 'UNKNOWN',
                              color: updateData.color || 'UNKNOWN'
                            };
                            
                            console.log('Sending update data:', safeUpdateData);
                            
                            handleUpdateProduct(editingProduct.id, safeUpdateData);
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
        </>
      )}
      </div>
    </div>
  );
};

export default StockAdmin;
