"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface ContactFormProps {
  source?: string;
  defaultInquiryType?: "beta-apply" | "feedback" | "general";
}

// ==========================================
// [초안 문서 텍스트] - 모달 노출용
// ==========================================
const PRIVACY_POLICY_TEXT = `개인정보 처리방침 (초안)

## 1. 총칙
큐에이전트랩스(대표 양*우, 이하 "운영자")은(는) Driver Hub 베타 서비스(이하 "서비스") 이용자의 개인정보를 중요하게 생각하며, 「개인정보 보호법」 등 관련 법령을 준수합니다. 본 처리방침은 베타 단계 기준이며, 정식 출시 시 변경될 수 있습니다.

## 2. 수집하는 개인정보 항목
서비스는 자동수락·자동클릭 기능이 없는 콜판정 보조 도구이며, 최소한의 정보만 수집합니다.

가) 베타 신청 시 (이용자가 직접 입력)
- (필수) 닉네임 또는 이름
- (필수) 연락 수단 1개: 카카오톡 ID 또는 이메일 중 택1
- (필수) 주 활동 지역, 사용 플랫폼(카카오T/티맵/로지/콜마너/아이드라이버/기타), 사용 기기, Android 버전, 대리기사 경력
- (선택) 전화번호 — 강제하지 않으며, 명시적 동의 시에만 수집

나) 앱 사용 시
- 기기 승인 코드(익명 설치 식별자) — 전화번호·IMEI·Android ID가 아니며 개인식별정보로 사용하지 않음
- 베타 사용권(entitlement) 상태, 만료일 등 운영 관리 정보

다) 오류 제보 시 (이용자가 직접 제출)
- 플랫폼/화면 유형/기기명/Android 버전/앱 버전/증상/화면 캡처(선택)
* 화면 캡처에 포함될 수 있는 고객 정보·목적지 등 민감 항목은 가린 뒤 제출하도록 안내합니다.
* 신청 폼으로 제출한 정보는 이메일 발송 서비스(Resend) 및 Google(폼/시트)을 통해 운영자에게 전달·보관됩니다.

라) 수집하지 않는 정보
- 주민등록번호 등 고유식별정보, 위치정보의 서버 전송, 통신사·금융 정보, 기타 민감정보

## 3. 수집·이용 목적
- 베타 참여자 식별 및 사용권 승인/연장/차단
- 설치·권한 설정 지원 및 오류 대응
- 서비스 품질 개선 및 베타 운영 공지

## 4. 보유 및 이용 기간
- 베타 종료 또는 이용자의 탈퇴/삭제 요청 시까지 보유 후 지체 없이 파기
- 관련 법령상 보존 의무가 있는 경우 해당 기간 동안 보관
- 오류 캡처 자료: 오류 처리 완료 후 30일 이내 파기

## 5. 제3자 제공 및 처리 위탁
- 운영자는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
- 다만 서비스 운영을 위해 아래와 같이 개인정보 처리를 위탁합니다.
* 수탁자: Resend (신청·문의 내용의 이메일 전송)
* 수탁자: Google (Forms/Sheets) (신청자 명단 저장·관리)

- 위 수탁자는 각사의 개인정보 보호정책에 따라 데이터를 처리하며, 위탁 업무 변경 시 본 방침에 반영합니다.
- 카카오톡방/네이버카페 이용 시에는 각 플랫폼(카카오, 네이버)의 약관·정책이 별도로 적용됩니다.

## 6. 정보주체의 권리
이용자는 언제든지 본인 개인정보의 열람·정정·삭제·처리정지를 요청할 수 있습니다. 요청은 harrison.park@qagentlabs.com 연락처로 접수합니다.

## 7. 파기 절차 및 방법
보유기간 경과 또는 목적 달성 시, 전자적 파일은 복구 불가능한 방법으로 삭제하고 출력물은 분쇄합니다.

## 8. 안전성 확보 조치
- 접근 권한 최소화 및 관리자 통제
- 기기 승인 코드의 익명 처리
- 캡처 자료 내 민감정보 마스킹 안내

## 9. 개인정보 보호책임자
- 책임자: 양*우 / 운영책임자
- 연락처: harrison.park@qagentlabs.com

## 10. 고지 의무
본 방침의 변경 시 시행 7일 전 공지(네이버카페 공지 등)를 통해 안내합니다.

- 시행일: [폼 오픈일]
- 버전: 0.2 (초안)`;

const BETA_TERMS_TEXT = `Driver Hub 베타 이용약관 (초안)

## 제1조 (목적)
본 약관은 큐에이전트랩스(대표 양*우)이(가) 제공하는 Driver Hub 베타 서비스(이하 "서비스")의 이용 조건을 정합니다.

## 제2조 (서비스의 성격)
1. 서비스는 대리운전 콜의 수익성·위험도·목적지·오지 여부 등을 빛(색상)으로 빠르게 판단하도록 돕는 보조 도구입니다.
2. 서비스는 자동수락·자동클릭 기능이 없으며, 콜 수락 여부는 전적으로 기사 본인의 판단과 책임입니다.
3. 서비스는 수익을 보장하지 않습니다. 표시되는 색상/불빛은 참고 정보이며 오판정·미표시가 발생할 수 있습니다.

## 제3조 (베타 단계 고지)
1. 본 서비스는 베타(시험) 단계로, 기능이 불완전하거나 예고 없이 변경·중단될 수 있습니다.
2. 색상 누락, 특정 플랫폼(카카오T/티맵) 표시 오류, 점수 계산 오류 등이 발생할 수 있음에 동의합니다.
3. 베타 참여자는 발견한 오류를 운영자에게 제보하는 데 협조합니다(강제 아님, 권장).

## 제4조 (이용 자격 및 승인)
1. 베타 이용은 운영자의 승인을 받은 기기에 한합니다.
2. 이용자는 앱 설정의 기기 승인 코드를 운영자에게 전달하고, 운영자의 승인 후 사용할 수 있습니다.
3. 운영자는 사용권의 승인/연장/차단/만료를 관리할 수 있습니다.

## 제5조 (지원 환경)
1. 1차 베타는 삼성 갤럭시 계열(S/Note/Z Fold/Z Flip) 우선 지원하며, 권장 Android 11~14 / RAM 6GB 이상입니다.
2. iPhone/iOS는 지원하지 않습니다.
3. 일부 제조사 기기는 백그라운드/오버레이/접근성 제한으로 정상 동작하지 않을 수 있습니다.

## 제6조 (권한)
서비스는 화면 위 표시 및 콜 화면 인식을 위해 접근성 권한 및 다른 앱 위에 표시(오버레이) 권한을 필요로 합니다. 권한의 목적은 별도 안내문에 따릅니다.

## 제7조 (이용자의 의무)
이용자는 다음 행위를 하지 않습니다.
1. APK 또는 승인자 전용 링크의 외부 재배포
2. 운영자 승인 없는 재설치·이전
3. 타인의 개인정보·고객정보 노출
4. 운영 채널 내 욕설·분쟁·영업 방해

## 제8조 (지식재산권 및 비공개)
서비스, APK, 운영 자료에 대한 권리는 운영자에게 있으며, 이용자는 이를 무단 복제·배포·역분석하지 않습니다.

## 제9조 (면책)
운영자는 베타 서비스의 오류·중단·미표시로 인한 콜 수락 결과 및 손익에 대해 책임지지 않습니다. 최종 판단과 책임은 이용자에게 있습니다.

## 제10조 (계약 해지)
이용자는 언제든 베타 참여를 중단할 수 있으며, 운영자는 제7조 위반 시 사전 통지 후(긴급 시 즉시) 승인을 철회할 수 있습니다.

## 제11조 (약관 변경)
운영자는 본 약관을 변경할 수 있으며, 변경 시 운영 채널을 통해 공지합니다.

- 시행일: [폼 오픈일]
- 버전: 0.2 (초안)`;

const ERROR_SCREENSHOT_TEXT = `오류 화면 캡처 제공 동의 (초안)

## 목적
Driver Hub 베타의 색상/불빛 표시 오류를 파악·개선하기 위해, 이용자가 자발적으로 오류 화면 캡처와 관련 정보를 제공하는 데 대한 동의입니다.

## 동의 항목
아래 내용에 동의하는 경우에만 캡처를 제출해 주세요.

1. 제출한 캡처와 오류 정보(플랫폼, 기기, 증상 등)는 오류 진단·서비스 개선 목적으로만 사용됩니다.
2. 캡처 자료는 오류 처리 완료 후 30일 이내 파기됩니다.
3. 운영자는 이용자 동의 없이 캡처를 제3자에게 제공하지 않습니다.

## 민감정보 보호 (제출 전 필수 안내)
캡처에는 고객 정보가 포함될 수 있으므로, 제출 전에 아래 항목을 반드시 가려 주세요.
- 고객 이름·전화번호
- 정확한 출발지/도착지 주소(상세 번지)
- 기타 제3자 개인정보

* 가리기 어려운 캡처는 제출하지 않아도 됩니다. 텍스트로 증상만 설명해도 됩니다.

## 자발성 및 철회
- 캡처 제공은 의무가 아니며, 제공하지 않아도 베타 이용에 불이익이 없습니다.
- 제출 후에도 삭제를 요청할 수 있습니다.

## 동의 확인
- 위 내용을 확인했으며, 민감정보를 가린 캡처를 자발적으로 제공하는 데 동의합니다.

- 버전: 0.2 (초안)`;

export default function ContactForm({ source = "general", defaultInquiryType = "general" }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Driver Hub 전용 상태
  const isDriverHub = source === "driver-hub";
  const [selectedDevice, setSelectedDevice] = useState<string>("");
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [consentTerms, setConsentTerms] = useState(false);
  const [consentScreenshot, setConsentScreenshot] = useState(false);

  // 모달 제어 상태
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showScreenshotModal, setShowScreenshotModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    if (isDriverHub) {
      const nickname = formData.get("nickname") as string;
      const email = formData.get("email") as string;
      const kakaoId = formData.get("kakaoId") as string;
      const phone = formData.get("phone") as string;
      const activityArea = formData.get("activityArea") as string;
      const device = formData.get("device") as string;
      const androidVersion = formData.get("androidVersion") as string;
      const experience = formData.get("experience") as string;
      const platforms = formData.getAll("platforms") as string[];

      // 1. 필수 동의 검사
      if (!consentPrivacy || !consentTerms) {
        setErrorMessage("필수 동의 항목을 모두 체크해주세요.");
        setStatus("error");
        setIsSubmitting(false);
        return;
      }

      // 2. iPhone 기기 스크리닝 차단
      if (device === "iPhone") {
        setErrorMessage("현재 iOS 기기는 지원하지 않습니다. 갤럭시 기기로 신청해주세요.");
        setStatus("error");
        setIsSubmitting(false);
        return;
      }

      // 3. 연락 수단 검사 (이메일 또는 카카오톡 중 최소 1개 입력 필수)
      if (!email.trim() && !kakaoId.trim()) {
        setErrorMessage("연락 수단 확보를 위해 이메일 또는 카카오톡 ID 중 최소 하나 이상은 반드시 입력해주세요.");
        setStatus("error");
        setIsSubmitting(false);
        return;
      }

      const inquiryType = formData.get("inquiryType") || defaultInquiryType;

      const data = {
        source,
        inquiryType,
        nickname,
        email,
        kakaoId,
        phone,
        activityArea,
        device,
        androidVersion,
        experience,
        platforms,
        consentPrivacy: consentPrivacy ? "동의함" : "동의안함",
        consentTerms: consentTerms ? "동의함" : "동의안함",
        consentScreenshot: consentScreenshot ? "동의함" : "동의안함",
      };

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch (_) {
            errorData = { error: "Failed to send (Status: " + response.status + ")" };
          }
          throw new Error(errorData.error || "Unknown server error");
        }

        setStatus("success");
        setConsentPrivacy(false);
        setConsentTerms(false);
        setConsentScreenshot(false);
        setSelectedDevice("");
        (e.target as HTMLFormElement).reset();
      } catch (error: any) {
        console.error(error);
        setErrorMessage(error.message || "Unknown error occurred");
        setStatus("error");
      } finally {
        setIsSubmitting(false);
      }

    } else {
      // 일반 B2B 폼 처리
      const data = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        subject: formData.get("subject"),
        message: formData.get("message"),
        source,
        inquiryType: formData.get("inquiryType") || defaultInquiryType,
      };

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch (_) {
            errorData = { error: "Failed to send (Status: " + response.status + ")" };
          }
          throw new Error(errorData.error || "Unknown server error");
        }

        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } catch (error: any) {
        console.error(error);
        setErrorMessage(error.message || "Unknown error occurred");
        setStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (status === "success") {
    return (
      <div className="w-full bg-slate-900/60 border border-slate-800 rounded-3xl p-8 md:p-12 text-center shadow-2xl space-y-6 max-w-xl mx-auto my-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="mx-auto w-16 h-16 bg-green-500/10 border border-green-500/30 text-green-400 rounded-full flex items-center justify-center text-3xl font-bold">
          ✓
        </div>
        <div className="space-y-2">
          <h3 className="text-xl md:text-2xl font-black text-white">
            {isDriverHub ? "베타 신청 완료!" : "문의가 접수되었습니다"}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
            {isDriverHub ? (
              `신청이 성공적으로 완료되었습니다.\n검토 후 입력하신 연락 수단(카카오톡/이메일)으로\n신속히 개별 연락드리겠습니다.`
            ) : (
              `문의가 정상적으로 접수되었습니다.\n확인 후 등록하신 이메일로 빠르게 답변드리겠습니다.`
            )}
          </p>
        </div>
        <div className="pt-2">
          <Button
            onClick={() => setStatus("idle")}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold h-11 text-sm rounded-xl"
          >
            {isDriverHub ? "확인" : "새로 문의하기"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        {status === "error" && (
          <div className="p-4 bg-red-950/40 text-red-300 border border-red-900 rounded-md text-sm break-all">
            <strong>제출에 실패했습니다.</strong><br/>
            <span className="text-xs mt-1 mb-2 block opacity-90">사유: {errorMessage}</span>
            문제가 지속될 경우 공식 지원 이메일(harrison.park@qagentlabs.com)로 접수해주세요.
          </div>
        )}

        {isDriverHub ? (
          // ==========================================
          // [Driver Hub 전용 폼 레이아웃]
          // ==========================================
          <div className="space-y-5">
            {/* 상단 스크리닝 공지 */}
            <div className="bg-yellow-500/5 border border-yellow-500/15 rounded-xl p-4 text-xs text-slate-400 space-y-1.5 leading-relaxed break-keep">
              <p className="text-yellow-500 font-bold">※ 기기 지원 스크리닝 안내</p>
              <p>
                1차 베타는 **삼성 갤럭시 계열(S/Note/Z Fold/Z Flip)** 우선 지원합니다. 
                <strong className="text-red-400"> iPhone/iOS는 지원하지 않습니다.</strong> 일부 중국 제조사(샤오미·오포·비보 등) 기기는 정상 동작이 어려울 수 있습니다.
              </p>
            </div>

            {/* 문의 유형 */}
            <div className="space-y-2">
              <label htmlFor="inquiryType" className="text-sm font-medium text-slate-200">문의 유형</label>
              <select
                id="inquiryType"
                name="inquiryType"
                disabled={isSubmitting}
                defaultValue={defaultInquiryType}
                className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
              >
                <option value="beta-apply">무료 베타 신청</option>
                <option value="feedback">오류/피드백 제보</option>
                <option value="general">일반 문의사항</option>
              </select>
            </div>

            {/* 닉네임 또는 이름 */}
            <div className="space-y-2">
              <label htmlFor="nickname" className="text-sm font-medium text-slate-200">닉네임 또는 이름 <span className="text-red-400">*</span></label>
              <input
                id="nickname"
                name="nickname"
                type="text"
                required
                disabled={isSubmitting}
                className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
                placeholder="예: 홍길동 또는 길동기사"
              />
            </div>

            {/* 이메일 & 카카오톡 ID */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-200">이메일 주소 <span className="text-slate-500">(카톡 ID 미기입시 필수)</span></label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  disabled={isSubmitting}
                  className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
                  placeholder="name@email.com"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="kakaoId" className="text-sm font-medium text-slate-200">카카오톡 ID <span className="text-slate-500">(이메일 미기입시 필수)</span></label>
                <input
                  id="kakaoId"
                  name="kakaoId"
                  type="text"
                  disabled={isSubmitting}
                  className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
                  placeholder="카카오톡 아이디 입력"
                />
              </div>
            </div>

            {/* 휴대폰 번호 */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-slate-200">휴대폰 번호 <span className="text-slate-500">(선택)</span></label>
              <input
                id="phone"
                name="phone"
                type="tel"
                disabled={isSubmitting}
                className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
                placeholder="010-0000-0000 (선택)"
              />
            </div>

            {/* 주 활동 지역 */}
            <div className="space-y-2">
              <label htmlFor="activityArea" className="text-sm font-medium text-slate-200">주 활동 지역 <span className="text-red-400">*</span></label>
              <input
                id="activityArea"
                name="activityArea"
                type="text"
                required
                disabled={isSubmitting}
                className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
                placeholder="예: 서울 강남 / 인천 / 경기 부천 등"
              />
            </div>
            {/* 사용 플랫폼 */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200 block">사용 중인 대리 플랫폼 <span className="text-slate-500">(중복 선택 가능) *</span></label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer select-none">
                  <input type="checkbox" name="platforms" value="카카오T" defaultChecked className="rounded border-slate-800 bg-slate-950 text-accent focus:ring-accent w-4.5 h-4.5" />
                  <span>카카오T</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer select-none">
                  <input type="checkbox" name="platforms" value="티맵" defaultChecked className="rounded border-slate-800 bg-slate-950 text-accent focus:ring-accent w-4.5 h-4.5" />
                  <span>티맵</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer select-none">
                  <input type="checkbox" name="platforms" value="로지" className="rounded border-slate-800 bg-slate-950 text-accent focus:ring-accent w-4.5 h-4.5" />
                  <span>로지</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer select-none">
                  <input type="checkbox" name="platforms" value="콜마너" className="rounded border-slate-800 bg-slate-950 text-accent focus:ring-accent w-4.5 h-4.5" />
                  <span>콜마너</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer select-none">
                  <input type="checkbox" name="platforms" value="아이드라이버" className="rounded border-slate-800 bg-slate-950 text-accent focus:ring-accent w-4.5 h-4.5" />
                  <span>아이드라이버</span>
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer select-none">
                  <input type="checkbox" name="platforms" value="기타" className="rounded border-slate-800 bg-slate-950 text-accent focus:ring-accent w-4.5 h-4.5" />
                  <span>기타</span>
                </label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="device" className="text-sm font-medium text-slate-200">사용 기기 <span className="text-red-400">*</span></label>
                <select
                  id="device"
                  name="device"
                  required
                  value={selectedDevice}
                  onChange={(e) => setSelectedDevice(e.target.value)}
                  disabled={isSubmitting}
                  className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
                >
                  <option value="">-- 기기 모델 선택 --</option>
                  <option value="갤럭시 S 계열">갤럭시 S 계열</option>
                  <option value="갤럭시 Note 계열">갤럭시 Note 계열</option>
                  <option value="갤럭시 Z Fold">갤럭시 Z Fold</option>
                  <option value="갤럭시 Z Flip">갤럭시 Z Flip</option>
                  <option value="기타 안드로이드">기타 안드로이드</option>
                  <option value="iPhone">iPhone (지원불가)</option>
                </select>
                {selectedDevice === "iPhone" && (
                  <p className="text-xs text-red-400 font-semibold mt-1">※ 현재 iOS 기기는 지원하지 않습니다.</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="androidVersion" className="text-sm font-medium text-slate-200">Android 버전 <span className="text-red-400">*</span></label>
                <select
                  id="androidVersion"
                  name="androidVersion"
                  required
                  disabled={isSubmitting}
                  className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
                >
                  <option value="">-- 버전 선택 --</option>
                  <option value="14">Android 14</option>
                  <option value="13">Android 13</option>
                  <option value="12">Android 12</option>
                  <option value="11">Android 11</option>
                  <option value="10 이하">Android 10 이하</option>
                  <option value="모름">잘 모름</option>
                </select>
              </div>
            </div>

            {/* 대리기사 경력 */}
            <div className="space-y-2">
              <label htmlFor="experience" className="text-sm font-medium text-slate-200">대리기사 경력 <span className="text-red-400">*</span></label>
              <select
                id="experience"
                name="experience"
                required
                disabled={isSubmitting}
                className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
              >
                <option value="">-- 대리 경력 선택 --</option>
                <option value="1년 미만">1년 미만</option>
                <option value="1~3년">1~3년</option>
                <option value="3~5년">3~5년</option>
                <option value="5년 이상">5년 이상</option>
              </select>
            </div>

            {/* 메시지 상세내용 (선택) */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-slate-200">오류 설명 및 문의 내용 <span className="text-slate-500">(선택)</span></label>
              <textarea
                id="message"
                name="message"
                rows={4}
                disabled={isSubmitting}
                className="flex min-h-[80px] w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
                placeholder="베타 신청 사유, 혹은 오류 발생 정황을 자유롭게 기입해주세요."
              ></textarea>
            </div>

            {/* 동의 체크박스 영역 */}
            <div className="space-y-3 pt-3 border-t border-slate-900">
              {/* 개인정보 동의 */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consentPrivacy}
                    onChange={(e) => setConsentPrivacy(e.target.checked)}
                    className="rounded border-slate-800 bg-slate-950 text-accent focus:ring-accent w-4.5 h-4.5"
                  />
                  <span>[필수] 개인정보 수집·이용 동의</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-xs text-slate-500 hover:text-slate-300 underline font-semibold"
                >
                  [전문 보기]
                </button>
              </div>

              {/* 이용약관 동의 */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consentTerms}
                    onChange={(e) => setConsentTerms(e.target.checked)}
                    className="rounded border-slate-800 bg-slate-950 text-accent focus:ring-accent w-4.5 h-4.5"
                  />
                  <span>[필수] 베타 이용약관 동의</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="text-xs text-slate-500 hover:text-slate-300 underline font-semibold"
                >
                  [전문 보기]
                </button>
              </div>

              {/* 오류화면 동의 */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consentScreenshot}
                    onChange={(e) => setConsentScreenshot(e.target.checked)}
                    className="rounded border-slate-800 bg-slate-950 text-accent focus:ring-accent w-4.5 h-4.5"
                  />
                  <span>[선택] 오류 화면 캡처 제공 동의</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowScreenshotModal(true)}
                  className="text-xs text-slate-500 hover:text-slate-300 underline font-semibold"
                >
                  [전문 보기]
                </button>
              </div>
            </div>
          </div>
        ) : (
          // ==========================================
          // [기본 B2B 문의 폼 레이아웃]
          // ==========================================
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">First name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  disabled={isSubmitting}
                  className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">Last name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  disabled={isSubmitting}
                  className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Work email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={isSubmitting}
                className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
                placeholder="name@company.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">연락처</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                disabled={isSubmitting}
                className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
                placeholder="010-1234-5678"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                disabled={isSubmitting}
                className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
                placeholder="문의 제목을 입력해주세요"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                disabled={isSubmitting}
                className="flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
                placeholder="How can we help? (문의 내용을 입력해주세요)"
              ></textarea>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="p-4 bg-red-950/40 text-red-300 border border-red-900 rounded-md text-sm break-all">
            <strong>제출에 실패했습니다.</strong><br/>
            <span className="text-xs mt-1 block opacity-90">사유: {errorMessage}</span>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-950 !text-slate-950 font-black h-12 text-sm"
          disabled={isSubmitting || (isDriverHub && selectedDevice === "iPhone")}
        >
          {isSubmitting ? "전송 중..." : isDriverHub ? "무료 베타 신청하기" : "Submit Inquiry"}
        </Button>
      </form>

      {/* ==========================================
      // [약관 동의 팝업 모달]
      // ========================================== */}
      {/* 1. 개인정보 동의 모달 */}
      {showPrivacyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-white">개인정보 수집 및 이용 동의 전문</h3>
                <p className="text-xs text-yellow-500 font-semibold mt-1">※ 초안 — 추후 변경될 수 있음</p>
              </div>
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="text-slate-400 hover:text-white text-2xl font-bold leading-none p-1"
              >
                &times;
              </button>
            </div>
            <div className="p-6 overflow-y-auto text-xs md:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans select-text">
              {PRIVACY_POLICY_TEXT}
            </div>
            <div className="p-4 border-t border-slate-800 flex justify-end gap-2 bg-slate-950/40 rounded-b-2xl">
              <Button variant="outline" onClick={() => setShowPrivacyModal(false)} className="border-slate-700 text-slate-300 hover:text-white">닫기</Button>
              <Button onClick={() => { setConsentPrivacy(true); setShowPrivacyModal(false); }} className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold">확인 및 동의</Button>
            </div>
          </div>
        </div>
      )}

      {/* 2. 베타 이용약관 모달 */}
      {showTermsModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-white">베타 서비스 이용약관 전문</h3>
                <p className="text-xs text-yellow-500 font-semibold mt-1">※ 초안 — 추후 변경될 수 있음</p>
              </div>
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="text-slate-400 hover:text-white text-2xl font-bold leading-none p-1"
              >
                &times;
              </button>
            </div>
            <div className="p-6 overflow-y-auto text-xs md:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans select-text">
              {BETA_TERMS_TEXT}
            </div>
            <div className="p-4 border-t border-slate-800 flex justify-end gap-2 bg-slate-950/40 rounded-b-2xl">
              <Button variant="outline" onClick={() => setShowTermsModal(false)} className="border-slate-700 text-slate-300 hover:text-white">닫기</Button>
              <Button onClick={() => { setConsentTerms(true); setShowTermsModal(false); }} className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold">확인 및 동의</Button>
            </div>
          </div>
        </div>
      )}

      {/* 3. 오류화면 전송 동의 모달 */}
      {showScreenshotModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-white">오류 화면 캡처 제공 동의 전문</h3>
                <p className="text-xs text-yellow-500 font-semibold mt-1">※ 초안 — 추후 변경될 수 있음</p>
              </div>
              <button
                type="button"
                onClick={() => setShowScreenshotModal(false)}
                className="text-slate-400 hover:text-white text-2xl font-bold leading-none p-1"
              >
                &times;
              </button>
            </div>
            <div className="p-6 overflow-y-auto text-xs md:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans select-text">
              {ERROR_SCREENSHOT_TEXT}
            </div>
            <div className="p-4 border-t border-slate-800 flex justify-end gap-2 bg-slate-950/40 rounded-b-2xl">
              <Button variant="outline" onClick={() => setShowScreenshotModal(false)} className="border-slate-700 text-slate-300 hover:text-white">닫기</Button>
              <Button onClick={() => { setConsentScreenshot(true); setShowScreenshotModal(false); }} className="bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold">확인 및 동의</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
