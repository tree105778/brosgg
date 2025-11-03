# BROS.GG

Teamfight Tactics (TFT) 전적 검색 및 메타 분석 웹 애플리케이션

## 시작하기

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/brosgg.git
cd brosgg
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Supabase 설정 (프로젝트 관리자로부터 제공받으세요)
SUPABASE_URL=
SUPABASE_ANON_KEY=

NEXT_PUBLIC_API_SERVER=https://api.bros.gg

# 개발 환경 설정
NEXT_PUBLIC_API_MOCKING=true  # MSW 모킹 활성화 (개발 시)
```

**⚠️ 중요**:

- `.env` 파일은 `.gitignore`에 포함되어 GitHub에 업로드되지 않습니다.
- Supabase 인증 정보는 프로젝트 관리자에게 요청하세요.
- 프로덕션 환경에서는 `NEXT_PUBLIC_API_MOCKING=false`로 설정하세요.

### 3. 의존성 설치

```bash
npm install
```

### 4. Supabase TypeScript 타입 생성

Supabase 데이터베이스 스키마에서 TypeScript 타입을 생성합니다:

```bash
npx supabase gen types typescript --project-id <project-id> > src/types/database.types.ts
```

````database
src/types/database.types.ts 파일 작성 (필요 시 관리자에게 문의)

**Project ID 확인 방법**:
1. Supabase Dashboard 접속
2. Settings → General → Reference ID 확인

**참고**:
- `database.types.ts` 파일은 `.gitignore`에 포함되어 있습니다.
- 각 개발자가 로컬에서 직접 생성해야 합니다.
- 데이터베이스 스키마 변경 시 재생성이 필요합니다.

### 5. 개발 서버 실행

```bash
npm run dev
````

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 6. 빌드 및 프로덕션 실행

```bash
npm run build
npm start
```

## 주요 기능

- **전적 검색**: 소환사 이름으로 전적 및 통계 조회
- **메타 덱**: 티어별 추천 팀 조합 확인
- **랭킹**: TFT 랭킹 리더보드
- **배치 툴**: 드래그 앤 드롭 기반 팀 조합 빌더
- **챔피언/아이템 정보**: 상세 정보 페이지

## 기술 스택

- **프레임워크**: Next.js 15 (Pages Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS 4 + Emotion
- **상태 관리**: Zustand + Immer
- **데이터 페칭**: TanStack Query (React Query)
- **데이터베이스**: Supabase (PostgreSQL)
- **UI 컴포넌트**: Radix UI
- **드래그 앤 드롭**: react-dnd
- **API 모킹**: MSW (Mock Service Worker)

## 프로젝트 구조

```
src/
├── components/     # React 컴포넌트
│   ├── builder/    # 팀 조합 빌더
│   ├── meta/       # 메타 덱 카드
│   ├── profile/    # 프로필 페이지 컴포넌트
│   ├── rank/       # 랭킹 컴포넌트
│   ├── common/     # 공통 컴포넌트
│   └── ui/         # 기본 UI 컴포넌트
├── pages/          # Next.js 페이지
├── lib/            # 유틸리티 및 API 클라이언트
├── mocks/          # MSW 핸들러
├── store.ts        # Zustand 스토어
└── types/          # TypeScript 타입 정의
```

## 개발 명령어

```bash
npm run dev          # 개발 서버 시작 (Turbopack)
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 시작
npm run lint         # ESLint 실행
npm run lint:fix     # ESLint 자동 수정
npm run format       # Prettier 포맷팅
```

## GitHub에 포함되지 않는 파일들

다음 파일들은 `.gitignore`에 포함되어 GitHub 저장소에 업로드되지 않습니다.
각 개발자가 로컬 환경에서 직접 생성해야 합니다:

### 필수 설정 파일

- **`.env`**: 환경 변수 파일

  - 프로젝트 관리자에게 Supabase 및 API 인증 정보 요청
  - 위 "2. 환경 변수 설정" 참조

- **`src/types/database.types.ts`**: Supabase TypeScript 타입 정의
  - Supabase CLI로 자동 생성
  - 위 "4. Supabase TypeScript 타입 생성" 참조

### 자동 생성 파일/폴더

- **`node_modules/`**: `npm install`로 자동 생성
- **`.next/`**: Next.js 빌드 출력 폴더
- **`*.tsbuildinfo`**: TypeScript 증분 빌드 정보

### 선택 사항

- **`supabase/`**: 로컬 Supabase 개발 환경 (일반적으로 불필요)

## 라이선스

이 프로젝트는 Riot Games와 관련이 없으며, Riot Games의 견해나 의견을 반영하지 않습니다.

© 2025 BROS.GG
