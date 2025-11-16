# Deck API 안내

## 개요
- 베이스 경로: `/api/decks`
- 역할: TFT 덱(Deck) 생성·조회·수정·삭제 및 목록 조회 기능을 제공합니다.
- 덱별 활성화 상태(`activate`)를 관리할 수 있으며 목록·상세 응답에서 확인 가능합니다.
- 모든 응답은 `ApiResponse<T>` 래퍼 형식을 따릅니다 (`success`, `data`, `message`, `err`).

## 1. 덱 생성 (POST /api/decks)
한 번의 요청으로 **덱 메타 정보**, **레벨별 보드 정보**, **보드에 배치된 유닛 정보**를 모두 전달합니다.

### 요청 스키마
```
{
  "meta": { ... },
  "boards": [ ... ],
  "units": [ ... ]
}
```

| 필드 | 설명 |
|------|------|
| `meta` | `MetaDeckCreateRequest`와 동일한 구조. `title`, `setVersion`, `tier`는 필수입니다. (이제 메타 수준 시너지는 사용하지 않습니다.) |
| `boards[]` | 각 보드에 대한 정의입니다. 항목은 `DeckBoardCreateRequest`와 동일하며 `level`(5~10)과 선택적인 `synergies`(JSON 문자열)를 포함합니다. |
| `units[]` | `BoardUnitsCreateRequest` 배열입니다. 각 항목은 `level`과 해당 레벨의 `units` 배열(`UnitRequest`)을 포함합니다. `units` 는 통째로 교체됩니다. |

> `boards`에 정의된 레벨과 `units`에 정의된 레벨이 일치해야 합니다. 유닛만 전달하고 보드를 생성하지 않으면 422 오류가 발생합니다. 레벨당 유닛 수는 레벨 값(예: Lv8 → 최대 8개)을 초과할 수 없습니다.

### 요청 예시
```http
POST /api/decks
Authorization: Bearer <token>
Content-Type: application/json

{
  "meta": {
    "title": "메카-자르반 덱",
    "set": 15,
    "tier": "S",
    "description": "초반 빌드업 후 자르반 중심"
  },
  "boards": [
    {
      "level": 8,
      "synergies": "{\"메카\":3,\"전쟁기계\":2}"
    },
    {
      "level": 9,
      "synergies": null
    }
  ],
  "units": [
    {
      "level": 8,
      "units": [
        {
          "championId": "JarvanIV",
          "starLevel": 2,
          "items": ["Spear_of_Shojin", "Giant_Slayer"],
          "position": { "row": 1, "col": 4 }
        }
      ]
    },
    {
      "level": 9,
      "units": []
    }
  ]
}
```
> 요청에 포함되지 않은 레벨(5~10)은 서버가 자동으로 비어 있는 보드로 채웁니다.

### 검증 규칙
- `meta.tier`, `meta.title`, `meta.setVersion` 필수
- `boards`는 최소 1개 이상
- 레벨 값은 5~10, 중복 불가
- 레벨당 유닛 수 최대 `level`개
- 보드 내 위치(row 0~3, col 0~6) 중복 불가
- 유닛당 아이템 최대 3개, 존재하지 않는 챔피언/아이템은 허용되지 않습니다.

### 성공 응답
```json
{
  "success": true,
  "data": 12345,
  "message": "덱이 성공적으로 생성되었습니다."
}
```
`data` 는 생성된 덱 ID 입니다.

## 2. 덱 상세 조회 (GET /api/decks/{deckId})
보드마다 저장된 시너지와 유닛 구성을 함께 반환합니다.

### 응답 예시
```json
{
  "success": true,
  "data": {
    "deckId": 12345,
    "title": "메카-자르반 덱",
    "userId": 999,
    "setVersion": 15,
    "description": "초반 빌드업 후 자르반 중심",
    "createdAt": "2025-01-02T10:00:00",
    "updatedAt": "2025-01-02T10:05:00",
    "activate": true,
    "tier": "S",
    "boards": [
      {
        "boardId": 777,
        "level": 8,
        "synergies": "{\"메카\":3,\"전쟁기계\":2}",
        "units": [
          {
            "unitId": 1001,
            "championId": "JarvanIV",
            "starLevel": 2,
            "items": ["Spear_of_Shojin", "Giant_Slayer"],
            "itemDetails": [
              {
                "apiName": "Spear_of_Shojin",
                "name": "무한의 창",
                "iconUrl": "spear_of_shojin.png",
                "composition": ["B.F. Sword", "Tear of the Goddess"],
                "effects": {"Mana": 15.0, "AttackSpeed": 25.0}
              },
              {
                "apiName": "Giant_Slayer",
                "name": "거인 학살자",
                "iconUrl": "giant_slayer.png",
                "composition": ["Recurve Bow", "B.F. Sword"],
                "effects": {"AttackDamage": 10.0, "BonusDamage": 25.0}
              }
            ],
            "imageUrl": "jarvan_square.png",
            "position": { "row": 1, "col": 4 }
          }
        ]
      },
      {
        "boardId": null,
        "level": 9,
        "synergies": null,
        "units": []
      }
      // ... 나머지 레벨들도 동일한 형식으로 반환됩니다.
    ]
  }
}
```
> 각 유닛은 `items` 배열(아이템 식별자)과 함께 `itemDetails` 배열을 제공하며, 아이템 이름·아이콘·조합 재료(`composition`)와 수치형 효과(`effects`)를 함께 내려줍니다.

## 3. 덱 수정 (PUT /api/decks/{deckId})
- 인증 + 소유자 검증 필요
- 요청은 `DeckCreateRequest` 형식을 사용합니다 (`meta` + `boards` + `units`).
- 전달된 보드/유닛 정보는 기존 구성을 완전히 대체합니다.

## 4. 덱 삭제 (DELETE /api/decks/{deckId})
- 인증 + 소유자 검증 필요
- 성공 시 메시지와 함께 `success: true` 응답.

## 5. 덱 목록 조회 (GET /api/decks)
- 쿼리 파라미터: `setVersion`, `title`, `activate`(optional, true/false)
- 응답 아이템은 `DeckSummaryResponse` 구조입니다.

```json
{
  "deckId": 12345,
  "title": "메카-자르반 덱",
  "userId": 999,
  "setVersion": 15,
  "description": "초반 빌드업 후 자르반 중심",
  "totalUnits": 7,
  "maxLevel": 9,
  "tier": "S",
  "createdAt": "2025-01-02T10:00:00",
  "updatedAt": "2025-01-02T10:05:00",
  "activate": true
}
```

`activate` 파라미터를 지정하면 활성/비활성 덱만 필터링하여 조회할 수 있습니다.

상세 조회 결과는 항상 5~10 레벨을 모두 포함하며, 데이터가 없는 레벨은 `boardId`가 `null`, `units`는 빈 배열, `synergies`는 `null`로 채워집니다.

## 6. 세트별 / 사용자별 덱 목록
- `GET /api/decks/set/{setVersion}`
- `GET /api/decks/users/{userId}`

두 엔드포인트 모두 `DeckSummaryResponse` 배열을 반환합니다.

## 7. 챔피언 포함 덱 조회 (GET /api/decks/champion/{championId})
- 설명: URL 경로의 `championId`(게임 내 챔피언 식별자, 예: `aatrox`, `ahri`)를 사용하여 해당 챔피언이 포함된 모든 메타덱(요약)을 조회합니다.
- 인증: 불필요 (public 조회)
- 파라미터:
    - `championId` (path, required): 챔피언의 API 식별자 (소문자 영문 권장)

### 응답 형식
- 성공: ApiResponse에 래핑된 `DeckSummaryResponse` 배열
- 결과가 없을 경우 `data`는 빈 배열입니다.

### 사용 예시
```http
GET /api/decks/champion/aatrox
Accept: application/json
```

### 응답 예시
```json
{
  "success": true,
  "data": [
    {
      "deckId": 12345,
      "title": "아트록스 코어 덱",
      "userId": 999,
      "setVersion": 15,
      "description": "아트록스 중심의 브루저 덱",
      "totalUnits": 7,
      "maxLevel": 9,
      "tier": "A",
      "createdAt": "2025-01-02T10:00:00",
      "updatedAt": "2025-01-02T10:05:00",
      "activate": true
    }
  ],
  "message": "챔피언 aatrox을(를) 포함한 덱 목록 조회가 완료되었습니다."
}
```

> 비고: 현재 구현은 `DeckUnit` 테이블에서 해당 `championId`를 사용하는 유닛을 먼저 찾은 뒤, 그들이 속한 메타덱들을 반환합니다. 대량 데이터 환경에서는 성능 최적화를 위해 리포지토리 수준에서 DISTINCT deckId를 직접 추출하거나, MetaDeckRepository에서 JOIN 쿼리로 한 번에 조회하는 방식으로 개선하는 것을 권장합니다.

## 8. 덱 활성화 상태 변경 (PATCH /api/decks/{deckId}/activation)
- 인증 + 소유자 검증 필요
- 요청 본문

```json
{
  "activate": true
}
```

- `activate` 값을 `true`로 보내면 덱을 활성화, `false`로 보내면 비활성화합니다.
- 현재 상태와 동일한 값으로 호출하면 추가 변경 없이 성공 응답을 반환합니다.
- 응답은 `ApiResponse<Void>`이며 메시지로 결과를 안내합니다.

### 성공 응답
```json
{
  "success": true,
  "data": null,
  "message": "덱 활성화 상태가 변경되었습니다."
}
```

### 비고
- 덱 상세/요약 응답에는 항상 `activate` 필드가 포함되어 현재 상태를 확인할 수 있습니다.
- 목록 조회 시 `activate` 쿼리 파라미터를 사용하면 활성/비활성 덱만 필터링할 수 있습니다.

### 활성 덱 목록 조회 (GET /api/decks/activation/active)
- 인증 필요 없음
- 활성 상태인 덱을 최신순으로 반환합니다.
- 응답 본문은 `DeckSummaryResponse` 배열과 동일합니다.

```http
GET /api/decks/activation/active
Accept: application/json
```

## 9. 오류 코드 요약
| HTTP | 상황 |
|------|------|
| 400  | 요청 포맷/필드 오류 |
| 401  | 인증 실패 |
| 403  | 소유자 아님(수정/삭제) |
| 404  | 덱 미존재 |
| 422  | 도메인 검증 실패 (중복 레벨, 위치, 챔피언/아이템 미존재 등) |

---

프론트엔드는 요청 전 `units` 구조 등의 타입을 서버 DTO와 맞추고, 보드별 시너지 문자열은 `JSON.stringify()` 등을 활용해 문자열로 변환하여 전송하세요.