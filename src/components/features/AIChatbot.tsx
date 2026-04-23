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
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const apiMessages = [
        {
          role: "system",
          content: `당신은 'QAgent Labs'의 공식 AI 어시스턴트입니다. 항상 정중하고 전문적으로 답변하세요.
          [회사 핵심 정체성]
          - QAgent Labs는 AI가 스스로 판단하고 업무를 수행하는 '지능형 자동화 에이전트' 솔루션 전문 기업입니다.
          [주요 사업]
          1. 지능형 업무 자동화: 사람이 반복적으로 수행하던 비즈니스 워크플로우를 AI 에이전트가 자율적으로 처리하는 시스템 구축.
          2. 차세대 엔지니어링 솔루션 (준비 중): 3D MEP(기계/전기/배관) 설계 자동화를 연구 중.`
        },
        ...messages.map(m => ({
          role: m.sender === "ai" ? "assistant" : "user",
          content: m.text
        })),
        { role: "user", content: userText }
      ];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "ai", text: data.choices[0].message.content }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "ai", text: "죄송합니다. 메시지 전송 중 오류가 발생했습니다." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "30px",
      right: "30px",
      zIndex: 999999,
      display: "block" // 레이아웃 꼬임 방지
    }}>
      {isOpen ? (
        <div style={{
          width: "370px", height: "550px", backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb", borderRadius: "20px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
          display: "flex", flexDirection: "column", overflow: "hidden"
        }}>
          <div style={{ backgroundColor: "#0f172a", color: "#ffffff", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: "bold", fontSize: "18px" }}>QAgent Labs AI 상담</span>
            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", fontSize: "20px" }}>✕</button>
          </div>

          <div style={{ flex: 1, padding: "20px", overflowY: "auto", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column", gap: "15px" }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.sender === "user" ? "#0f172a" : "#e2e8f0",
                color: msg.sender === "user" ? "#ffffff" : "#334155",
                padding: "12px 16px", borderRadius: "15px", maxWidth: "85%",
                fontSize: "15px", lineHeight: "1.6", wordBreak: "keep-all"
              }}>
                {msg.text}
              </div>
            ))}
            {isLoading && <div style={{ alignSelf: "flex-start", color: "#64748b", fontSize: "14px" }}>답변 생성 중...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: "20px", backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb", display: "flex", gap: "10px" }}>
            <input
              type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown}
              placeholder="메시지를 입력하세요..."
              style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1px solid #cbd5e1", outline: "none" }}
            />
            <button onClick={handleSendMessage} style={{ backgroundColor: "#0f172a", color: "#ffffff", border: "none", borderRadius: "10px", padding: "0 20px", cursor: "pointer" }}>전송</button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setIsOpen(true)}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}
        >
          <button
            style={{
              width: "70px", height: "70px", borderRadius: "50%",
              backgroundColor: "#0f172a", color: "#ffffff", border: "none",
              cursor: "pointer", boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "32px", marginBottom: "10px",
              pointerEvents: "none" // 부모 div에서 클릭을 처리하도록 함
            }}
          >
            💬
          </button>
          <div
            style={{
              backgroundColor: "#0f172a", color: "#ffffff", fontWeight: "bold",
              padding: "10px 20px", borderRadius: "30px", fontSize: "16px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)", whiteSpace: "nowrap",
              border: "2px solid #ffffff"
            }}
          >
            궁금한것은 무엇이든 물어보세요!
          </div>
        </div>
      )}
    </div>
  );
}