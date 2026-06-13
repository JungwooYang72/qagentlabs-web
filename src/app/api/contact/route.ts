import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Server-side initialization
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || '';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || '';

function extractEmailAddress(value: string): string {
  const match = value.match(/<([^>]+)>/);
  return (match ? match[1] : value).trim();
}

function extractDomain(value: string): string {
  const email = extractEmailAddress(value);
  return email.split("@")[1]?.toLowerCase() || "";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, subject, message, source, inquiryType } = body;

    // Validate required fields
    if (!firstName || !email || !phone || !message) {
      return NextResponse.json(
        { error: '이름, 이메일, 연락처, 문의 내용을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    const isDriverHub = source === 'driver-hub';

    let titleText = 'QAgentLabs 신규 문의 접수';
    let pathText = '일반 홈페이지 문의';
    let noteText = '일반 문의 접수';
    let mailSubject = `[QAgentLabs 문의] ${subject || '신규 문의가 접수되었습니다'}`;

    if (isDriverHub) {
      if (inquiryType === 'beta-apply') {
        titleText = 'QAgent Driver Hub 베타 신청';
        pathText = 'QAgent Driver Hub 무료 베타';
        noteText = '홈페이지 Driver Hub 페이지 작성 - 베타 신청';
        mailSubject = `[QAgent Driver Hub 베타신청] ${subject || '홈페이지 문의'}`;
      } else if (inquiryType === 'feedback') {
        titleText = 'QAgent Driver Hub 오류/피드백 접수';
        pathText = 'QAgent Driver Hub 오류/피드백';
        noteText = '홈페이지 Driver Hub 페이지 작성 - 오류/피드백';
        mailSubject = `[QAgent Driver Hub 오류/피드백] ${subject || '홈페이지 문의'}`;
      } else {
        titleText = 'QAgent Driver Hub 사용 문의';
        pathText = 'QAgent Driver Hub 사용문의';
        noteText = '홈페이지 Driver Hub 페이지 작성 - 사용 문의';
        mailSubject = `[QAgent Driver Hub 사용문의] ${subject || '홈페이지 문의'}`;
      }
    }

    const htmlContent = `
      <h3>${titleText}</h3>
      <p><strong>이름:</strong> ${firstName} ${lastName || ''}</p>
      <p><strong>이메일:</strong> ${email}</p>
      <p><strong>연락처:</strong> ${phone}</p>
      <p><strong>제목:</strong> ${subject || '입력되지 않음'}</p>
      <p><strong>유입경로:</strong> ${pathText}</p>
      <p><strong>비고:</strong> ${noteText}</p>
      <p><strong>문의 내용:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `;

    const extractedFromEmail = extractEmailAddress(FROM_EMAIL);
    const fromDomain = extractDomain(FROM_EMAIL);
    const toDomain = extractDomain(TO_EMAIL);

    // Production & Development Logging
    console.log("[CONTACT_FORM] ======================");
    console.log(`[CONTACT_FORM] HAS_CONTACT_FROM_EMAIL: ${!!process.env.CONTACT_FROM_EMAIL}`);
    console.log(`[CONTACT_FORM] HAS_CONTACT_TO_EMAIL: ${!!process.env.CONTACT_TO_EMAIL}`);
    console.log(`[CONTACT_FORM] extractedFromEmail: ${extractedFromEmail}`);
    console.log(`[CONTACT_FORM] fromDomain: ${fromDomain || 'None'}`);
    console.log(`[CONTACT_FORM] toDomain: ${toDomain || 'None'}`);
    
    // Server Configuration Validation
    if (!process.env.RESEND_API_KEY) {
      console.log("[CONTACT_FORM] Blocked: RESEND_API_KEY missing");
      return NextResponse.json(
        { error: '서버 환경변수 오류: 이메일 발송 서버 키가 없습니다.' },
        { status: 500 }
      );
    }

    if (!FROM_EMAIL || !TO_EMAIL) {
      const errMsg = '서버 환경변수 오류: 발신자 또는 수신자 이메일이 설정되지 않았습니다.';
      console.log(`[CONTACT_FORM] Blocked: ${errMsg}`);
      return NextResponse.json({ error: errMsg }, { status: 500 });
    }

    if (extractedFromEmail === 'onboarding@resend.dev' || fromDomain !== 'qagentlabs.com') {
      const errMsg = '서버 설정 오류: 발신자는 반드시 qagentlabs.com 도메인을 사용해야 하며 onboarding@resend.dev는 허용되지 않습니다.';
      console.log(`[CONTACT_FORM] Blocked: ${errMsg}`);
      return NextResponse.json({ error: errMsg }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: mailSubject,
      html: htmlContent,
      replyTo: email,
    });

    if (error) {
      console.log(`[CONTACT_FORM] Resend Error Status: ${error.statusCode || 'Unknown'}`);
      console.log(`[CONTACT_FORM] Resend Error Message: ${error.message}`);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // =========================================================================
    // [2] Google Form 연동 로직
    // =========================================================================
    /*
      필드 매핑표 (Google Form 문항 -> 홈페이지 ContactForm 필드)
      - 담당자 성함: entry.1996914439 -> ${firstName} ${lastName}
      - 이메일 주소: entry.1851805290 -> ${email}
      - 회사/기관명: entry.970744273 -> "미입력 (홈페이지 문의)"
      - 연락처: entry.1081258101 -> "미입력 (이메일로 회신 요망)"
      - 문의 내용: entry.935415787 -> [제목: ${subject}] ${message}
      - 유입경로: entry.153407753 -> "기타" (옵션값)
      - 유입경로 기타 텍스트: entry.153407753.other_option_response -> "홈페이지 폼 작성"

      ※ 주의: Google Form 양식이 변경되거나 문항이 삭제/추가되면 entry.xxxxx ID가 변경될 수 있습니다.
    */
    const GOOGLE_FORM_ACTION_URL = process.env.GOOGLE_FORM_ACTION_URL;
    if (GOOGLE_FORM_ACTION_URL) {
      try {
        const formData = new URLSearchParams();
        formData.append("entry.1996914439", `${firstName} ${lastName || ''}`.trim());
        formData.append("entry.1851805290", email);
        formData.append("entry.970744273", noteText);
        formData.append("entry.1081258101", phone);
        formData.append("entry.935415787", `[제목: ${subject || '미입력'}]\n${message}`);
        
        // 400 에러 원인 수정: 유입경로는 객관식이므로 허용된 옵션인 "기타"를 값으로 넣고, 기타 응답 필드에 텍스트를 넣음
        formData.append("entry.153407753", "기타");
        formData.append("entry.153407753.other_option_response", pathText);

        // [요구사항 3] POST payload 로깅 (개인정보 일부 마스킹)
        const maskedPayload: Record<string, string> = {};
        for (const [key, value] of Array.from(formData.entries())) {
          if (key === 'entry.1996914439' || key === 'entry.1851805290' || key === 'entry.1081258101') {
            maskedPayload[key] = value.length > 3 ? value.substring(0, 3) + '***' : '***';
          } else {
            maskedPayload[key] = value;
          }
        }
        console.log("[CONTACT_FORM] Google Form POST Payload:", JSON.stringify(maskedPayload));

        const gfResponse = await fetch(GOOGLE_FORM_ACTION_URL, {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        const gfStatus = gfResponse.status;
        const gfStatusText = gfResponse.statusText;
        const gfBodyText = await gfResponse.text();
        
        // [요구사항 1] snippet 길이 5000자로 늘리기
        const snippet = gfBodyText.substring(0, 5000).replace(/\n/g, ' ');

        if (!gfResponse.ok) {
          console.error(`[CONTACT_FORM] Google Form submit failed`);
          console.error(`[CONTACT_FORM] Status: ${gfStatus} ${gfStatusText}`);
          console.error(`[CONTACT_FORM] Response Body Snippet: ${snippet}`);

          // [요구사항 2] 에러 키워드 추출 및 주변 문맥 로깅
          const errorKeywords = ['error', 'required', 'invalid', 'entry.', '필수', '잘못'];
          errorKeywords.forEach(keyword => {
            const index = snippet.toLowerCase().indexOf(keyword);
            if (index !== -1) {
              const start = Math.max(0, index - 50);
              const end = Math.min(snippet.length, index + 50);
              console.error(`[CONTACT_FORM] Context for '${keyword}': ...${snippet.substring(start, end)}...`);
            }
          });
        } else {
          console.log("[CONTACT_FORM] Google Form submit success");
          console.log(`[CONTACT_FORM] Status: ${gfStatus} ${gfStatusText}`);
        }
      } catch (gfError: any) {
        // 구글 폼 저장이 실패해도 이메일 발송 프로세스는 정상 처리되도록 예외만 기록
        console.error("[CONTACT_FORM] Google Form submit failed (Fetch Exception)");
        console.error(`[CONTACT_FORM] Error Message: ${gfError.message}`);
      }
    } else {
      console.log("[CONTACT_FORM] GOOGLE_FORM_ACTION_URL is not set, skipping Google Form integration.");
    }
    // =========================================================================

    console.log("[CONTACT_FORM] Success:", data);

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Contact Error:', error);
    return NextResponse.json(
      { error: '서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
