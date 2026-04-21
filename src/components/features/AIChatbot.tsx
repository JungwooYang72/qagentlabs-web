"use client";
import React, { useState } from "react";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: "30px", right: "30px", zIndex: 99999 }}>
      {isOpen ? (
        <div style={{ width: "300px", height: "400px", backgroundColor: "white", border: "1px solid #ccc", borderRadius: "10px", padding: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "10px" }}>
            <strong style={{ color: "black" }}>QAgent Labs AI</strong>
            <button onClick={() => setIsOpen(false)} style={{ color: "black", cursor: "pointer" }}>X</button>
          </div>
          <div style={{ color: "black" }}>안녕하세요! QAgent Labs입니다. 무엇을 도와드릴까요?</div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          style={{ width: "60px", height: "60px", borderRadius: "30px", backgroundColor: "#0070f3", color: "white", border: "none", cursor: "pointer", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", fontSize: "24px" }}
        >
          💬
        </button>
      )}
    </div>
  );
}
