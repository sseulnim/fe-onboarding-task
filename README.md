# FE-onboarding-task

## 📌 소개
Jest를 활용한 테스트와 Sentry를 통한 에러 모니터링 구현 과제

### 🛠️ 주요 구현 내용

- 프론트엔드 인증/인가 기능 구현
- Jest를 활용한 단위 테스트 구현
- Sentry를 통한 실시간 에러 모니터링 시스템 구축

상세한 구현 과정과 기술적 고찰은 링크에서 확인하실 수 있습니다:
[프론트엔드 개발 온보딩 과제](https://www.notion.so/React-154d2635765680e7b4ade9b8f3393f36?pvs=21)

## 🛠 기술 스택
React 18 | TypeScript | Vite | Zustand | TanStack Query | Jest | Sentry | Tailwind CSS | Vercel

## 📁 프로젝트 구조
```
src/
├── components/         # 재사용 가능한 컴포넌트
│   ├── auth/          # 인증 관련 컴포넌트
│   └── common/        # 공통 컴포넌트
├── hooks/             # 커스텀 훅
│   └── queries/       # API 관련 쿼리 훅
├── pages/             # 페이지 컴포넌트
├── services/          # API 서비스
├── store/            # Zustand 스토어
├── types/            # TypeScript 타입 정의
└── utils/            # 유틸리티 함수
```
## ✨ 구현 기능
### 1. Jest 테스트
- 환경 구축 및 설정
- 컴포넌트 테스트 구현 (LoginForm, TodoListPage, RegisterForm)
- API 모킹 및 비동기 테스트

### 2. 에러 모니터링
- Sentry 설정 및 초기화
- ErrorBoundary를 통한 에러 처리
- 실시간 에러 추적 구현

### 3. 기본 기능
- 회원가입/로그인
- Todo CRUD
- 프로필 관리

## 💻 실행 방법

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 테스트 실행
npm test

# 빌드
npm run build
```

## ⚙️ 환경 변수 설정
```
VITE_API_URL=https://moneyfulpublicpolicy.co.kr
VITE_SENTRY_DSN=[your-sentry-dsn]
```
## 🔧 트러블 슈팅
### 1. Jest 설정 문제

- TextEncoder/TextDecoder 정의
- ESM/CommonJS 모듈 호환성
- 테스트 환경에서 Path Alias 설정

### 2. 타입스크립트 설정

- Jest와 타입스크립트 통합
- 테스트 파일 타입 정의

### 3. 빌드 최적화

- 번들 크기 최적화
- 테스트 파일 제외 설정

## 🚀 프로젝트 배포

- Vercel을 활용한 CI/CD 파이프라인 구축 및 자동 배포 환경 설정
- 프로젝트 환경변수 설정 및 체계적인 관리 시스템 구현
- Sentry와 연동한 실시간 에러 모니터링 시스템 구축

배포된 프로젝트는 다음 링크에서 확인하실 수 있습니다:

[프론트엔드 온보딩 태스크 데모](https://fe-onboarding-task-1.vercel.app)
