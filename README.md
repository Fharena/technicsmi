# Technics Full Stack Application

React (Frontend) + Express + SQLite (Backend) 재고 관리 시스템

## 프로젝트 구조

```
테크닉스/
├── frontend/          # React 앱
├── backend/           # Express API 서버
└── package.json       # 루트 스크립트
```

## 설치 및 실행

### 1. 전체 패키지 설치

```bash
npm run install-all
```

### 2. 환경 변수 설정 (선택사항)

backend/.env 파일 생성:

```
PORT=5000
ADMIN_PASSWORD=admin123
```

### 3. 개발 모드 실행

```bash
npm run dev
```

- 백엔드: http://localhost:5000
- 프론트엔드: http://localhost:3000

## 프로덕션 배포

### 옵션 1: 같은 서버에 모두 배포

1. 프론트엔드 빌드:

```bash
cd frontend
npm run build
```

2. 백엔드 서버에서 빌드 파일 제공하도록 수정:

```javascript
// backend/server.js에 추가
const path = require("path");
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});
```

3. 백엔드만 실행:

```bash
cd backend
npm start
```

### 옵션 2: PM2로 프로세스 관리

```bash
npm install -g pm2

# 백엔드 실행
cd backend
pm2 start server.js --name technics-api

# 모니터링
pm2 monit
pm2 logs technics-api
```

## API 엔드포인트

- `GET /api/products` - 제품 목록
- `POST /api/products` - 제품 추가
- `PUT /api/products/:id` - 제품 수정
- `DELETE /api/products/:id` - 제품 삭제
- `POST /api/auth/admin-login` - 관리자 인증

## 기술 스택

### Frontend

- React 18
- TypeScript
- React Router
- CSS3

### Backend

- Node.js
- Express
- SQLite
- better-sqlite3

## 주요 기능

1. **재고 현황 페이지** - 제품 재고 시각화
2. **관리자 페이지** - CRUD 기능
3. **실시간 업데이트** - API 기반 데이터 동기화
4. **관리자 인증** - 비밀번호 기반 접근 제어

## 문제 해결

### 데이터베이스 파일 권한 오류

- backend 폴더에 쓰기 권한이 있는지 확인
- database.sqlite 파일이 있다면 읽기/쓰기 권한 확인

### CORS 오류

- backend/server.js에서 CORS 설정 확인
- 프론트엔드 .env.local의 API_URL 확인

### 데이터 백업

```bash
# 백업
cp backend/database.sqlite backend/database.backup.sqlite

# 복구
cp backend/database.backup.sqlite backend/database.sqlite
```

## 라이센스

ISC
