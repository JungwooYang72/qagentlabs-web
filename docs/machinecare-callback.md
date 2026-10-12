# MachineCare 콜백 접수 운영 연결

공개 접수는 실제 저장·본부 조회·Gmail 알림 수신 검증 후에만 연다. Driver Hub 폼·저장소·관리자 인증과 분리한다.

## 초기 운영

- 본부가 비공개 접수함을 확인해 주담당(동생) 또는 보조담당(본부)에게 수동 배정하고 별도로 전달한다.
- 기사별 웹 계정·이메일·자동 알림·자동배정은 필요하지 않으며 후속 작업으로 둔다.
- 자동화 본부 계정과 알림 수신처는 사용자가 지정한 연결 Gmail이다. 주소는 서버 환경변수로만 설정하며 고객 화면에 공개하지 않는다.
- 회사 Daum 메일은 대외 연락처로 유지한다. 이전·전달 설정을 하지 않으며 회사 Daum 수신함 확인은 콜백 개통 조건이 아니다.
- 문의 접수와 담당 배정은 방문 예약 확정이 아니다. 담당 기사가 통화로 증상·방문 가능 여부·비용·일정을 협의한 후 방문을 확정한다.
- MachineCare 운영 플랫폼 연결은 엔지니어 작업으로 유지한다.

## 서버 전용 설정

기존 Vercel 프로젝트의 Production 환경에 등록한다. 비밀값·담당자 개인 전화번호를 코드나 고객 화면에 넣지 않는다.

- MACHINECARE_KV_REST_API_URL, MACHINECARE_KV_REST_API_TOKEN: 회사가 관리하는 MachineCare 전용 비공개 Redis의 읽기·쓰기 연결. Driver Hub의 KV_REST_API_*로 대체하지 않는다.
- MACHINECARE_CALLBACK_ADMIN_TOKEN: 본부 전용 관리자 인증키(32자 이상). Driver Hub 키와 분리하고 본부에 안전하게 전달한다.
- MACHINECARE_CALLBACK_HQ_EMAIL: 사용자가 지정한 본부 Gmail 알림 수신처.
- MACHINECARE_CALLBACK_FROM_EMAIL: 운영 사이트에서 실제 발송 가능한 검증된 Resend 발신 주소.
- RESEND_API_KEY: 운영 사이트의 서버 전용 메일 발신 키. ChatGPT Gmail 연결과 별개다.
- MACHINECARE_CALLBACK_VERIFIED_REQUEST_ID: 아래 실제 시험 접수 번호.
- MACHINECARE_CALLBACK_ENABLED: 검증 전 false 또는 미설정. 검증 완료 후에만 true.

## 실제 개통 검증 순서

1. Vercel 연결 후 사용 가능한 설정 도구의 프로젝트·환경변수·저장소 관리 범위를 확인한다. 미연결 상태에서 설정했다고 보고하지 않는다.
2. 전용 비공개 저장소·본부 알림·발신 설정을 등록하고 ENABLED=false로 배포한다. 기존 Driver Hub 설정은 유지한다.
3. /machinecare/requests에서 본부 인증키로 접수함에 접근한다. 인증 없는 API 요청은 401이어야 한다.
4. '시험 접수 저장·알림 확인'으로 명시된 가상 데이터 한 건을 실제 저장한다. 고객에게 연락하지 않는다.
5. 새 요청으로 같은 접수번호의 이름·연락처·지역·시간·요약을 조회해 저장 유지와 본부 접근을 확인한다.
6. 연결된 본부 Gmail에서 해당 접수번호의 운영 사이트 알림을 실제 수신했는지 확인한다. Resend API 발송 접수 성공은 실제 수신 확인과 구분한다.
7. 실제 저장·조회·메일 수신 증거를 확인한 뒤 본부 확인 기록을 남긴다. VERIFIED_REQUEST_ID와 ENABLED=true를 등록하고 배포한다.
8. 운영 사이트에서 5개 필드 입력 → 검토 → 최종 제출을 확인하고, 명시된 시험 데이터의 저장·조회·알림과 본부 수동 배정을 검증한다. 접수 성공은 방문 예약 확정이 아니다.

설정의 저장소·인증키·본부 수신처·발신 설정이 바뀌면 기존 검증 증명과 일치하지 않아 다시 닫힌다.

## 데이터와 경로

- 고객: /contact?service=machinecare
- 본부: /machinecare/requests (noindex, 인증 후 API로만 데이터 조회)
- 고객 API: /api/machinecare/callback
- 본부 API: /api/admin/machinecare/requests
- 전용 저장소 키: machinecare:callback:record:<접수번호>, assignment:<접수번호>, notification:<접수번호>
- 고객·배정·알림 데이터는 접수 기준 90일 자동 만료. 원문 IP 대신 반복 요청 제한용 해시를 1시간 보관한다.
- 알림에는 접수번호와 인증이 필요한 본부 조회 경로만 넣는다. 고객 연락처·증상을 메일에 첨부하지 않는다.
- 인증키는 본부 화면 메모리에만 유지하며 잠금 시 데이터와 진행 중 요청을 지운다. 최대 100건 표시, 이전 접수는 번호로 조회한다.
- 공개 데이터 조회·기사 로그인·자동배정·결제·방문 예약 기능은 제공하지 않는다.

## 확인 상태 (2026-10-12)

Vercel CLI 63.1.2 로그인 계정과 기존 qagentlabs-web 프로젝트 접근을 확인하고 로컬 연결을 완료했다. 플러그인 없이 CLI의 env 설정·통합 조회·REST API를 사용할 수 있다. CLI는 artifacts/vercel-cli에만 설치했다.
Production에 본부 알림 수신처·실제 시험한 발신 주소·전용 관리자키·ENABLED=false를 Secret으로 등록했다. 로컬 원본과 본부 관리자키 사본은 Git에서 제외한다. 기존 Driver Hub 설정은 변경하지 않았다.
기존 Resend 키로 회사 주소에서 지정 본부 Gmail로 비개인 발신 시험을 수행했다. API 200과 Gmail 받은편지함의 동일 검증번호, SPF·DKIM 통과를 확인했다. 검증번호: machinecare-sender-990c2508-159f-47fc-be6c-3325c6d30969. 이는 로컬 발신 시험으로 운영 사이트의 콜백 저장·조회·알림 전체 검증을 대신하지 않는다.

### DB 생성의 필수 비용 조건

사용자는 전용 유료 DB에 월 US$1 초과 과금을 막는 실제 한도를 요구했다. 단순 비용 알림·자동 충전 임계값으로 대체하지 않는다. 자동 업그레이드·Prod Pack·유료 추가 옵션은 끄고 Vercel 연동 별도 요금도 확인해야 한다. 조건을 충족하지 못하면 생성하지 않는다.
현재 팀에서 무료 플랜 생성은 Billing plan not found: free로 거절됐다. 실제 Vercel Redis 상품 스키마는 primaryRegion·readRegions·eviction·prodPack·autoUpgrade만 허용하며 budget 항목이 없다(additionalProperties=false).
실제 Pay As You Go 플랜 응답은 명령 10만 회당 US$0.20, preauthorizationAmount=0, quote=[]이다. 별도 연동 고정료는 응답에 표시되지 않았지만 이것만으로 별도 청구가 없다고 확정하지 않았다.
Upstash 공식 문서는 월 예산 도달 시 요청을 제한해 초과 비용을 막는다고 설명하고, Developer API는 생성 요청의 budget 지정 및 조회를 지원한다. 현재 그 관리 API 인증은 없으며 Vercel SSO 콘솔의 Account → API Keys 접근을 요청했다. Vercel 인증과 Upstash 관리 API 인증은 별개다.
새 MachineCare DB는 생성하지 않았다. 기존 Driver Hub DB는 재사용·변경하지 않았다. 실제 전용 저장소 저장·본부 조회·운영 발신 Gmail 수신은 미검증이며 공개 접수는 닫혀 있다.

저장 실패나 한도 오류로 저장 확인이 불가능하면 접수 완료를 반환하지 않는다. 제출 화면은 입력을 유지하며 재시도·이메일 문의를 안내한다. 한도 거절 시험은 모의 오류로 검증하며 실제 과금을 발생시켜 한도를 소진하지 않는다.
