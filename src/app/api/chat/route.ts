import { NextResponse } from "next/server";
import { classifyIntent, getRecommendation, retrieveContext, Intent, retrieveDriverContext } from "@/lib/rag/retriever";
import { callbackAvailable } from "@/lib/machinecare-callback-store";
import { MACHINECARE_PROMPT, machineCareGuard } from "@/lib/machinecare-chat";
import { isMachineCareInquiry, MACHINECARE_INQUIRIES } from "@/lib/machinecare";

const DRIVER_SYSTEM_PROMPT = `당신은 QAgent Driver Hub의 공식 안내 도우미입니다.
QAgent Driver Hub 449는 Google Play 프로덕션 출시 버전이며 카카오T·티맵·콜마너를 지원합니다.
Driver Hub는 콜 정보를 분석해 설정한 조건에 맞는 콜을 표시합니다. 표시된 마커·큰 오버레이는 기사님이 직접 누르는 버튼이며, 각 화면의 콜 선택·확인·수락 단계를 직접 진행합니다.
449 개선사항: 콜 판정과 화면 반응 속도 개선, 콜 선택·확인·수락 연결 보완, 확인·수락 버튼 선택 정확도 개선, 종료된 콜의 마커·오버레이 표시 정리 보완.
한국시간 2026년 10월 15일까지 무료 이용, 10월 16일 낮 12시부터 유료 전환입니다. 세 지원 앱 모두 동일합니다.
정상 월요금 / 10월 첫 이용료: 1개 앱 10,000원 / 5,000원, 원하는 2개 앱 15,000원 / 7,500원, 3개 앱 모두 20,000원 / 10,000원. 부가세 포함 최종 결제금액이며 각 플랫폼 자체 이용료와 별개입니다.
10월 첫 이용료는 10월 16일 낮 12시~10월 31일에만 적용되는 정상 월요금의 50%입니다. 11월 한 달 이용분부터 정상 월요금이 적용되며 이용기간은 매달 말일까지입니다.
설치는 Google Play에서 직접 진행하며 별도 가입이나 신청폼 작성이 필요하지 않습니다. 설치 후 앱 안내에 따라 권한을 설정합니다.
유료 이용 신청: 사용할 앱·요금 확인 → 공개 신청폼 작성 → 신청폼 안내에 따라 입금 → 관리자 입금 확인 후 신청 기기의 이용권 처리.
공개 신청폼: https://docs.google.com/forms/d/e/1FAIpQLSdoOx1vYngc1WGnwtMJbbCySueqEeyJ5RNnALabxhissJb1ag/viewform
Google Play 설치·업데이트: https://play.google.com/store/apps/details?id=com.qagentlabs.supernova.v2
설치·사용법 / 카페: https://cafe.naver.com/qagentlabs
신청 정보는 이름, 휴대폰 번호, 기기 승인 코드(콜ID), 사용할 앱입니다. 앱 설정의 ‘기기 승인 코드 복사’를 눌러 신청폼에 붙여넣습니다.
신청만으로 결제가 완료되지는 않습니다. 계좌와 송금 방법은 신청폼에서 확인합니다. 휴대폰 변경이나 앱 재설치 시 관리자에게 비공개로 문의합니다. 개인정보·기기 승인 코드는 카페 댓글 대신 신청폼에 입력합니다.
현재 기능·449 개선사항·이용료·일정·신청 방법과 공식 링크만 안내합니다. 향후 기능 출시, 전국 지원 확대, 개인 운행기록·분석, 추가 기능 요금표·체험·예약을 안내하지 않습니다.
자동수락·자동 연속 클릭·배정 보장으로 설명하지 않습니다. 검증되지 않은 속도 배수·수입 증가 수치나 픽업거리 제한 확대·해제 권고를 하지 않습니다.
공개 답변에 계좌번호, 관리자용 폼 편집 링크나 응답 시트 링크를 넣지 않습니다.`;

const COMPANY_PROMPT = (contextString: string) => `당신은 'QAgentLabs'의 공식 컨설턴트 겸 AI 어시스턴트입니다.
컨설턴트처럼 전문적으로 방향을 제시하며, 너무 사과하거나 회피하지 말고 짧고 명확하게 답변하세요.

[답변 정책]
1. 사용자의 질문이 QAgentLabs 서비스 범위와 관련되어 있으면, Context 내에서 가장 가까운 서비스와 연결하여 먼저 적극적으로 설명하세요.
2. 사용자의 상황에 맞는 관련 플랜을 추천하세요:
   - 1인/초기 셀러 → Lite
   - 상품 수 증가/운영 자동화 → Starter
   - 여러 채널/팀 운영 → Business
   - ERP/내부 시스템 연동 → Enterprise
3. 사용자가 언급한 업무를 당사 서비스(예: 상품 데이터 정리, 반복 업무 자동화, 리포트 자동 생성 등)와 연결해서 설명하세요.
4. 부족한 정보는 답변 마지막에 자연스러운 보조 질문 1개로만 물어보세요. (예: "현재 상품 수와 판매 채널을 알려주시면 더 정확히 추천드릴 수 있습니다.")
5. RAG 검색 결과가 부족해도 서비스 카테고리와 관련된 질문이면 먼저 방향성을 제시하는 Fallback 답변을 생성하세요. (예: "말씀하신 업무는 운영 자동화 영역에 해당하며, Starter 또는 Business에서 검토할 수 있습니다.")

[방어적 문구 사용 제한]
"현재 제공된 정보로는 확정적으로 안내드리기 어렵습니다", "확인이 어렵습니다", "문의를 남겨주시면..." 등의 방어적 문구는 남발하지 마세요.
이 문구들은 오직 아래의 5가지 경우에만 사용하세요:
1) 구체적인 가격/견적
2) 매출/성과 보장 여부
3) 특정 고객사/파트너십 존재 여부
4) 외부에 공개되지 않은 특수 기능이나 개발 일정
5) 당사 업무 자동화 서비스와 명확히 무관하여 방향성 제안조차 불가능한 경우

[엄격한 정책 - Hallucination 금지]
1. 경쟁사를 비방하거나, 성과/매출을 보장하는 표현은 금지합니다.
2. 네이버 공식 파트너나 삼성 협업 등 문서에 없는 허위 사실은 절대 생성하지 마세요.

[회사 정보 Context]
${contextString ? contextString : "현재 관련된 상세 정보가 검색되지 않았습니다. 하지만 서비스 관련 질문이라면 가장 가까운 자동화 플랜 방향성을 제안해 주세요."}`;

type ChatMessage = { role: "user" | "assistant"; content: string };
function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
export const maxDuration = 60;
export async function POST(req: Request) {
  try {
    const body: unknown = await req.json();
    if (!isRecord(body) || !Array.isArray(body.messages) || body.messages.length > 24) {
      return NextResponse.json({ error: "상담 내용을 확인해 주세요." }, { status: 400 });
    }
    const service = body.service ?? (body.mode === "driver" ? "driver" : "company");
    if (!["company", "machinecare", "driver"].includes(String(service)) ||
        (body.mode !== undefined && !["driver", "automation"].includes(String(body.mode))) ||
        (body.service !== undefined && body.mode !== undefined &&
          ((service === "driver") !== (body.mode === "driver") || service === "machinecare"))) {
      return NextResponse.json({ error: "지원하지 않는 상담 맥락입니다." }, { status: 400 });
    }
    const messages: ChatMessage[] = [];
    for (const item of body.messages) {
      if (!isRecord(item)) return NextResponse.json({ error: "잘못된 상담 내용입니다." }, { status: 400 });
      if (item.role === "system") continue; // Only the server selects system instructions.
      if (!["user", "assistant"].includes(String(item.role)) || typeof item.content !== "string" || item.content.length > 4000) {
        return NextResponse.json({ error: "상담 내용을 4,000자 이내로 입력해 주세요." }, { status: 400 });
      }
      messages.push({ role: item.role as ChatMessage["role"], content: item.content });
    }
    const lastUserMessage = messages.findLast(m => m.role === "user")?.content.trim();
    if (!lastUserMessage) return NextResponse.json({ error: "질문을 입력해 주세요." }, { status: 400 });
    let systemPrompt: string;
    let sources: string[] = [];
    let recommendedPlan: string | null = null;
    if (service === "machinecare") {
      const inquiry = body.inquiry ?? "pc";
      if (!isMachineCareInquiry(inquiry)) return NextResponse.json({ error: "문의 구분을 확인해 주세요." }, { status: 400 });
      const acceptingCallbacks = await callbackAvailable();
      const guarded = machineCareGuard(lastUserMessage, inquiry, messages.filter(m => m.role === "user").length === 1, acceptingCallbacks);
      if (guarded) return NextResponse.json({ reply: guarded, sources: ["MachineCare 공개 안내"], service });
      systemPrompt = MACHINECARE_PROMPT + "\n[현재 접수 상태]\n" + (acceptingCallbacks ? "콜백 접수 가능. 문의 양식에서 5개 필수 정보를 확인한 뒤 최종 제출합니다. 본부에서 확인 후 담당자 수동 배정. 방문 예약 확정 아님." : "콜백 접수 준비 중. 문의 안내에서 검토한 메모로 이메일을 작성하고 메일 앱에서 직접 전송합니다. 웹 접수 성공으로 안내하지 않습니다.") + "\n[현재 상담 분기]\n" + MACHINECARE_INQUIRIES[inquiry];
      sources = ["MachineCare 공개 안내"];
    } else if (service === "driver") {
      const driver = retrieveDriverContext(lastUserMessage);
      systemPrompt = DRIVER_SYSTEM_PROMPT + "\n[참고 FAQ]\n" + driver.contextString;
      sources = driver.sources;
    } else {
      if (/machinecare|머신케어|PC 점검/i.test(lastUserMessage)) {
        return NextResponse.json({ reply: "QAgent MachineCare는 고객 Windows PC의 현장 점검·보고서와 기사 업무 관리를 연결하는 사업으로, 현재 현장 운영 준비 중 · 서비스 도입 및 제휴 상담 단계입니다. 다운로드나 기사 로그인은 공개하지 않습니다. /machinecare 페이지에서 PC 증상, 기업 PC 관리, 수리점·기사 도입/제휴를 구분해 새 상담을 시작할 수 있습니다.", sources: ["MachineCare 서비스 개요"], service });
      }
      const intent = classifyIntent(lastUserMessage);
      if (intent === Intent.DANGER || intent === Intent.UNRELATED) {
        return NextResponse.json({ reply: "QAgentLabs 서비스 관련 문의를 안내합니다. 어떤 서비스를 찾으시는지 알려주세요.", sources: [] });
      }
      recommendedPlan = getRecommendation(lastUserMessage);
      const company = retrieveContext(lastUserMessage, intent);
      const contextString = company.contextString;
      sources = company.sources;
      systemPrompt = COMPANY_PROMPT(contextString);
    }
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) return NextResponse.json({ error: "상담 연결을 준비 중입니다. 회사 문의를 이용해 주세요." }, { status: 503 });
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + apiKey },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        temperature: 0.3,
        max_tokens: 700,
      }),
      signal: AbortSignal.timeout(45000),
    });
    if (!response.ok) return NextResponse.json({ error: "상담 연결이 지연되고 있습니다. 잠시 후 다시 시도하거나 회사 문의를 이용해 주세요." }, { status: 502 });
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) return NextResponse.json({ error: "상담 답변을 받지 못했습니다." }, { status: 502 });
    return NextResponse.json({ reply, sources, recommendedPlan, service });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof SyntaxError ? "요청 형식을 확인해 주세요." : "상담 연결을 완료하지 못했습니다. 회사 문의를 이용해 주세요." }, { status: error instanceof SyntaxError ? 400 : 502 });
  }
}
