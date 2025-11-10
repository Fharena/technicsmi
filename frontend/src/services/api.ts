// API 서비스 파일
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const SERVER_BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

// 이미지 URL을 완전한 URL로 변환
export const getImageUrl = (imagePath: string): string => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http')) return imagePath;
  if (imagePath.startsWith('/uploads/')) {
    return `${SERVER_BASE_URL}${imagePath}`;
  }
  return imagePath;
};

export interface Product {
  id: string;
  lineup: string;
  productCode: string;
  color: string;
  image: string;
  stock: number;
  restockMessage?: string;
  remarks?: string;
}

// 모든 제품 조회 (라인업 필터링 지원)
export const fetchProducts = async (lineup?: string): Promise<Product[]> => {
  const url = lineup && lineup !== '전체' 
    ? `${API_BASE_URL}/products?lineup=${encodeURIComponent(lineup)}`
    : `${API_BASE_URL}/products`;
    
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

// 제품 추가
export const createProduct = async (product: Omit<Product, 'id'>): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error('Failed to create product');
  }
  return response.json();
};

// 제품 수정
export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
  console.log('API updateProduct called with:', { id, product });
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });
  console.log('API response status:', response.status);
  if (!response.ok) {
    const errorText = await response.text();
    console.error('API error response:', errorText);
    throw new Error(`Failed to update product: ${response.status} ${errorText}`);
  }
  return response.json();
};

// 제품 삭제
export const deleteProduct = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
};

// 관리자 인증
export const adminLogin = async (password: string): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}/auth/admin-login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  });
  const data = await response.json();
  return data.success;
};

// 이미지 업로드
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch(`${API_BASE_URL}/upload/image`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to upload image');
  }
  
  const data = await response.json();
  return data.imageUrl;
};

// 이미지 삭제
export const deleteImage = async (filename: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/upload/image/${filename}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete image');
  }
};

