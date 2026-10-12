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
- MACHINECARE_RESEND_API_KEY: MachineCare 서버 전용 메일 발신 키. 미등록 시 기존 RESEND_API_KEY를 사용한다. ChatGPT Gmail 연결과 별개다.
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
Production에 본부 알림 수신처·실제 시험한 발신 주소·전용 관리자키를 Secret으로 등록했다. 처음에는 ENABLED=false를 유지했고, 아래 실제 검증 및 본부 확인 기록 완료 후 VERIFIED_REQUEST_ID와 ENABLED=true를 등록했다. 로컬 원본과 본부 관리자키 사본은 Git에서 제외한다. 기존 Driver Hub 설정은 변경하지 않았다.
기존 Resend 키로 회사 주소에서 지정 본부 Gmail로 비개인 발신 시험을 수행했다. API 200과 Gmail 받은편지함의 동일 검증번호, SPF·DKIM 통과를 확인했다. 검증번호: machinecare-sender-990c2508-159f-47fc-be6c-3325c6d30969. 이는 로컬 발신 시험으로 운영 사이트의 콜백 저장·조회·알림 전체 검증을 대신하지 않는다.

### DB 생성의 필수 비용 조건

사용자는 전용 유료 DB에 월 US$1 초과 과금을 막는 실제 한도를 요구했다. 단순 비용 알림·자동 충전 임계값으로 대체하지 않는다. 자동 업그레이드·Prod Pack·유료 추가 옵션은 끄고 Vercel 연동 별도 요금도 확인해야 한다. 조건을 충족하지 못하면 생성하지 않는다.
현재 팀에서 무료 플랜 생성은 Billing plan not found: free로 거절됐다. 실제 Vercel Redis 상품 스키마는 primaryRegion·readRegions·eviction·prodPack·autoUpgrade만 허용하며 budget 항목이 없다(additionalProperties=false).
실제 Pay As You Go 플랜 응답은 명령 10만 회당 US$0.20, preauthorizationAmount=0, quote=[]이다. 별도 연동 고정료는 응답에 표시되지 않았지만 이것만으로 별도 청구가 없다고 확정하지 않았다.
Upstash 공식 문서는 월 예산 도달 시 요청을 제한해 초과 비용을 막는다고 설명한다. 단, Developer API는 직접 가입한 Upstash 계정만 지원하며 Vercel 등 제3자 플랫폼에서 만든 계정은 지원하지 않는다. 현재 설치는 Vercel API의 installationType=marketplace인 Vercel 관리 연동이다. 이 계정에 UPSTASH_EMAIL·UPSTASH_API_KEY를 요구했던 안내는 철회한다.
현재 Vercel 연동의 생성 옵션은 유료 플랜만 제공하고 월 예산 입력은 지원하지 않는다. 연결된 브라우저가 없어 SSO 관리 화면의 비용 한도 설정은 직접 확인하지 못했다. 이를 한도 설정 가능 또는 불가능의 화면 검증으로 보고하지 않는다.
사용자가 직접 가입 계정의 무료 전용 DB 생성과 카드 미등록을 확인했다. 등록한 REST URL·읽기/쓰기 토큰을 MachineCare 전용 변수에 매핑하고 Vercel Production의 Secret으로 연결했다. 관리 API 키는 사용하지 않는다. 실제 REST 인증·익명 접근 거부·INFO의 maxmemory_policy=noeviction을 확인했다. Free와 카드 미등록은 사용자 확인이며 관리 화면을 직접 조회한 결과는 아니다. 공식 문서상 유료 전환에는 결제수단 등록이 필요하고 Free에는 Prod Pack을 제공하지 않는다. 카드 등록·유료 추가 옵션·새 Vercel Marketplace 리소스 생성 없이 외부 DB에 직접 REST로 연결했다. 기존 Vercel 호스팅 사용료는 DB 요금과 별개다. 무료를 유지할 수 없으면 앞서 승인한 월 US$1 초과 과금 차단 조건을 실제 설정·조회할 수 있을 때만 유료 DB를 사용한다.
직접 가입 DB는 전용 REST URL·토큰을 기존 Vercel 프로젝트의 MACHINECARE_KV_REST_API_URL·MACHINECARE_KV_REST_API_TOKEN에 서버 전용으로 등록할 수 있다. 기존 Driver Hub 연동을 교체하거나 자동으로 일반 KV 환경변수를 덮어쓰지 않는다. 무료 여부·자동 업그레이드 비활성·유료 옵션 비활성은 실제 계정 설정으로 확인하고, 유료인 경우 월 한도와 별도 연동 요금도 확인한다.
에이전트가 새 DB를 생성하거나 기존 Driver Hub DB를 재사용·변경하지 않았다. 사용자가 생성한 무료 DB로 운영 시험 접수 저장 및 인증된 본부 화면의 조회·360px 표시·잠금을 확인했다. 최초 시험 접수 d4200a14-2af9-4817-9476-965f623c0340의 메일 발송은 실패했다. 원인 진단에서 기존 운영 RESEND_API_KEY는 로컬의 수신 검증된 키와 달랐고 Resend 발신 API가 401을 반환했다. 기존 서비스의 공용 설정을 보존하고 검증된 로컬 발신 키를 MACHINECARE_RESEND_API_KEY로 별도 등록했다.

전용 발신키 코드의 로컬 빌드·변경 파일 린트·접수 시험 9건이 통과했고 main 커밋 8d022a9의 실제 Vercel 자동 빌드도 READY였다. 그 운영 배포에서 시험 접수 61e2a9e7-a639-4015-a1ef-078101faa993의 실제 저장 및 본부 모바일 화면 조회를 확인했다. 지정 본부 Gmail 받은편지함에서 동일 접수번호의 메시지 1a12fd19b10fe0eb를 직접 읽고 회사 발신 주소·수신처·SPF/DKIM 통과를 확인했다. 메일에는 접수번호와 본부 조회 경로만 있으며 고객 연락처·증상은 첨부하지 않았다. 이 증거 확인 후 실제 DB에 본부 확인 기록을 남기고 해당 VERIFIED_REQUEST_ID와 ENABLED=true를 Production에 등록했다. 활성 설정을 포함한 배포 후 /api/machinecare/callback의 available=true와 실제 고객 화면의 최종 제출·본부 수동 배정을 확인한다. 상세 시험 증거와 관리키는 Git에서 제외된 artifacts/machinecare-callback에 보관한다.

저장 실패나 한도 오류로 저장 확인이 불가능하면 접수 완료를 반환하지 않는다. 제출 화면은 입력을 유지하며 재시도·이메일 문의를 안내한다. 한도 거절 시험은 모의 오류로 검증하며 실제 과금을 발생시켜 한도를 소진하지 않는다.
