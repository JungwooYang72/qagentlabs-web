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
    const { 
      source, 
      inquiryType,
      // B2B 폼 필드
      firstName, 
      lastName, 
      email, 
      phone, 
      subject, 
      message, 
      // Driver Hub 폼 필드
      nickname,
      kakaoId,
      activityArea,
      device,
      androidVersion,
      experience,
      platforms,
      consentPrivacy,
      consentTerms,
      consentScreenshot
    } = body;

    const isDriverHub = source === 'driver-hub';

    // Validate required fields
    if (isDriverHub) {
      if (!nickname || (!email && !kakaoId) || !activityArea || !device || !androidVersion || !experience) {
        return NextResponse.json(
          { error: '필수 신청 정보를 모두 입력해주세요.' },
          { status: 400 }
        );
      }
    } else {
      if (!firstName || !email || !phone || !message) {
        return NextResponse.json(
          { error: '이름, 이메일, 연락처, 문의 내용을 모두 입력해주세요.' },
          { status: 400 }
        );
      }
    }

    let titleText = 'QAgentLabs 신규 문의 접수';
    let pathText = '일반 홈페이지 문의';
    let noteText = '일반 문의 접수';
    let mailSubject = `[QAgentLabs 문의] ${subject || '신규 문의가 접수되었습니다'}`;
    let htmlContent = '';

    if (isDriverHub) {
      if (inquiryType === 'beta-apply') {
        titleText = 'QAgent Driver Hub 베타 신청';
        pathText = 'QAgent Driver Hub 무료 베타';
        noteText = '홈페이지 Driver Hub 페이지 작성 - 베타 신청';
        mailSubject = `[QAgent Driver Hub 베타신청] ${nickname} 기사님 신청`;
      } else if (inquiryType === 'feedback') {
        titleText = 'QAgent Driver Hub 오류/피드백 접수';
        pathText = 'QAgent Driver Hub 오류/피드백';
        noteText = '홈페이지 Driver Hub 페이지 작성 - 오류/피드백';
        mailSubject = `[QAgent Driver Hub 오류/피드백] ${nickname} 기사님 제보`;
      } else {
        titleText = 'QAgent Driver Hub 사용 문의';
        pathText = 'QAgent Driver Hub 사용문의';
        noteText = '홈페이지 Driver Hub 페이지 작성 - 사용 문의';
        mailSubject = `[QAgent Driver Hub 사용문의] ${nickname} 기사님 문의`;
      }

      htmlContent = `
        <h3>${titleText}</h3>
        <p><strong>닉네임 또는 이름:</strong> ${nickname}</p>
        <p><strong>이메일:</strong> ${email || '미입력'}</p>
        <p><strong>카카오톡 ID:</strong> ${kakaoId || '미입력'}</p>
        <p><strong>휴대폰 번호:</strong> ${phone || '미입력'}</p>
        <p><strong>주 활동 지역:</strong> ${activityArea}</p>
        <p><strong>사용 플랫폼:</strong> ${Array.isArray(platforms) ? platforms.join(', ') : (platforms || '미선택')}</p>
        <p><strong>사용 기기:</strong> ${device}</p>
        <p><strong>Android 버전:</strong> ${androidVersion}</p>
        <p><strong>대리기사 경력:</strong> ${experience}</p>
        <p><strong>개인정보 동의:</strong> ${consentPrivacy || '동의안함'}</p>
        <p><strong>베타 약관 동의:</strong> ${consentTerms || '동의안함'}</p>
        <p><strong>오류 캡처 동의:</strong> ${consentScreenshot || '동의안함'}</p>
        <p><strong>추가 문의/제보 내용:</strong></p>
        <p>${(message || '없음').replace(/\n/g, '<br/>')}</p>
        <br/>
        <p><strong>유입경로:</strong> ${pathText}</p>
        <p><strong>비고:</strong> ${noteText}</p>
      `;
    } else {
      htmlContent = `
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
    }

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
    
    // 이메일 전송 결과 상태 변수
    let emailSendSuccess = false;
    let emailErrorMsg = '';

    // 이메일 설정 검증 및 발송 시도
    if (!process.env.RESEND_API_KEY) {
      console.log("[CONTACT_FORM] RESEND_API_KEY missing, skipping email send");
      emailErrorMsg = '이메일 발송 서버 키가 없습니다.';
    } else if (!FROM_EMAIL || !TO_EMAIL) {
      const errMsg = '발신자 또는 수신자 이메일이 설정되지 않았습니다.';
      console.log(`[CONTACT_FORM] ${errMsg}`);
      emailErrorMsg = errMsg;
    } else if (extractedFromEmail === 'onboarding@resend.dev' || fromDomain !== 'qagentlabs.com') {
      const errMsg = '발신자는 반드시 qagentlabs.com 도메인을 사용해야 하며 onboarding@resend.dev는 허용되지 않습니다.';
      console.log(`[CONTACT_FORM] ${errMsg}`);
      emailErrorMsg = errMsg;
    } else {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { data, error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: [TO_EMAIL],
          subject: mailSubject,
          html: htmlContent,
          replyTo: isDriverHub ? (email || FROM_EMAIL) : email,
        });

        if (error) {
          console.log(`[CONTACT_FORM] Resend Error Status: ${error.statusCode || 'Unknown'}`);
          console.log(`[CONTACT_FORM] Resend Error Message: ${error.message}`);
          emailErrorMsg = error.message;
        } else {
          emailSendSuccess = true;
          console.log("[CONTACT_FORM] Resend Email Send Success:", data);
        }
      } catch (err: any) {
        console.error("[CONTACT_FORM] Resend Exception:", err);
        emailErrorMsg = err.message || 'Unknown Resend error';
      }
    }

    // =========================================================================
    // [2] Google Form 연동 로직 (1:1 매핑으로 전면 개편)
    // =========================================================================
    let googleFormSuccess = false;
    let googleFormAttempted = false;
    let gfStatus = 0;
    let gfStatusText = '';
    let gfBodyText = '';

    const ACTUAL_ENV_URL = process.env.GOOGLE_FORM_ACTION_URL || 'NOT_SET';

    // Vercel 환경변수 등록오류를 무시하고 실제 상용 구글폼 주소로 전송을 고정하기 위해 강제 오버라이드
    const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdZasw3ehI5aLMPiT_VWRQ2TVDa75A4z452pABClbyZIGO1aw/formResponse';

    if (GOOGLE_FORM_ACTION_URL) {
      googleFormAttempted = true;
      try {
        const formData = new URLSearchParams();

        if (isDriverHub) {
          formData.append("entry.124821362", nickname);
          formData.append("entry.1269818276", email || "");
          formData.append("entry.1026788664", kakaoId || "");
          formData.append("entry.945786966", phone || "");
          formData.append("entry.1395594018", activityArea);
          formData.append("entry.151789722", device);
          formData.append("entry.1526675598", androidVersion);
          formData.append("entry.1815606880", experience);
          formData.append("entry.1985121008", consentPrivacy);
          formData.append("entry.1883591446", consentTerms);
          formData.append("entry.501373128", consentScreenshot);

          // 복수 선택 체크박스 다중값 전송 처리
          if (Array.isArray(platforms)) {
            platforms.forEach(p => {
              formData.append("entry.676517953", p);
            });
          } else if (platforms) {
            formData.append("entry.676517953", platforms);
          }
        } else {
          formData.append("entry.1996914439", `${firstName} ${lastName || ''}`.trim());
          formData.append("entry.1851805290", email);
          formData.append("entry.970744273", noteText);
          formData.append("entry.1081258101", phone);
          formData.append("entry.935415787", `[제목: ${subject || '미입력'}]\n${message}`);
          formData.append("entry.153407753", "기타");
          formData.append("entry.153407753.other_option_response", pathText);
        }

        // 구글 폼 정상 제출에 필요한 필수 부가 파라미터 추가
        formData.append("fvv", "1");
        formData.append("pageHistory", "0");
        formData.append("submit", "제출");

        // [요구사항 3] POST payload 로깅 (개인정보 일부 마스킹)
        const maskedPayload: Record<string, string | string[]> = {};
        for (const [key, value] of Array.from(formData.entries())) {
          const keysToMask = [
            'entry.1996914439', // B2B 성함
            'entry.1851805290', // B2B 이메일
            'entry.1081258101', // B2B 전화번호
            'entry.124821362',  // 드라이버 이름/닉네임
            'entry.1269818276', // 드라이버 이메일
            'entry.1026788664', // 드라이버 카톡 ID
            'entry.945786966'   // 드라이버 전화번호
          ];
          const maskValue = (val: string) => val.length > 3 ? val.substring(0, 3) + '***' : '***';
          const finalVal = keysToMask.includes(key) ? maskValue(value) : value;

          if (key in maskedPayload) {
            const current = maskedPayload[key];
            if (Array.isArray(current)) {
              current.push(finalVal);
            } else {
              maskedPayload[key] = [current, finalVal];
            }
          } else {
            maskedPayload[key] = finalVal;
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

        gfStatus = gfResponse.status;
        gfStatusText = gfResponse.statusText;
        gfBodyText = await gfResponse.text();
        const snippet = gfBodyText.substring(0, 5000).replace(/\n/g, ' ');

        if (!gfResponse.ok) {
          console.error(`[CONTACT_FORM] Google Form submit failed (HTTP Error)`);
          console.error(`[CONTACT_FORM] Status: ${gfStatus} ${gfStatusText}`);
          console.error(`[CONTACT_FORM] Response Body Snippet: ${snippet}`);

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
          console.log("[CONTACT_FORM] Google Form HTTP POST complete with status 200 (Proceeding to content verification)");
        }
      } catch (gfError: any) {
        console.error("[CONTACT_FORM] Google Form submit failed (Fetch Exception)");
        console.error(`[CONTACT_FORM] Error Message: ${gfError.message}`);
      }
    } else {
      console.log("[CONTACT_FORM] GOOGLE_FORM_ACTION_URL is not set, skipping Google Form integration.");
    }
    // =========================================================================

    console.log("[CONTACT_FORM] Process complete. emailSendSuccess:", emailSendSuccess, "googleFormSuccess:", googleFormSuccess);

    // 구글 폼 연동이 시도된 경우 strict 검증 수행
    if (googleFormAttempted) {
      const successKeywords = [
        "제출되었습니다",
        "응답이 기록되었습니다",
        "기록되었습니다",
        "Your response has been recorded",
        "has been recorded"
      ];
      
      const isRecorded = successKeywords.some(keyword => gfBodyText.includes(keyword));
      
      const isOk = gfStatus >= 200 && gfStatus < 300;
      
      if (isOk && isRecorded) {
        googleFormSuccess = true;
        console.log("[CONTACT_FORM] Google Form submission verified successfully (recorded).");
      } else {
        googleFormSuccess = false;
        console.error(`[CONTACT_FORM] Google Form submit verification failed`);
        console.error(`- Response Status: ${gfStatus} ${gfStatusText}`);
        console.error(`- Success keywords match: ${isRecorded}`);
        console.error(`- Response Body snippet:\n${gfBodyText.substring(0, 15000)}`);
        
        const errorDetail = `구글 응답 코드: ${gfStatus || '없음'} (${gfStatusText || '없음'}), 본문 내 성공 문구 미검출`;
        return NextResponse.json(
          { 
            error: `신청서 데이터 구글 시트 적재에 실패했습니다. (상세: ${errorDetail})`,
            debugEnvUrl: ACTUAL_ENV_URL
          },
          { status: 500 }
        );
      }
    }

    if (googleFormSuccess || (!googleFormAttempted && emailSendSuccess)) {
      return NextResponse.json({ 
        success: true,
        debugEnvUrl: ACTUAL_ENV_URL
      });
    } else {
      const detailError = `이메일 발송 실패(${emailErrorMsg || '오류없음'}) / 구글폼 전송 실패(${googleFormAttempted ? '실패' : '연동 주소 없음'})`;
      return NextResponse.json(
        { 
          error: `신청 처리에 실패했습니다. (${detailError})`,
          debugEnvUrl: ACTUAL_ENV_URL
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Contact Error:', error);
    return NextResponse.json(
      { error: '서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
