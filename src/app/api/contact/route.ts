import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Server-side initialization
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || '';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || '';

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

    // Production & Development Logging
    console.log("[CONTACT_FORM] ======================");
    console.log(`[CONTACT_FORM] HAS_CONTACT_FROM_EMAIL: ${!!process.env.CONTACT_FROM_EMAIL}`);
    console.log(`[CONTACT_FORM] HAS_CONTACT_TO_EMAIL: ${!!process.env.CONTACT_TO_EMAIL}`);
    console.log(`[CONTACT_FORM] FROM_DOMAIN: ${FROM_EMAIL.split('@')[1] || 'None'}`);
    console.log(`[CONTACT_FORM] TO_DOMAIN: ${TO_EMAIL.split('@')[1] || 'None'}`);
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

    if (FROM_EMAIL.includes('harrison.park@qagentlabs.com') || !FROM_EMAIL.includes('qagentlabs.com')) {
      const errMsg = '서버 설정 오류: 발신자는 반드시 qagentlabs.com 도메인을 사용해야 합니다.';
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
