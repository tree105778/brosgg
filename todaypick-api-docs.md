# Today Pick API 안내

## 개요
- 베이스 경로: `8080/api/decks`
- 역할: 오늘의 추천 덱(today pick) 지정 및 조회 기능을 제공합니다.
- `DeckSummaryResponse`, `DeckDetailResponse` 모든 응답에 `todayPick`(boolean) 필드가 추가되었습니다.
- 모든 응답은 `ApiResponse<T>` 포맷(`success`, `data`, `message`, `err`)을 따릅니다.

> **권한 정책**
> - PATCH 요청은 덱 소유자 또는 `ROLE_ADMIN` 만 수행할 수 있습니다.
> - GET 요청은 인증 없이 누구나 이용할 수 있습니다.

## 1. 오늘의 추천 상태 변경 (PATCH /api/decks/{deckId}/today-pick)
특정 덱을 오늘의 추천 목록에 추가하거나 제거합니다.

### 요청
| 항목 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `todayPick` | `boolean` | ✅ | `true` → 추천 등록, `false` → 추천 해제 |

```http
PATCH /api/decks/12345/today-pick
Authorization: Bearer <token>
Content-Type: application/json

{
  "todayPick": true
}
```

### 성공 응답
```json
{
  "success": true,
  "data": null,
  "message": "오늘의 추천 덱 상태가 변경되었습니다."
}
```

### 오류 케이스
- `401 UNAUTHORIZED` : 인증 정보가 없거나 만료됨
- `403 FORBIDDEN` : 덱 소유자가 아니며 관리자 권한도 없는 경우
- `404 NOT_FOUND` : 대상 덱이 존재하지 않음

## 2. 오늘의 추천 덱 목록 조회 (GET /api/decks/today-picks)
오늘의 추천으로 지정된 덱을 최신 업데이트 순으로 반환합니다.

```http
GET /api/decks/today-picks
```

### 성공 응답 예시
```json
{
  "success": true,
  "data": [
    {
      "deckId": 12345,
      "title": "메카-자르반 덱",
      "userId": 999,
      "setVersion": 15,
      "description": "초반 빌드업 후 자르반 중심",
      "totalUnits": 8,
      "maxLevel": 9,
      "createdAt": "2025-01-02T10:00:00",
      "updatedAt": "2025-01-05T21:30:00",
      "tier": "S",
      "activate": true,
      "todayPick": true
    }
  ],
  "message": "오늘의 추천 덱 목록 조회가 완료되었습니다."
}
```

> 목록 응답은 `DeckSummaryResponse` 배열이며, 다른 덱 조회 API와 동일한 구조를 공유합니다. `todayPick` 이 `true` 로 고정된 데이터만 반환됩니다.