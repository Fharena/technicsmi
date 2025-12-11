# Technics Backend API

Express + PostgreSQL 기반 재고 관리 시스템 백엔드

## 설치 방법

1. PostgreSQL 설치 및 실행
2. 데이터베이스 생성:

```bash
createdb technics_stock
```

3. 패키지 설치:

```bash
cd backend
npm install
```

4. 환경 변수 설정:
   `.env` 파일을 수정하여 PostgreSQL 연결 정보 입력

5. 서버 실행:

```bash
npm run dev  # 개발 모드 (nodemon)
npm start    # 프로덕션 모드
```

## API 엔드포인트

### Products

- `GET /api/products` - 모든 제품 조회
- `POST /api/products` - 제품 추가
- `PUT /api/products/:id` - 제품 수정
- `DELETE /api/products/:id` - 제품 삭제

### Auth

- `POST /api/auth/admin-login` - 관리자 인증

## 환경 변수

```
PORT=5000
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=technics_stock
DB_PASSWORD=your_password
DB_PORT=5432
ADMIN_PASSWORD=admin123
```
