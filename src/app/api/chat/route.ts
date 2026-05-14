import { NextResponse } from "next/server";
import { classifyIntent, getRecommendation, retrieveContext, Intent } from "@/lib/rag/retriever";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // 1. 유저의 마지막 메시지 추출
        const lastUserMessage = [...messages].reverse().find(m => m.role === "user")?.content || "";

        // 2. Intent Classification 및 Recommendation 계산
        const intent = classifyIntent(lastUserMessage);
        const recommendedPlan = getRecommendation(lastUserMessage);

        // 3. Development Logging
        if (process.env.NODE_ENV === 'development') {
            console.log("\n--- [RAG DEBUG LOG] ---");
            console.log(`[Query]: ${lastUserMessage}`);
            console.log(`[Intent]: ${intent}`);
            console.log(`[Recommended]: ${recommendedPlan || "None"}`);
        }

        // 4. 위험/무관 질문 사전 차단
        if (intent === Intent.DANGER || intent === Intent.UNRELATED) {
            if (process.env.NODE_ENV === 'development') console.log("[Blocked]: 정책 위반 또는 무관한 질문");
            return NextResponse.json({ 
                reply: "QAgentLabs 업무 자동화 및 서비스 관련 문의에 집중해서 안내드리고 있습니다. 자동화하고 싶으신 업무를 알려주시면 도움을 드리겠습니다.",
                sources: [] 
            });
        }

        // 5. Hybrid Retrieval & Dynamic Budget
        const { contextString, sources } = retrieveContext(lastUserMessage, intent);
        
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Sources]: ${sources.join(", ")}`);
            console.log("-----------------------\n");
        }

        // 6. System Prompt 강화 (Consultative Tone & Hallucination Guard)
        const systemPrompt = `당신은 'QAgentLabs'의 공식 컨설턴트 겸 AI 어시스턴트입니다.
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

        // 5. 프론트엔드에서 넘어온 messages 배열을 조작하여 System Prompt 교체
        const augmentedMessages = messages.map((m: any) => {
            if (m.role === "system") {
                return { ...m, content: systemPrompt };
            }
            return m;
        });

        // (기존 시스템 프롬프트가 없을 경우 대비)
        if (!augmentedMessages.some((m: any) => m.role === "system")) {
            augmentedMessages.unshift({ role: "system", content: systemPrompt });
        }

        const apiKey = process.env.DEEPSEEK_API_KEY;

        console.log("=========================================");
        console.log("컴퓨터가 잡아챈 키:", apiKey ? `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}` : "🚨키를 아예 못 찾음 (undefined)🚨");
        console.log("=========================================");

        const apiUrl = "https://api.deepseek.com/chat/completions";

        if (!apiKey) {
            return NextResponse.json({ error: "서버가 API 키를 찾지 못했습니다." }, { status: 500 });
        }

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: augmentedMessages,
                temperature: 0.3, // Hallucination 최소화를 위해 온도 낮춤
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "딥시크 API 요청 실패");
        }

        // 8. 응답 반환 (Optional하게 sources 및 recommendedPlan 포함)
        return NextResponse.json({ 
            reply: data.choices[0].message.content,
            sources: sources,
            recommendedPlan: recommendedPlan
        });
    } catch (error: any) {
        console.error("DeepSeek API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}