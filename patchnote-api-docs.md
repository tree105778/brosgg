# PatchNote API 문서

이 문서는 `PatchNote` 관련 REST API를 정리한 문서입니다.

참고: 엔드포인트와 동작은 `src/main/java/gg/bros/patchnote/controller/PatchNoteController.java`를 기준으로 정리했습니다.

요약
- 베이스 경로: `/patchnote`
- 주요 기능: 목록 조회, 상세 조회, 생성, 수정, 삭제

공통 응답 래퍼
- 이 프로젝트는 `ApiResponse<T>` 형태의 공통 응답 래퍼를 사용합니다. 성공 응답은 보통 다음과 같은 형태입니다:

  {
  "success": true,
  "data": ...
  }

(아래 예시는 래퍼 구조를 포함한 형태로 표현되어 있습니다.)

DTO (실제 코드 기준)
- PatchNoteUpsertRequest (요청)
    - season: Integer (required)
    - version: String (required, not blank)
    - title: String (required, not blank)
    - content: String (required, not blank)
    - active: boolean
    - releaseTs: Instant (optional) — 릴리즈 시각(ISO-8601)

- PatchNoteSummaryResponse (목록 응답 항목)
    - id: String
    - season: int
    - version: String
    - title: String
    - active: boolean
    - releaseTs: Instant

- PatchNoteDetailResponse (상세 응답)
    - id: String
    - season: int
    - version: String
    - title: String
    - content: String
    - active: boolean
    - releaseTs: Instant

엔드포인트

1) 패치 노트 목록 조회
- HTTP 메서드: GET
- 경로: `/patchnote`
- 설명: 패치 노트 목록을 조회합니다. 기본적으로 활성화된 항목만 반환합니다.
- 쿼리 파라미터:
    - `active` (optional, default: `y`) - `y`일 경우 활성화된 패치 노트만 조회, `n`이면 전체 조회
- 응답 코드:
    - 200: 성공
- 요청 예시 (curl):

  curl -X GET "http://localhost:8080/patchnote?active=y"

- 성공 응답 예시 (200):

  {
  "success": true,
  "data": [
  {
  "id": "507f1f77bcf86cd799439011",
  "season": 12,
  "version": "13.2",
  "title": "패치 노트 제목 예시",
  "active": true,
  "releaseTs": "2025-10-22T08:00:00Z"
  }
  ]
  }

- 오류 응답 예시 (500 - 서버 에러):

  {
  "success": false,
  "error": {
  "code": 500,
  "message": "Internal server error"
  }
  }

- 비고: 실제 응답은 `PatchNoteSummaryResponse`를 따릅니다.

2) 패치 노트 상세 조회
- HTTP 메서드: GET
- 경로: `/patchnote/{id}`
- 설명: 특정 패치 노트의 상세 정보를 조회합니다.
- 경로 파라미터:
    - `id` (required) - 패치 노트 ID
- 응답 코드:
    - 200: 성공
    - 404: 해당 ID의 패치 노트 없음
- 요청 예시 (curl):

  curl -X GET "http://localhost:8080/patchnote/507f1f77bcf86cd799439011"

- 성공 응답 예시 (200):

  {
  "success": true,
  "data": {
  "id": "507f1f77bcf86cd799439011",
  "season": 12,
  "version": "13.2",
  "title": "패치 노트 제목 예시",
  "content": "상세 내용 HTML 또는 마크다운",
  "active": true,
  "releaseTs": "2025-10-22T08:00:00Z"
  }
  }

- 오류 응답 예시 (404 - 리소스 없음):

  {
  "success": false,
  "error": {
  "code": 404,
  "message": "PatchNote not found: 507f1f77bcf86cd799439099"
  }
  }

- 비고: 실제 응답은 `PatchNoteDetailResponse`를 따릅니다.

3) 패치 노트 생성
- HTTP 메서드: POST
- 경로: `/patchnote`
- 설명: 새로운 패치 노트를 생성합니다.
- 요청 본문(Content-Type: application/json): `PatchNoteUpsertRequest` 형태

- 요청 예시 (JSON body):

  {
  "season": 12,
  "version": "13.2",
  "title": "이번 패치 주요 변경사항",
  "content": "패치 상세 설명\n- 변경사항 1\n- 변경사항 2",
  "active": true,
  "releaseTs": "2025-10-22T08:00:00Z"
  }

- curl 예시:

  curl -X POST "http://localhost:8080/patchnote" \
  -H "Content-Type: application/json" \
  -d '{"season":12,"version":"13.2","title":"새 패치","content":"내용","active":true,"releaseTs":"2025-10-22T08:00:00Z"}'

- 성공 응답 예시 (200):

  {
  "success": true,
  "data": {
  "id": "507f1f77bcf86cd799439011",
  "season": 12,
  "version": "13.2",
  "title": "이번 패치 주요 변경사항",
  "content": "패치 상세 설명\n- 변경사항 1\n- 변경사항 2",
  "active": true,
  "releaseTs": "2025-10-22T08:00:00Z"
  }
  }

- 오류 응답 예시 (400 - 유효성 오류):

  {
  "success": false,
  "error": {
  "code": 400,
  "message": "Validation failed",
  "details": [
  { "field": "title", "message": "must not be blank" },
  { "field": "version", "message": "must not be blank" }
  ]
  }
  }

- 유효성 제약:
    - `season`은 null 불가
    - `version`, `title`, `content`는 빈 문자열 불가

4) 패치 노트 수정
- HTTP 메서드: PUT
- 경로: `/patchnote/{id}`
- 설명: 기존 패치 노트를 수정합니다.
- 경로 파라미터:
    - `id` (required) - 수정할 패치 노트 ID
- 요청 본문(Content-Type: application/json): `PatchNoteUpsertRequest` 형태

- 요청 예시 (JSON body):

  {
  "season": 12,
  "version": "13.2",
  "title": "수정된 패치 노트 제목",
  "content": "수정된 내용",
  "active": false,
  "releaseTs": "2025-10-22T09:30:00Z"
  }

- curl 예시:

  curl -X PUT "http://localhost:8080/patchnote/507f1f77bcf86cd799439011" \
  -H "Content-Type: application/json" \
  -d '{"season":12,"version":"13.2","title":"수정","content":"수정 내용","active":false,"releaseTs":"2025-10-22T09:30:00Z"}'

- 성공 응답 예시 (200):

  {
  "success": true,
  "data": {
  "id": "507f1f77bcf86cd799439011",
  "season": 12,
  "version": "13.2",
  "title": "수정된 패치 노트 제목",
  "content": "수정된 내용",
  "active": false,
  "releaseTs": "2025-10-22T09:30:00Z"
  }
  }

- 오류 응답 예시 (400 - 유효성 오류):

  {
  "success": false,
  "error": {
  "code": 400,
  "message": "Validation failed",
  "details": [
  { "field": "content", "message": "must not be blank" }
  ]
  }
  }

- 오류 응답 예시 (404 - 리소스 없음):

  {
  "success": false,
  "error": {
  "code": 404,
  "message": "PatchNote not found: 507f1f77bcf86cd799439099"
  }
  }

5) 패치 노트 삭제
- HTTP 메서드: DELETE
- 경로: `/patchnote/{id}`
- 설명: 특정 패치 노트를 삭제합니다.
- 경로 파라미터:
    - `id` (required)
- 요청 예시 (curl):

  curl -X DELETE "http://localhost:8080/patchnote/507f1f77bcf86cd799439011"

- 성공 응답 예시 (200):
  {
  "success": true,
  "data": null
  }

- 오류 응답 예시 (404 - 리소스 없음):
  {
  "success": false,
  "error": {
  "code": 404,
  "message": "PatchNote not found: 507f1f77bcf86cd799439099"
  }
  }

에러 처리
- 400: 유효성 검증 실패 등 잘못된 요청
- 404: 리소스 없음
- 기타: 내부 서버 오류(500) 등

사용 예시 (curl)
- 목록 조회(활성화된 것만):

  curl -X GET "http://localhost:8080/patchnote"

- 전체 목록 조회:

  curl -X GET "http://localhost:8080/patchnote?active=n"

- 상세 조회:

  curl -X GET "http://localhost:8080/patchnote/507f1f77bcf86cd799439011"

- 생성:

  curl -X POST "http://localhost:8080/patchnote" -H "Content-Type: application/json" -d '{"season":12,"version":"13.2","title":"새 패치","content":"내용","active":true,"releaseTs":"2025-10-22T08:00:00Z"}'

- 수정:

  curl -X PUT "http://localhost:8080/patchnote/507f1f77bcf86cd799439011" -H "Content-Type: application/json" -d '{"season":12,"version":"13.2","title":"수정","content":"수정 내용","active":false,"releaseTs":"2025-10-22T09:30:00Z"}'

- 삭제:

  curl -X DELETE "http://localhost:8080/patchnote/507f1f77bcf86cd799439011"

추가 메모
- 문서의 DTO 필드는 실제 코드(`src/main/java/gg/bros/patchnote/dto`)를 반영했습니다.

작성자: 자동 생성
작성일: 2025-10-22