import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // Vercel 환경 변수에서 딥시크 API 키를 가져옵니다.
        const apiKey = process.env.DEEPSEEK_API_KEY;
        const apiUrl = "https://api.deepseek.com/chat/completions";

        if (!apiKey) {
            return NextResponse.json({ error: "딥시크 API 키가 설정되지 않았습니다." }, { status: 500 });
        }

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "deepseek-chat", // 딥시크 공식 모델명
                messages: messages,
                temperature: 0.7,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "딥시크 API 요청 실패");
        }

        return NextResponse.json({ reply: data.choices[0].message.content });
    } catch (error: any) {
        console.error("DeepSeek API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}