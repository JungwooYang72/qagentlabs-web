"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

type Message = {
  id: string;
  sender: "ai" | "user";
  text: string;
};

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      sender: "ai",
      text: "안녕하세요, 퀀텀 지능으로 비즈니스를 혁신하는 큐에이전트랩스입니다. 무엇을 도와드릴까요?",
    },
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg: Message = { id: Date.now().toString(), sender: "user", text: inputMsg.trim() };
    setMessages((prev) => [...prev, newMsg]);
    setInputMsg("");
    setIsTyping(true);

    try {
      // Prepared API logic connection to /api/chat
      // This is a placeholder payload pattern
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMsg.text }),
      });
      
      let aiText = "답변을 가져올 수 없습니다. 시스템 연결을 확인해주세요.";
      
      if (response.ok) {
        const data = await response.json();
        // Assume API returns { reply: string }
        if (data && data.reply) {
          aiText = data.reply;
        } else {
          aiText = "(Placeholder logic connected. Backend needs implementation.)";
        }
      } else {
         // Fallback response for purely UI dev stage when API is pending
         aiText = "(API 연동 대기중) 문의 감사드립니다. 곧 백엔드가 준비될 예정입니다.";
      }
      
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: "ai", text: aiText },
      ]);
    } catch (error) {
      console.error("Chat API error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "에러가 발생했습니다. 나중에 다시 시도해주세요.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-background/80 backdrop-blur-xl border border-border shadow-2xl rounded-2xl overflow-hidden flex flex-col transition-all duration-300 pointer-events-auto">
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex justify-between items-center text-primary-foreground border-b border-white/10">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-accent" />
              <span className="font-semibold text-sm">QAgent AI (Beta)</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div
            ref={scrollRef}
            className="flex-1 p-4 overflow-y-auto min-h-[300px] max-h-[400px] bg-background/40 flex flex-col gap-4 text-sm"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                    msg.sender === "user"
                      ? "bg-accent text-accent-foreground rounded-tr-sm"
                      : "bg-muted border border-border text-foreground rounded-tl-sm"
                  }`}
                  style={{ wordBreak: "break-word" }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-muted border border-border text-foreground rounded-tl-sm flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-card border-t border-border">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="질문을 입력해주세요..."
                className="w-full bg-muted/50 border border-border rounded-full py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button
                type="submit"
                disabled={!inputMsg.trim() || isTyping}
                className="absolute right-1.5 bg-accent/20 hover:bg-accent/40 text-accent p-1.5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-accent/10 hover:bg-accent/20 border border-accent/30 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)] flex items-center justify-center transition-all duration-300 hover:scale-105 pointer-events-auto group relative"
      >
        <div className="absolute inset-0 rounded-full bg-accent/5 animate-ping opacity-75"></div>
        {isOpen ? (
          <X className="w-6 h-6 text-accent group-hover:text-accent/80 transition-colors relative z-10" />
        ) : (
          <MessageCircle className="w-6 h-6 text-accent group-hover:text-accent/80 transition-colors relative z-10" />
        )}
      </button>
    </div>
  );
}
