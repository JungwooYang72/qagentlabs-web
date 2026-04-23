"use client";

import React, { useState, useRef, useEffect } from "react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: "ai", text: "안녕하세요! QAgent Labs입니다. 무엇을 도와드릴까요?" }]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `당신은 'QAgent Labs'의 공식 AI 어시스턴트입니다. 항상 정중하고 전문적으로 답변하세요.

              [회사 핵심 정체성]
              - QAgent Labs는 AI가 스스로 판단하고 업무를 수행하는 '지능형 자동화 에이전트' 솔루션 전문 기업입니다.
              
              [주요 사업 및 서비스]
              1. 지능형 업무 자동화: 사람이 반복적으로 수행하던 복잡한 비즈니스 워크플로우를 AI 에이전트가 자율적으로 처리하는 시스템을 구축합니다. (OpenClaw 등 자율 실행 프로토콜 활용)
              2. 차세대 엔지니어링 솔루션 (준비 중): 3D MEP(기계/전기/배관) 설계 과정을 AI로 자동화하는 혁신적인 시스템을 개발 중입니다.

              [답변 가이드라인]
              - 기술적 배경을 물으면 "자체적인 AI 프레임워크와 자율 실행 프로토콜을 활용한다"고 전문성 있게 답변하세요.
              - "사람의 수작업을 줄이고 비즈니스 효율을 극대화하는 것"이 회사의 존재 이유임을 강조하세요.
              - 3D MEP 설계에 대해서는 "축적된 AI 자동화 기술을 엔지니어링 분야로 확장하고 있다"고 언급하세요.
              - 답변은 항상 간결하면서도 신뢰감 있게 작성하세요.`
            },
            ...messages.map(m => ({ role: m.sender === "ai" ? "assistant" : "user", content: m.text })),
            { role: "user", content: userText }
          ]
        }),
      });

      if (!response.ok) throw new Error(`서버 응답 오류: ${response.status}`);

      const data = await response.json();

      // ★ 어떤 데이터 구조로 오든 텍스트를 추출하는 유연한 로직
      let aiResponse = "";
      if (data.choices?.[0]?.message?.content) {
        aiResponse = data.choices[0].message.content;
      } else if (data.message) {
        aiResponse = data.message;
      } else if (typeof data === 'string') {
        aiResponse = data;
      } else {
        aiResponse = "답변 데이터 형식을 해석할 수 없습니다. 서버 설정을 확인해주세요.";
      }

      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);

    } catch (error: any) {
      console.error("Chat Error:", error);
      setMessages((prev) => [...prev, { sender: "ai", text: `오류가 발생했습니다: ${error.message}. 잠시 후 다시 시도해주세요.` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 999999 }}>
      {!isOpen ? (
        <div
          style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
          onClick={() => setIsOpen(true)}
        >
          <div style={{
            width: "70px", height: "70px", borderRadius: "50%",
            backgroundColor: "#0f172a", color: "#ffffff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "32px", marginBottom: "10px", boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
          }}>💬</div>
          <div style={{
            backgroundColor: "#0f172a", color: "#ffffff", fontWeight: "bold",
            padding: "10px 22px", borderRadius: "30px", fontSize: "16px",
            border: "2px solid #ffffff", boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            whiteSpace: "nowrap"
          }}>무엇이든 물어보세요!</div>
        </div>
      ) : (
        <div style={{
          width: "370px", height: "550px", backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb", borderRadius: "20px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
          display: "flex", flexDirection: "column", overflow: "hidden"
        }}>
          <div style={{ backgroundColor: "#0f172a", color: "#ffffff", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: "bold", fontSize: "16px" }}>QAgent Labs AI 상담</span>
            <button
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
              style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", fontSize: "20px" }}
            >✕</button>
          </div>

          <div style={{ flex: 1, padding: "20px", overflowY: "auto", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column", gap: "12px" }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.sender === "user" ? "#0f172a" : "#e2e8f0",
                color: msg.sender === "user" ? "#ffffff" : "#334155",
                padding: "12px 16px", borderRadius: "15px", maxWidth: "85%",
                fontSize: "14px", lineHeight: "1.5", wordBreak: "keep-all"
              }}>
                {msg.text}
              </div>
            ))}
            {isLoading && <div style={{ alignSelf: "flex-start", color: "#64748b", fontSize: "13px" }}>답변 준비 중...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div
            style={{ padding: "15px", borderTop: "1px solid #e5e7eb", display: "flex", gap: "8px", backgroundColor: "#ffffff" }}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text" value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="메시지를 입력하세요..."
              style={{ flex: 1, padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", color: "#000" }}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              style={{ backgroundColor: "#0f172a", color: "#ffffff", border: "none", borderRadius: "8px", padding: "0 15px", cursor: "pointer", fontWeight: "bold" }}
            >
              전송
            </button>
          </div>
        </div>
      )}
    </div>
  );
}