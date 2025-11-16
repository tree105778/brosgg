# 반응형 디자인 적용 예시

## 주요 변경사항 Before & After

### 1. 홈 페이지 (index.tsx)

#### Before:
```jsx
<div className={styles.mainSection}>
  <Image width={100} height={100} src={subLogo} alt="GG" />
  <Input className="!text-2xl" />
</div>
```

#### After:
```jsx
<div className={styles.mainSection}>
  <Image 
    width={100} height={100} 
    src={subLogo} 
    alt="GG"
    className="md:w-[100px] md:h-[100px] sm:w-[80px] sm:h-[80px]"
  />
  <Input className="md:!text-2xl sm:!text-base" />
</div>
```

---

### 2. 프로필 페이지 그리드 (profile/[user].tsx)

#### Before (데스크톱만 고려):
```css
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-template-areas: 
  'ranked recent champion synergy'
  'doubleup tier tier tier'
  'turbo tier tier tier';
```

#### After (모든 화면 크기 대응):
```css
/* 데스크톱 */
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-template-areas: 
  'ranked recent champion synergy'
  'doubleup tier tier tier'
  'turbo tier tier tier';

/* 태블릿 (max-width: 1024px) */
@media (max-width: 1024px) {
  grid-template-areas:
    'ranked recent'
    'champion synergy'
    'tier tier'
    'doubleup turbo';
  grid-template-columns: repeat(2, 1fr);
}

/* 모바일 (max-width: 640px) */
@media (max-width: 640px) {
  grid-template-areas:
    'ranked'
    'recent'
    'champion'
    'synergy'
    'tier'
    'doubleup'
    'turbo';
  grid-template-columns: 1fr;
}
```

---

### 3. TFT 메타 패널 (TFTMetaPanel.tsx)

#### Before:
```jsx
<div css={css`
  width: 110%;
  display: flex;
  gap: 1rem;
`}>
  <div css={css`
    width: 4rem;
    height: 145px;
    font-size: 1.5rem;
  `}>{tier}</div>
  <p className="!text-2xl">{name}</p>
</div>
```

#### After:
```jsx
<div css={css`
  width: 110%;
  display: flex;
  gap: 1rem;
  
  @media (max-width: 1024px) {
    width: 100%;
    flex-wrap: wrap;
    padding: 0.75rem;
  }
`}>
  <div css={css`
    width: 4rem;
    height: 145px;
    font-size: 1.5rem;
    
    @media (max-width: 1024px) {
      width: 3rem;
      height: 100px;
      font-size: 1.25rem;
    }
    
    @media (max-width: 640px) {
      width: 2.5rem;
      height: 60px;
      font-size: 1rem;
    }
  `}>{tier}</div>
  <p className="md:!text-2xl sm:!text-lg">{name}</p>
</div>
```

---

### 4. 배치툴 증강 그리드 (builder.module.css)

#### Before:
```css
.argumentInputWrapper {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 10px;
}
```

#### After:
```css
.argumentInputWrapper {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 10px;
}

@media (max-width: 1024px) {
  .argumentInputWrapper {
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 8px;
  }
}

@media (max-width: 640px) {
  .argumentInputWrapper {
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 6px;
  }
}
```

---

### 5. 공통 스타일 (style.common.ts)

#### Before:
```typescript
export const MainSection = styled.div`
  width: 75%;
  margin: 5rem auto;
`;

export const FirstInfoSection = styled.div`
  display: flex;
  gap: 0.5rem;
`;
```

#### After:
```typescript
export const MainSection = styled.div`
  width: 75%;
  margin: 5rem auto;
  
  @media (max-width: 1024px) {
    width: 90%;
    margin: 3rem auto;
  }
  
  @media (max-width: 640px) {
    width: 95%;
    margin: 2rem auto;
  }
`;

export const FirstInfoSection = styled.div`
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 1rem;
  }
`;
```

---

### 6. 랭킹 Top 3 레이아웃 (rank.module.css)

#### Before:
```css
.top3UserLeaderBoard {
  display: flex;
  gap: 2rem;
}

.top3UserEachContainer {
  width: 33%;
  height: 230px;
}
```

#### After:
```css
.top3UserLeaderBoard {
  display: flex;
  gap: 2rem;
}

.top3UserEachContainer {
  width: 33%;
  height: 230px;
}

@media (max-width: 1024px) {
  .top3UserLeaderBoard {
    gap: 1rem;
  }
  
  .top3UserEachContainer {
    height: 200px;
  }
}

@media (max-width: 640px) {
  .top3UserLeaderBoard {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .top3UserEachContainer {
    width: 100%;
    height: 150px;
  }
}
```

---

## 주요 반응형 패턴

### 패턴 1: Width 축소
```
데스크톱: 60-75% → 태블릿: 80-90% → 모바일: 95%+
```

### 패턴 2: 폰트 크기 조정
```
데스크톱: 2xl (1.5rem) → 태블릿: xl (1.25rem) → 모바일: lg (1.125rem)
```

### 패턴 3: 레이아웃 전환
```
데스크톱: row/grid → 태블릿: 2열 grid → 모바일: column/1열
```

### 패턴 4: 간격 축소
```
데스크톱: 2rem → 태블릿: 1.5rem → 모바일: 1rem
```

### 패턴 5: 요소 크기 축소
```
데스크톱: 100% → 태블릿: 80% → 모바일: 60-70%
```

---

## 사용된 Tailwind 반응형 클래스

### 자주 사용된 클래스:
- `md:!text-2xl` - 중간 화면 이상에서 2xl 텍스트
- `sm:!text-base` - 작은 화면에서 base 텍스트
- `md:w-[100px]` - 중간 화면 이상에서 100px 너비
- `sm:gap-2` - 작은 화면에서 gap 2
- `lg:w-[110%]` - 큰 화면에서 110% 너비
- `md:flex-row` - 중간 화면 이상에서 row 방향
- `sm:flex-col` - 작은 화면에서 column 방향

---

## 결과

모든 페이지와 컴포넌트가 다음 화면 크기에서 최적화되었습니다:

✅ **모바일** (< 640px): 1열 레이아웃, 터치 친화적 크기
✅ **태블릿** (640-1024px): 2열 레이아웃, 균형잡힌 크기
✅ **데스크톱** (>= 1024px): 원본 디자인 유지, 최대 가독성

기존 기능과 디자인을 해치지 않으면서도 모든 디바이스에서 
우수한 사용자 경험을 제공할 수 있게 되었습니다.
