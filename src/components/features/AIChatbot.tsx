"use client";

import React, { useState, useRef, useEffect } from "react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "ai", text: "안녕하세요! QAgent Labs입니다." }
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
        {
          role: "system", content: `당신은 'QAgent Labs'의 공식 AI 어시스턴트입니다. 항상 정중하고 전문적으로 답변하세요.

  [회사 핵심 정체성]
  - QAgent Labs는 단순한 챗봇을 넘어, AI가 스스로 판단하고 업무를 수행하는 '지능형 자동화 에이전트' 솔루션 전문 기업입니다.
  
  [주요 사업 및 서비스]
  1. 지능형 업무 자동화 (현재 주력): 
     - 사람이 반복적으로 수행하던 복잡한 비즈니스 워크플로우를 AI 에이전트가 자율적으로 처리하는 시스템을 구축합니다.
     - 단순 자동화를 넘어 AI가 상황을 분석하고 실행까지 완료하는 '에이전틱 자동화'에 특화되어 있습니다.
  2. 차세대 엔지니어링 솔루션 (준비 중): 
     - 3D MEP(기계/전기/배관) 설계 과정을 AI로 자동화하는 혁신적인 시스템을 개발 중입니다.

  [답변 가이드라인]
  - 사용자가 기술적 배경을 물으면 "자체적인 AI 프레임워크와 자율 실행 프로토콜을 활용한다"고 전문성 있게 답변하세요. (특정 기술명 언급 지양)
  - "사람의 수작업을 줄이고 비즈니스 효율을 극대화하는 것"이 회사의 존재 이유임을 강조하세요.
  - 아직 준비 중인 설계 자동화 서비스에 대해서는 "축적된 AI 자동화 기술을 엔지니어링 분야로 확장하고 있다"는 뉘앙스로 답변하세요.`
        },
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

  // src/components/features/AIChatbot.tsx 파일 하단부 수정

  return (
    /* 화면 우측 하단에 고정하는 스타일 */
    <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 99999 }}>
      {isOpen ? (
        /* 채팅창이 열렸을 때 (기존 코드 그대로 유지) */
        <div style={{ /* ... 기존 채팅창 스타일 ... */ }}>
          {/* ... 기존 채팅창 내용 ... */}
        </div>
      ) : (
        /* ★ 아이콘 아래 안내 문구가 상시 노출되는 상태 ★ */
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* 챗봇 아이콘 버튼 */}
          <button
            onClick={() => setIsOpen(true)}
            style={{
              width: "70px", height: "70px", borderRadius: "50%",
              backgroundColor: "#0f172a", color: "#ffffff", border: "none",
              cursor: "pointer", boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "32px", marginBottom: "10px"
            }}
          >
            💬
          </button>

          {/* 아이콘 바로 아래 큼지막한 안내 멘트 */}
          <div
            onClick={() => setIsOpen(true)}
            style={{
              backgroundColor: "#0f172a",
              color: "#ffffff",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "30px",
              fontSize: "16px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              cursor: "pointer",
              whiteSpace: "nowrap",
              border: "2px solid #ffffff"
            }}
          >
            궁금한 점은 무엇이든 물어보세요!
          </div>
        </div>
      )}
    </div>
  );