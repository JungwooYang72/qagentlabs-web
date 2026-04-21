import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // 1. 딥시크 API 키 로드
        const apiKey = process.env.DEEPSEEK_API_KEY;
        const apiUrl = "https://api.deepseek.com/chat/completions";

        if (!apiKey) {
            return NextResponse.json({ error: "딥시크 API 키가 설정되지 않았습니다." }, { status: 500 });
        }

        // 2. 딥시크 서버로 직접 요청 발송
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: messages,
                temperature: 0.7,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "딥시크 API 요청 실패");
        }

        // 3. 딥시크의 답변을 프론트엔드로 전달
        return NextResponse.json({ reply: data.choices[0].message.content });
    } catch (error: any) {
        console.error("DeepSeek API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}