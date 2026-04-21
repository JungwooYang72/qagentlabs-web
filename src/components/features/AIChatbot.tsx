"use client";

import React, { useState, useRef, useEffect } from "react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "안녕하세요! QAgent Labs입니다. (DeepSeek 연결 완료)" }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue("");
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setIsLoading(true);

    try {
      const apiMessages = [
        { role: "system", content: "당신은 QAgent Labs의 전문적이고 친절한 AI 어시스턴트입니다." },
        ...messages.map(m => ({
          role: m.sender === "ai" ? "assistant" : "user",
          content: m.text
        })),
        { role: "user", content: userText }
      ];

      // 딥시크가 연결된 백엔드 라우트로 요청 발송
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages })
      });

      const data = await response.json();

      if (response.ok && data.reply) {
        setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { sender: "ai", text: "⚠️ 딥시크 서버와 연결 중 오류가 발생했습니다." }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "ai", text: "⚠️ 네트워크 통신 에러가 발생했습니다." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
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
          <div style={{ backgroundColor: "#0f172a", color: "#ffffff", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: "bold", fontSize: "16px" }}>QAgent Labs (DeepSeek)</span>
            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", fontSize: "18px" }}>✕</button>
          </div>

          <div style={{ flex: 1, padding: "16px", overflowY: "auto", backgroundColor: "#f8fafc", display: "flex", flexDirection: "column", gap: "12px" }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.sender === "user" ? "#0f172a" : "#e2e8f0",
                color: msg.sender === "user" ? "#ffffff" : "#334155",
                padding: "10px 14px", borderRadius: "12px", maxWidth: "80%",
                fontSize: "14px", lineHeight: "1.5", wordBreak: "keep-all"
              }}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: "flex-start", backgroundColor: "#e2e8f0", color: "#334155", padding: "10px 14px", borderRadius: "12px", fontSize: "14px", fontStyle: "italic" }}>
                딥시크가 생각 중입니다...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: "16px", backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb", display: "flex", gap: "8px" }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="메시지를 입력하세요..."
              disabled={isLoading}
              style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", outline: "none", fontSize: "14px", color: "#0f172a" }}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              style={{ backgroundColor: isLoading ? "#94a3b8" : "#0f172a", color: "#ffffff", border: "none", borderRadius: "8px", padding: "0 16px", cursor: isLoading ? "not-allowed" : "pointer", fontWeight: "bold" }}
            >
              전송
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#0f172a", color: "#ffffff", border: "none", cursor: "pointer", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}
        >
          💬
        </button>
      )}
    </div>
  );
}