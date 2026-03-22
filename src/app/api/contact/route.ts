import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your API key from .env.local
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_fallback');
const TO_EMAIL = 'wowa080421@gmail.com';

// Update this to your verified domain once configured (e.g. 'QAgentLabs <contact@qagentlabs.com>')
// If no domain is verified yet, it must be 'onboarding@resend.dev'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'QAgentLabs Contact <onboarding@resend.dev>';

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

    // Resend requires a verified domain to send FROM.
    // onboarding@resend.dev is allowed ONLY if the TO_EMAIL is the verified email address on the Resend account.
    console.log("TO_EMAIL:", TO_EMAIL);
    console.log("FROM_EMAIL:", FROM_EMAIL);

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      subject: `[QAgentLabs 문의] ${subject || '신규 문의가 접수되었습니다'}`,
      html: htmlContent,
      replyTo: email,
    });

    console.log("resend data:", data);
    console.log("resend error:", error);

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Contact Error:', error);
    return NextResponse.json(
      { error: '서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
