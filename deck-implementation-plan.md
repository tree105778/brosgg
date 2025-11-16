# 덱 상세 페이지 구현 계획 (v2.0 - 수정판)

## 📋 개요

**목표**: https://brosgses.my.canva.site/brosgghome/#덱-상세-정보 페이지를 Next.js로 완전히 구현

**API 기반**: `deck-api-docs.md`의 `GET /api/decks/{deckId}` 엔드포인트 사용

**페이지 라우트**: `/deck/[id]` (동적 라우트)

---

## 🔍 코드베이스 분석 결과

### ✅ 재사용 가능한 컴포넌트

1. **ChampionHexagonContainer** (`src/components/common/ChampionHexagonContainer.tsx`)
   - Props: `{ champion: ChampionHexagonContainerProp }`
   - 타입: `{ cost, name, image, items: { itemName, itemImgSrc }[], tier? }`
   - 별 레벨(tier) 표시 지원

2. **ChampionBoardGrid** (`src/components/builder/ChampionBoardGrid.tsx`)
   - 4행 × 7열 육각형 그리드
   - render prop 패턴: `children: (X, Y) => ReactNode`
   - 홀수 행 자동 오프셋 적용

3. **SynergyInfo** (`src/components/builder/SynergyInfo.tsx`)
   - Props: `{ trait: Traits }`
   - 타입: `{ trait: string, count: number }`
   - synergy.json 기반 색상 자동 적용

### ⚠️ 필요한 타입 변환

**API Response → Component Props 변환 필요**:

```typescript
// API: DeckUnit
{
  unitId: number;
  championId: string;        // "Jinx"
  starLevel: number;         // 1-3
  items: string[];           // ["InfinityEdge"]
  itemDetails: DeckItemDetail[];
  imageUrl: string;
  position: { row, col };
}

// Component: ChampionHexagonContainerProp
{
  cost: number;              // Champion 데이터에서 가져옴
  name: string;              // Champion 데이터에서 가져옴
  image: string;             // unit.imageUrl
  items: {
    itemName: string;        // item.name
    itemImgSrc: string;      // item.iconUrl
  }[];
  tier?: number;             // unit.starLevel
}
```

### 📝 MSW Mock 데이터 보완 필요

현재 레벨 8만 데이터 있음 → **모든 레벨 (5-10) 데이터 추가 필요**

---

## 🏗️ 구현 단계

## 0단계: 유틸리티 함수 추가

**파일**: `src/lib/deckUtils.ts` (신규 생성)

```typescript
import type { DeckUnit } from '@/types/api';
import type { ChampionHexagonContainerProp } from '@/types/prop';
import type { Database } from '@/types/database.types';

type Champion = Database['public']['Tables']['champions_s14']['Row'];

/**
 * DeckUnit을 ChampionHexagonContainerProp으로 변환
 */
export function convertUnitToChampionProp(
  unit: DeckUnit,
  championData: Champion,
): ChampionHexagonContainerProp {
  return {
    cost: championData.cost,
    name: championData.name,
    image: unit.imageUrl,
    items: unit.itemDetails.map((item) => ({
      itemName: item.name,
      itemImgSrc: item.iconUrl,
    })),
    tier: unit.starLevel,
  };
}

/**
 * Synergies JSON 문자열을 Traits 배열로 변환
 */
export function parseSynergies(synergiesJson: string | null): { trait: string; count: number }[] {
  if (!synergiesJson) return [];

  try {
    const parsed = JSON.parse(synergiesJson) as Record<string, number>;
    return Object.entries(parsed)
      .map(([trait, count]) => ({ trait, count }))
      .sort((a, b) => b.count - a.count);
  } catch {
    return [];
  }
}

/**
 * 챔피언 ID로 챔피언 맵 생성
 */
export function createChampionMap(champions: Champion[]): Record<string, Champion> {
  return champions.reduce((acc, champ) => {
    acc[champ.character_id] = champ;
    return acc;
  }, {} as Record<string, Champion>);
}
```

---

## 1단계: API 클라이언트 함수 추가

**파일**: `src/lib/api.ts`

**추가할 함수**:

```typescript
export async function fetchDeckDetail(
  deckId: string,
): Promise<DeckDetailResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/api/decks/${deckId}`,
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch deck detail: ${res.status}`);
  }

  return res.json();
}
```

**참고**:
- `DeckDetailResponse` 타입은 이미 `src/types/api.ts`에 정의되어 있음
- MSW 핸들러는 `src/mocks/handlers/deckHandler.ts`에 구현되어 있음 (보완 필요)

---

## 2단계: MSW Mock 데이터 보강

**파일**: `src/mocks/handlers/deckHandler.ts`

현재 레벨 8만 데이터가 있으므로 **레벨 5, 6, 7, 9, 10 데이터 추가**:

```typescript
// GET /api/decks/:id 핸들러 내부 수정
boards: [
  {
    boardId: null,
    level: 5,
    synergies: '{"미포":2,"테크":2}',
    units: [
      {
        unitId: 1003,
        championId: 'Powder',
        starLevel: 1,
        items: [],
        itemDetails: [],
        imageUrl: 'https://cdn.lolchess.gg/.../Powder.jpg',
        position: { row: 1, col: 3 },
      },
      {
        unitId: 1004,
        championId: 'Ziggs',
        starLevel: 1,
        items: [],
        itemDetails: [],
        imageUrl: 'https://cdn.lolchess.gg/.../Ziggs.jpg',
        position: { row: 2, col: 2 },
      },
      // ... 5개 유닛
    ],
  },
  {
    boardId: null,
    level: 6,
    synergies: '{"미포":3,"테크":2}',
    units: [
      // ... 6개 유닛
    ],
  },
  {
    boardId: null,
    level: 7,
    synergies: '{"미포":3,"테크":3,"브루저":2}',
    units: [
      // ... 7개 유닛
    ],
  },
  {
    boardId: 777,
    level: 8,
    synergies: '{"미포":4,"테크":3,"브루저":2}',
    units: [
      // ... 기존 데이터
    ],
  },
  {
    boardId: null,
    level: 9,
    synergies: '{"미포":5,"테크":4,"브루저":2}',
    units: [
      // ... 9개 유닛 (Ekko 2성으로 업그레이드 등)
    ],
  },
  {
    boardId: null,
    level: 10,
    synergies: '{"미포":6,"테크":4,"브루저":3}',
    units: [
      // ... 10개 유닛
    ],
  },
]
```

---

## 3단계: 페이지 파일 생성

**파일**: `src/pages/deck/[id].tsx`

### 3-1. getStaticPaths 구현

```typescript
import { GetStaticPaths, GetStaticProps } from 'next';
import { fetchMetaDecks, fetchDeckDetail } from '@/lib/api';
import { fetchChampionsS14Data } from '@/lib/supabase';
import { DeckDetail } from '@/types/api';
import type { Database } from '@/types/database.types';

type Champion = Database['public']['Tables']['champions_s14']['Row'];

export const getStaticPaths: GetStaticPaths = async () => {
  const decks = await fetchMetaDecks({ activate: true });

  const paths = decks.data.map((deck) => ({
    params: { id: deck.deckId.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};
```

### 3-2. getStaticProps 구현

```typescript
interface DeckDetailPageProps {
  deckDetail: DeckDetail;
  champions: Champion[];
}

export const getStaticProps: GetStaticProps<DeckDetailPageProps> = async ({ params }) => {
  const deckId = params?.id as string;

  try {
    // 1. 덱 상세 정보 가져오기
    const deckDetailResponse = await fetchDeckDetail(deckId);

    if (!deckDetailResponse.success || !deckDetailResponse.data) {
      return { notFound: true };
    }

    // 2. 모든 챔피언 데이터 가져오기 (코스트, 이름 정보 필요)
    const allChampions = await fetchChampionsS14Data();

    // 3. 덱에 사용된 챔피언 ID 추출
    const championIds = new Set<string>();
    deckDetailResponse.data.boards.forEach((board) => {
      board.units.forEach((unit) => {
        championIds.add(unit.championId);
      });
    });

    // 4. 필요한 챔피언만 필터링
    const deckChampions = allChampions.filter((champ) =>
      championIds.has(champ.character_id),
    );

    return {
      props: {
        deckDetail: deckDetailResponse.data,
        champions: deckChampions,
      },
      revalidate: 3600, // 1시간마다 재생성
    };
  } catch (error) {
    console.error('Failed to fetch deck detail:', error);
    return { notFound: true };
  }
};
```

### 3-3. 페이지 컴포넌트 구조

```typescript
import { useState } from 'react';
import { DeckSynergySection } from '@/components/deck/DeckSynergySection';
import { LevelSelector } from '@/components/deck/LevelSelector';
import { DeckBoardSection } from '@/components/deck/DeckBoardSection';
import { DeckItemRecommendations } from '@/components/deck/DeckItemRecommendations';

export default function DeckDetailPage({ deckDetail, champions }: DeckDetailPageProps) {
  const [selectedLevel, setSelectedLevel] = useState(8); // 기본 레벨 8

  const currentBoard = deckDetail.boards.find(
    (board) => board.level === selectedLevel,
  );

  return (
    <div>
      {/* 헤더 */}
      <div className="bg-[#1a1a1a] py-8 px-4">
        <h1 className="text-3xl font-bold text-white">{deckDetail.title}</h1>
        <p className="text-gray-400 mt-2">{deckDetail.description}</p>
      </div>

      {/* 메인 섹션 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 시너지 섹션 */}
        <DeckSynergySection
          synergies={currentBoard?.synergies || null}
          deckId={deckDetail.deckId}
        />

        {/* 레벨 선택기 */}
        <LevelSelector
          selectedLevel={selectedLevel}
          onLevelChange={setSelectedLevel}
          availableLevels={deckDetail.boards.map(b => b.level)}
        />

        {/* 보드 섹션 */}
        <DeckBoardSection
          board={currentBoard}
          champions={champions}
          allBoards={deckDetail.boards}
        />

        {/* 아이템 추천 섹션 */}
        {currentBoard && currentBoard.units.length > 0 && (
          <DeckItemRecommendations
            units={currentBoard.units}
            champions={champions}
          />
        )}
      </div>
    </div>
  );
}
```

---

## 4단계: 시너지 섹션 컴포넌트

**파일**: `src/components/deck/DeckSynergySection.tsx` (신규 생성)

```typescript
import { useMemo } from 'react';
import SynergyInfo from '@/components/builder/SynergyInfo';
import { parseSynergies } from '@/lib/deckUtils';

interface DeckSynergySectionProps {
  synergies: string | null;
  deckId: number;
}

export function DeckSynergySection({ synergies, deckId }: DeckSynergySectionProps) {
  const parsedSynergies = useMemo(() => parseSynergies(synergies), [synergies]);

  const handleCopyTipCode = async () => {
    const tipCode = `https://brosgg.com/deck/${deckId}`;
    await navigator.clipboard.writeText(tipCode);
    alert('덱 링크가 복사되었습니다!');
  };

  if (parsedSynergies.length === 0) {
    return <div className="text-gray-400">시너지 정보가 없습니다.</div>;
  }

  const mainSynergies = parsedSynergies.slice(0, 5);

  return (
    <section className="bg-[#2a2a2a] rounded-lg p-6 mb-6">
      {/* 팁코드 복사 버튼 */}
      <button
        onClick={handleCopyTipCode}
        className="mb-4 px-4 py-2 bg-[#04f2d2] text-black rounded hover:bg-[#03d1b5] transition"
      >
        팁코드 복사
      </button>

      {/* 주요 시너지 (큰 표시) */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {mainSynergies.map(({ trait, count }) => (
          <div key={trait} className="flex flex-col items-center">
            <div className="text-2xl font-bold text-[#04f2d2]">{count}</div>
            <div className="text-white text-lg">{trait}</div>
          </div>
        ))}
      </div>

      {/* 전체 시너지 그리드 */}
      <div className="flex gap-2 flex-wrap">
        {parsedSynergies.map((synergy) => (
          <SynergyInfo key={synergy.trait} trait={synergy} />
        ))}
      </div>
    </section>
  );
}
```

---

## 5단계: 레벨 선택기 컴포넌트

**파일**: `src/components/deck/LevelSelector.tsx` (신규 생성)

```typescript
interface LevelSelectorProps {
  selectedLevel: number;
  onLevelChange: (level: number) => void;
  availableLevels: number[];
}

export function LevelSelector({
  selectedLevel,
  onLevelChange,
  availableLevels,
}: LevelSelectorProps) {
  const sortedLevels = [...availableLevels].sort((a, b) => a - b);

  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {sortedLevels.map((level) => (
        <button
          key={level}
          onClick={() => onLevelChange(level)}
          className={`
            px-4 py-2 rounded font-semibold transition
            ${
              selectedLevel === level
                ? 'bg-[#04f2d2] text-black'
                : 'bg-[#3a3a3a] text-gray-300 hover:bg-[#4a4a4a]'
            }
          `}
        >
          LV.{level}
        </button>
      ))}
    </div>
  );
}
```

---

## 6단계: 보드 섹션 컴포넌트

**파일**: `src/components/deck/DeckBoardSection.tsx` (신규 생성)

```typescript
import { useMemo } from 'react';
import type { DeckBoard } from '@/types/api';
import type { Database } from '@/types/database.types';
import ChampionBoardGrid from '@/components/builder/ChampionBoardGrid';
import ChampionHexagonContainer from '@/components/common/ChampionHexagonContainer';
import { convertUnitToChampionProp, createChampionMap } from '@/lib/deckUtils';

type Champion = Database['public']['Tables']['champions_s14']['Row'];

interface DeckBoardSectionProps {
  board: DeckBoard | undefined;
  champions: Champion[];
  allBoards: DeckBoard[];
}

export function DeckBoardSection({ board, champions }: DeckBoardSectionProps) {
  const championMap = useMemo(() => createChampionMap(champions), [champions]);

  // Position 기반 그리드 맵 생성 (X = row, Y = col)
  const positionMap = useMemo(() => {
    if (!board) return new Map();

    const map = new Map<string, ReturnType<typeof convertUnitToChampionProp>>();

    board.units.forEach((unit) => {
      const key = `${unit.position.row},${unit.position.col}`;
      const championData = championMap[unit.championId];
      if (championData) {
        map.set(key, convertUnitToChampionProp(unit, championData));
      }
    });

    return map;
  }, [board, championMap]);

  if (!board || board.units.length === 0) {
    return (
      <div className="bg-[#2a2a2a] rounded-lg p-6 mb-6 text-center text-gray-400">
        해당 레벨의 보드 정보가 없습니다.
      </div>
    );
  }

  return (
    <section className="bg-[#2a2a2a] rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-white mb-4">챔피언 배치</h2>

      <ChampionBoardGrid>
        {(X, Y) => {
          const key = `${X},${Y}`;
          const champion = positionMap.get(key);

          return champion ? (
            <ChampionHexagonContainer champion={champion} />
          ) : (
            <div className="w-[60px] h-[60px] opacity-20 bg-gray-700"
                 style={{
                   clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                 }}
            />
          );
        }}
      </ChampionBoardGrid>
    </section>
  );
}
```

---

## 7단계: 아이템 추천 섹션

**파일**: `src/components/deck/DeckItemRecommendations.tsx` (신규 생성)

```typescript
import Image from 'next/image';
import type { DeckUnit } from '@/types/api';
import type { Database } from '@/types/database.types';
import { useMemo } from 'react';
import { createChampionMap } from '@/lib/deckUtils';

type Champion = Database['public']['Tables']['champions_s14']['Row'];

interface DeckItemRecommendationsProps {
  units: DeckUnit[];
  champions: Champion[];
}

export function DeckItemRecommendations({ units, champions }: DeckItemRecommendationsProps) {
  const championMap = useMemo(() => createChampionMap(champions), [champions]);

  // 아이템이 있는 유닛만 필터링
  const unitsWithItems = units.filter(
    (unit) => unit.itemDetails && unit.itemDetails.length > 0,
  );

  if (unitsWithItems.length === 0) {
    return null;
  }

  return (
    <section className="bg-[#2a2a2a] rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-4">아이템 추천</h2>

      <div className="space-y-4">
        {unitsWithItems.map((unit) => {
          const championData = championMap[unit.championId];

          return (
            <div key={unit.unitId} className="flex items-center gap-4 bg-[#1a1a1a] rounded p-4">
              {/* 좌측: 챔피언 */}
              <div className="flex items-center gap-3 w-48">
                <div className="relative w-12 h-12">
                  <Image
                    src={unit.imageUrl}
                    alt={championData?.name || unit.championId}
                    width={48}
                    height={48}
                    className="rounded"
                  />
                </div>
                <span className="text-white font-semibold">
                  {championData?.name || unit.championId}
                </span>
              </div>

              {/* 우측: 아이템 목록 */}
              <div className="flex gap-2 flex-wrap">
                {unit.itemDetails.map((item, index) => (
                  <div key={`${item.apiName}-${index}`} className="relative group">
                    <Image
                      src={item.iconUrl}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded border-2 border-gray-600 hover:border-[#04f2d2] transition"
                    />
                    <div className="absolute hidden group-hover:block bg-black text-white text-xs p-2 rounded -top-10 left-0 whitespace-nowrap z-10">
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

---

## 8단계: 빌드 및 검증

### 체크리스트:

- [ ] `npm run build` - 타입 체크 통과
- [ ] `npm run lint:fix` - 린트 오류 없음
- [ ] 모든 레벨(5-10) 전환 동작
- [ ] 시너지 정보 정확히 표시
- [ ] 챔피언 배치 정확함 (position 기반)
- [ ] 아이템 추천 표시 정확함
- [ ] 팁코드 복사 기능 동작
- [ ] MSW 모킹 환경에서 테스트

### 테스트 방법:

```bash
# MSW 활성화
NEXT_PUBLIC_API_MOCKING=true npm run dev

# 브라우저에서 접속
# http://localhost:3000/deck/1
```

---

## 📁 파일 생성/수정 목록

### 새로 생성할 파일:

```
src/
├── lib/
│   └── deckUtils.ts                 # 유틸리티 함수
├── pages/
│   └── deck/
│       └── [id].tsx                 # 메인 페이지
└── components/
    └── deck/
        ├── DeckSynergySection.tsx   # 시너지 섹션
        ├── LevelSelector.tsx        # 레벨 선택기
        ├── DeckBoardSection.tsx     # 보드 섹션
        └── DeckItemRecommendations.tsx # 아이템 추천
```

### 수정할 파일:

```
src/
├── lib/
│   └── api.ts                       # fetchDeckDetail 함수 추가
└── mocks/
    └── handlers/
        └── deckHandler.ts           # Mock 데이터 보강 (레벨 5-10)
```

---

## ⏱️ 예상 소요 시간

| 단계     | 작업                     | 예상 시간 |
| -------- | ------------------------ | --------- |
| 0        | 유틸리티 함수 작성       | 30분      |
| 1        | API 함수 추가            | 10분      |
| 2        | MSW Mock 데이터 보강     | 30분      |
| 3        | 페이지 스켈레톤 생성     | 30분      |
| 4        | 시너지 섹션 구현         | 40분      |
| 5        | 레벨 선택기 구현         | 20분      |
| 6        | 보드 섹션 구현           | 1.5시간   |
| 7        | 아이템 추천 구현         | 40분      |
| 8        | 테스트 및 검증           | 1시간     |
| **총계** |                          | **약 5.5시간** |

---

## 🎯 완료 기준

1. ✅ 시너지, 보드, 아이템 3개 섹션 모두 구현
2. ✅ 레벨 선택 시 보드 동적 변경
3. ✅ 시너지 정보 파싱 및 표시
4. ✅ ChampionBoardGrid 재사용
5. ✅ 타입 안전성 보장
6. ✅ MSW 환경에서 정상 동작
7. ✅ 빌드 및 린트 오류 없음

---

## 📝 핵심 개선 사항 (v1.0 대비)

### 1. 타입 변환 로직 명확화
- `convertUnitToChampionProp` 유틸리티 함수
- Champion 데이터와 DeckUnit 조인 로직

### 2. 컴포넌트 재사용 극대화
- `ChampionBoardGrid`: 그대로 재사용
- `SynergyInfo`: prop 타입 맞춰 사용
- `ChampionHexagonContainer`: 타입 변환 후 사용

### 3. MSW Mock 데이터 보강
- 모든 레벨 (5-10) 데이터 추가
- position 기반 배치 정보

### 4. 실제 구현 가능한 설계
- Supabase 함수 이름 수정 (`fetchChampionsS14Data`)
- 실제 타입 시스템 반영
- 에러 핸들링 추가

---

**작성일**: 2025-11-11
**작성자**: Claude Code
**버전**: 2.0 (검증 완료)
