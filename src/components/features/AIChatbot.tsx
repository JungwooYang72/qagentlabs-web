"use client";

import React, { useState } from "react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 99999 }}>
      {isOpen ? (
        <div style={{
          width: "320px", height: "450px", backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb", borderRadius: "16px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          display: "flex", flexDirection: "column", overflow: "hidden"
        }}>
          {/* 챗봇 헤더 */}
          <div style={{ backgroundColor: "#0f172a", color: "#ffffff", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: "bold", fontSize: "16px" }}>QAgent Labs AI</span>
            <button onClick={() => setIsOpen(false)} style={{ background: "none", border: "none", color: "#ffffff", cursor: "pointer", fontSize: "18px" }}>✕</button>
          </div>
          {/* 챗봇 내용 */}
          <div style={{ padding: "20px", flex: 1, color: "#334155", backgroundColor: "#f8fafc", fontSize: "15px", lineHeight: "1.6" }}>
            안녕하세요, 대표님!<br />
            QAgent Labs 챗봇 시스템이 정상적으로 연결되었습니다.
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: "64px", height: "64px", borderRadius: "50%",
            backgroundColor: "#0f172a", color: "#ffffff", border: "none",
            cursor: "pointer", boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px",
            transition: "transform 0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          💬
        </button>
      )}
    </div>
  );
}