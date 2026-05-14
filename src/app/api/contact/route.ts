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
    const { firstName, lastName, email, subject, message } = body;

    // Validate required fields
    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: '이름, 이메일, 문의 내용을 모두 입력해주세요.' },
        { status: 400 }
      );
    }

    const htmlContent = `
      <h3>QAgentLabs 신규 문의 접수</h3>
      <p><strong>이름:</strong> ${firstName} ${lastName || ''}</p>
      <p><strong>이메일:</strong> ${email}</p>
      <p><strong>제목:</strong> ${subject || '입력되지 않음'}</p>
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
      subject: `[QAgentLabs 문의] ${subject || '신규 문의가 접수되었습니다'}`,
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
      - 유입경로: entry.153407753 -> "홈페이지 폼 작성"

      ※ 주의: Google Form 양식이 변경되거나 문항이 삭제/추가되면 entry.xxxxx ID가 변경될 수 있습니다.
    */
    const GOOGLE_FORM_ACTION_URL = process.env.GOOGLE_FORM_ACTION_URL;
    if (GOOGLE_FORM_ACTION_URL) {
      try {
        const formData = new URLSearchParams();
        formData.append("entry.1996914439", `${firstName} ${lastName || ''}`.trim());
        formData.append("entry.1851805290", email);
        formData.append("entry.970744273", "미입력 (홈페이지 문의)");
        formData.append("entry.1081258101", "미입력 (이메일로 회신 요망)");
        formData.append("entry.935415787", `[제목: ${subject || '미입력'}]\n${message}`);
        formData.append("entry.153407753", "홈페이지 폼 작성");

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
        const snippet = gfBodyText.substring(0, 500).replace(/\n/g, ' ');

        if (!gfResponse.ok) {
          console.error(`[CONTACT_FORM] Google Form submit failed`);
          console.error(`[CONTACT_FORM] Status: ${gfStatus} ${gfStatusText}`);
          console.error(`[CONTACT_FORM] Response Body Snippet: ${snippet}`);
        } else {
          console.log("[CONTACT_FORM] Google Form submit success");
          console.log(`[CONTACT_FORM] Status: ${gfStatus} ${gfStatusText}`);
          console.log(`[CONTACT_FORM] Response Body Snippet: ${snippet}`);
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
