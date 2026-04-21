"use client";

import React, { useState, useRef, useEffect } from "react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    { sender: "ai", text: "안녕하세요, 대표님! QAgent Labs 챗봇 시스템 UI가 정상적으로 작동합니다. 무엇을 테스트해 볼까요?" }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 대화가 추가될 때마다 스크롤을 맨 아래로 부드럽게 이동
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // 1. 사용자 입력 메시지 추가
    setMessages((prev) => [...prev, { sender: "user", text: inputValue }]);
    setInputValue("");

    // 2. 가상의 AI 응답 (추후 여기에 실제 LLM API 연동)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "현재 프론트엔드 기능 테스트 중입니다. 향후 백엔드 API가 연결되면 이곳에서 실제 AI가 답변을 생성합니다." }
      ]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 99999 }}>
      {isOpen ? (
        <div style={{
          width: "350px", height: "500px", backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb", borderRadius: "16px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
          display: "flex", flexDirection: "column", overflow: "hidden"
        }}>
          {/* 헤더 */}
          <div style={{ backgroundColor: "#0f172a", color: "#ffffff", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: "bold", fontSize: "16px" }}>QAgent Labs AI</span>
            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", fontSize: "18px" }}>✕</button>
          </div>

          {/* 대화창 (메시지 리스트) */}
          <div style={{ flex: 1, padding: "16px", overflowY: "auto", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column", gap: "12px" }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.sender === "user" ? "#0f172a" : "#e2e8f0",
                color: msg.sender === "user" ? "#ffffff" : "#334155",
                padding: "10px 14px", borderRadius: "12px", maxWidth: "80%",
                fontSize: "14px", lineHeight: "1.5"
              }}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* 입력창 영역 */}
          <div style={{ padding: "16px", backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb", display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="메시지를 입력하세요..."
              style={{
                flex: 1, padding: "10px 14px", borderRadius: "8px",
                border: "1px solid #cbd5e1", outline: "none", fontSize: "14px",
                color: "#0f172a"
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                backgroundColor: "#0f172a", color: "#ffffff", border: "none",
                borderRadius: "8px", padding: "0 16px", cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              전송
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: "64px", height: "64px", borderRadius: "50%",
            backgroundColor: "#0f172a", color: "#ffffff", border: "none",
            cursor: "pointer", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px"
          }}
        >
          💬
        </button>
      )}
    </div>
  );
}