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

        // 6. System Prompt 강화 (Hallucination Guard)
        const systemPrompt = `당신은 'QAgentLabs'의 공식 상담 AI 어시스턴트입니다.
반드시 아래 제공된 [회사 정보 Context]만을 기반으로 사실적이고 신뢰감 있는 비즈니스 톤으로 답변하세요.

[엄격한 정책 - Hallucination 금지]
1. 검색된 Context에 없는 내용은 절대 추측하거나 지어내지 마세요.
2. 경쟁사를 비방하거나, 성과/매출을 보장하는 표현은 금지합니다.
3. 네이버 공식 파트너나 삼성 협업 등 문서에 없는 허위 사실은 절대 생성하지 마세요.
4. 구체적인 견적은 추측하지 마세요. (상담을 통해 결정됨을 안내)

[회사 정보 Context]
${contextString ? contextString : "현재 관련된 상세 정보가 검색되지 않았습니다."}

모르는 내용이거나 Context에 없는 내용일 경우 반드시 아래와 같이 응답하세요:
"해당 내용은 확정적으로 안내드리기 어렵습니다. 문의를 남겨주시면 담당자가 확인 후 상세히 안내해 드리겠습니다."

항상 답변의 마무리는 상담 유도형 CTA로 끝내주세요. (예: 현재 운영 규모를 알려주시겠어요?, 자동화하고 싶은 업무가 있으신가요?)`;

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