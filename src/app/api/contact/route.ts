import { NextResponse } from 'next/server';

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

    let pathText = '일반 홈페이지 문의';
    let noteText = '일반 문의 접수';

    if (isDriverHub) {
      if (inquiryType === 'beta-apply') {
        pathText = 'QAgent Driver Hub 무료 베타';
        noteText = '홈페이지 Driver Hub 페이지 작성 - 베타 신청';
      } else if (inquiryType === 'feedback') {
        pathText = 'QAgent Driver Hub 오류/피드백';
        noteText = '홈페이지 Driver Hub 페이지 작성 - 오류/피드백';
      } else {
        pathText = 'QAgent Driver Hub 사용문의';
        noteText = '홈페이지 Driver Hub 페이지 작성 - 사용 문의';
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

    console.log("[CONTACT_FORM] Process complete. googleFormSuccess:", googleFormSuccess);

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
        console.error(`- Response Body snippet:\n${gfBodyText.substring(0, 1000)}`);
        
        const errorDetail = `구글 응답 코드: ${gfStatus || '없음'} (${gfStatusText || '없음'}), 본문 내 성공 문구 미검출`;
        return NextResponse.json(
          { error: `신청서 데이터 구글 시트 적재에 실패했습니다. (상세: ${errorDetail})` },
          { status: 500 }
        );
      }
    }

    if (googleFormSuccess) {
      return NextResponse.json({ success: true });
    } else {
      const detailError = `구글폼 전송 실패(${googleFormAttempted ? '실패' : '연동 주소 없음'})`;
      return NextResponse.json(
        { error: `신청 처리에 실패했습니다. (${detailError})` },
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
