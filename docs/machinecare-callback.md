# MachineCare 콜백 접수 운영 연결

현재 기본값은 **접수 닫힘**이다. Driver Hub 폼, 접수 데이터, 관리자 인증과 분리한다.
웹 문의 접수만 다루며 MachineCare 운영 플랫폼·기사 로그인·PC/폰 연결은 엔지니어 작업으로 유지한다.

## 연결할 실제 설정

기존 Vercel 프로젝트의 환경변수에 등록한다. 개인 전화번호를 코드나 공개 화면에 넣지 않는다.

- KV_REST_API_URL, KV_REST_API_TOKEN: 회사가 관리하는 기존 Redis의 서버 전용 쓰기 연결. 새 DB 생성·유료 플랜 변경은 하지 않았다.
- MACHINECARE_CALLBACK_ADMIN_TOKEN: 본부 전용 관리자 인증키(32자 이상). Driver Hub 키를 사용하지 않는다. 실제 본부 담당자에게 안전하게 전달한다.
- MACHINECARE_CALLBACK_HQ_EMAIL: 본부 알림 수신함. 소유자/조회 가능 여부를 실제 확인한다.
- MACHINECARE_CALLBACK_PRIMARY_EMAIL: 실제 주담당 배정 대상 계정.
- MACHINECARE_CALLBACK_BACKUP_EMAIL: 실제 보조담당 배정 대상 계정. 주담당과 구분한다.
- MACHINECARE_CALLBACK_FROM_EMAIL: Resend에서 실제 발송 가능한 발신 주소.
- RESEND_API_KEY: 기존 서버 전용 메일 발송 키를 재사용한다.
- MACHINECARE_CALLBACK_VERIFIED_REQUEST_ID: 아래 실제 시험 접수 번호.
- MACHINECARE_CALLBACK_ENABLED: 검증 전 false 또는 미설정. 검증 완료 후에만 true.

담당자 이메일은 배정 대상 식별에만 쓴다. 초기 알림은 본부에만 발송하고 본부가 수동 전달한다.
담당자별 로그인·자동 알림·자동 방문 예약 기능은 만들지 않았다.
공개 계정/수신처 기본값을 추정해서 넣지 않았다.

## 실제 개통 검증 순서

1. ENABLED를 false로 두고 실제 저장·본부·주담당·보조담당·발신 설정을 등록해 재배포한다.
2. /machinecare/requests에서 본부 인증키로 접수함에 접근한다. 공개 방문자는 API에서 401을 받는다.
3. '시험 접수 저장·알림 확인'으로 표시된 가상 데이터 한 건을 저장한다. 고객에게 메시지를 보내지 않는다.
4. 페이지 새로고침/재인증 후 같은 접수번호로 이름·연락처·지역·시간·요약이 남아 있는지 실제 조회한다.
5. 실제 본부 수신함에서 시험 접수 알림을 확인한다. API 발송 접수 성공은 실제 수신 확인과 구분한다.
6. 본부 화면에서 직접 확인 체크 후 '본부 확인 기록'을 누른다. 실제 수신을 보지 않은 상태에서 확인하지 않는다.
7. 해당 번호를 VERIFIED_REQUEST_ID에 등록하고 ENABLED=true로 재배포한다.
8. 운영 화면에서 5개 필드 입력 → 확인 → 최종 제출을 수행한다. 승인된 시험 정보로 저장·조회·주담당/보조담당 수동 배정을 확인한다.
9. 새로고침 후 배정 결과가 보관되는지 확인한다. 접수/배정 성공은 방문 예약 성공이 아니다.

저장소 연결·본부/담당자·발신 정보가 바뀌면 확인 증명과 일치하지 않아 접수가 다시 닫힌다.
설정값을 등록하는 것만으로 실제 개통 검증을 완료했다고 보고하지 않는다.

## 데이터와 경로

- 고객: /contact?service=machinecare
- 본부: /machinecare/requests (개인정보는 인증 후 API로만 조회)
- 고객 API: /api/machinecare/callback
- 본부 API: /api/admin/machinecare/requests
- 저장 키: machinecare:callback:record:<접수번호>
- 배정 키: machinecare:callback:assignment:<접수번호>
- 알림 상태: machinecare:callback:notification:<접수번호>
- 비개인 검증 증명: machinecare:callback:verification:<시험접수번호>
- 고객 데이터·배정·알림 상태는 접수일 기준 90일 자동 만료한다. 원문 IP는 저장하지 않고 제한용 해시는 1시간 만료한다.
- 알림 메일에는 접수번호·인증이 필요한 본부 조회 경로만 넣는다. 고객 연락처와 증상은 알림에 첨부하지 않는다.
- 본부 API에서 receipt id로 조회하거나 최대 100건을 확인한다. 자동 연락/자동 배정/결제/방문 예약은 하지 않는다.
- 클라이언트가 보낸 임의 배정 대상이나 관리자 권한은 사용하지 않는다.
- 저장 읽기 확인 전에는 성공을 응답하지 않는다. 재시도는 같은 접수번호를 사용해 중복 저장·알림을 방지한다.

## 확인된 차단 사항 (2026-10-12)

로컬에는 KV 연결과 MachineCare 본부/담당자/발신 설정이 없다.
Resend 키는 발송 전용이어서 도메인 조회 요청이 restricted_api_key로 거절됐다. 발신 도메인 인증 여부를 이 키로 확인하지 못했다.
Gmail 연결은 인증 재시도를 요구해 본부 수신함을 조회하지 못했다. 연결된 브라우저도 없다.
실제 회사 접수 보관·본부 조회·알림 수신은 아직 검증되지 않았으며 접수는 열지 않았다.
