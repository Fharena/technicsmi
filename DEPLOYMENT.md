# 배포 가이드

## AWS EC2에 프론트엔드 + 백엔드 + SQLite 배포

### 1. 서버 준비 (Ubuntu/Debian 기준)

```bash
# Node.js 설치 (v18 이상)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# PM2 설치 (프로세스 관리)
sudo npm install -g pm2

# build-essential 설치 (better-sqlite3 컴파일용)
sudo apt-get install -y build-essential python3
```

### 3. 프로젝트 업로드

```bash
# 서버에 코드 업로드 (git 사용 권장)
git clone <your-repo-url>
cd 테크닉스

# 또는 scp로 파일 전송
scp -r ./테크닉스 user@server:/home/user/
```

### 4. 환경 설정

```bash
# backend/.env 파일 생성
cd backend
nano .env
```

`.env` 파일 내용:

```
PORT=5000
DB_USER=technics_user
DB_HOST=localhost
DB_DATABASE=technics_stock
DB_PASSWORD=your_secure_password
DB_PORT=5432
ADMIN_PASSWORD=your_admin_password
NODE_ENV=production
```

### 5. 빌드 및 실행

```bash
# 루트 디렉토리에서
cd ~/테크닉스

# 모든 패키지 설치
npm run install-all

# 프론트엔드 빌드
cd frontend
npm run build

# 백엔드 실행 (PM2)
cd ../backend
pm2 start ecosystem.config.js --env production

# 부팅 시 자동 실행 설정
pm2 startup
pm2 save
```

### 6. Nginx 설정 (선택사항)

Nginx를 리버스 프록시로 사용하면 더 안정적입니다.

```bash
sudo apt-get install nginx

# Nginx 설정 파일 생성
sudo nano /etc/nginx/sites-available/technics
```

설정 내용:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# 설정 활성화
sudo ln -s /etc/nginx/sites-available/technics /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 7. 방화벽 설정

```bash
# 포트 열기
sudo ufw allow 80
sudo ufw allow 443
sudo ufw allow 5000  # Nginx 없이 직접 접근시
sudo ufw enable
```

### 8. SSL 인증서 (Let's Encrypt)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## PM2 주요 명령어

```bash
# 상태 확인
pm2 status

# 로그 확인
pm2 logs technics-backend

# 재시작
pm2 restart technics-backend

# 중지
pm2 stop technics-backend

# 삭제
pm2 delete technics-backend

# 모니터링
pm2 monit
```

## 업데이트 방법

```bash
cd ~/테크닉스

# 코드 업데이트 (git)
git pull

# 프론트엔드 재빌드
cd frontend
npm install
npm run build

# 백엔드 재시작
cd ../backend
npm install
pm2 restart technics-backend
```

## 백업

```bash
# SQLite 백업 (파일 복사)
cp ~/테크닉스/backend/database.sqlite ~/backup/database-$(date +%Y%m%d).sqlite

# 복구
cp ~/backup/database-20240101.sqlite ~/테크닉스/backend/database.sqlite

# 자동 백업 (cron)
crontab -e
# 매일 새벽 3시 백업
0 3 * * * cp ~/테크닉스/backend/database.sqlite ~/backup/database-$(date +\%Y\%m\%d).sqlite
```

## 트러블슈팅

### 포트 이미 사용 중

```bash
# 프로세스 찾기
lsof -i :5000
# 또는
netstat -nlp | grep :5000

# 프로세스 종료
kill -9 <PID>
```

### PostgreSQL 연결 실패

```bash
# PostgreSQL 상태 확인
sudo systemctl status postgresql

# 재시작
sudo systemctl restart postgresql

# 로그 확인
sudo tail -f /var/log/postgresql/postgresql-*-main.log
```

### PM2 로그 확인

```bash
pm2 logs technics-backend --lines 100
```

## 성능 최적화

1. **Gzip 압축** (Nginx)
2. **정적 파일 캐싱**
3. **데이터베이스 인덱싱**
4. **PM2 클러스터 모드** (멀티코어 활용)

```bash
pm2 start ecosystem.config.js -i max
```
