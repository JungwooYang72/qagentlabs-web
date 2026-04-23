import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();

        // ★ 꿩 대신 닭(OpenClaw) 코드를 완전히 삭제하고, 오직 DeepSeek만 바라보게 만듭니다.
        const apiKey = process.env.DEEPSEEK_API_KEY;

        // ★ [탐지기] 서버가 도대체 무슨 키를 들고 있는지 터미널에 출력합니다. (보안상 앞뒤 4글자만)
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