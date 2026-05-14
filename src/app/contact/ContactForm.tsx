"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (_) {
          errorData = { error: "Failed to send message (Status: " + response.status + ")" };
        }
        throw new Error(errorData.error || "Unknown server error");
      }
      
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || "Unknown error occurred");
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === "success" && (
        <div className="p-4 bg-green-50 text-green-800 border border-green-200 rounded-md text-sm">
          문의가 정상적으로 접수되었습니다.<br/>
          확인 후 빠르게 답변드리겠습니다.
        </div>
      )}
      
      {status === "error" && (
        <div className="p-4 bg-red-50 text-red-800 border border-red-200 rounded-md text-sm break-all">
          <strong>문의 전송에 실패했습니다.</strong><br/>
          <span className="text-xs mt-1 mb-2 block opacity-80">사유: {errorMessage.includes('서버 환경변수') || errorMessage.includes('서버 설정') ? '서버 시스템 설정 오류' : '일시적인 서버 문제 또는 네트워크 오류'}</span>
          문제가 지속될 경우 연락처 섹션의 이메일 버튼을 직접 이용해주세요.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium">First name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium">Last name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            disabled={isSubmitting}
            className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">Work email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={isSubmitting}
          className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
          placeholder="name@company.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium">Subject</label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          disabled={isSubmitting}
          className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
          placeholder="문의 제목을 입력해주세요"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          disabled={isSubmitting}
          className="flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
          placeholder="How can we help? (문의 내용을 입력해주세요)"
        ></textarea>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "전송 중..." : "Submit Inquiry"}
      </Button>
    </form>
  );
}
