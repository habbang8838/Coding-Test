"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: pw }),
      });

      const data = await res.json();

      if (!data.success) {
        setErr(data.error || "로그인 실패");
        alert(data.error || "로그인 실패");
        return;
      }

      // ✅ 로그인 성공 → 시험 ID 생성 후 이동
      const yyyymm = dayjs().format("YYYYMM");
      const examId = `coding_test_${yyyymm}`;

      router.push(`/exam/${examId}/lobby`);
    } catch (error) {
      console.error("로그인 요청 오류:", error);
      setErr("서버 오류 발생");
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f1f5f9",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#fff",
          padding: "30px 24px",
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20 }}>로그인</h1>

        <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
          이메일
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: 6,
            border: "1px solid #ccc",
            marginBottom: 14,
          }}
          required
        />

        <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
          비밀번호
        </label>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: 6,
            border: "1px solid #ccc",
            marginBottom: 20,
          }}
          required
        />

        {err && (
          <p style={{ color: "red", fontSize: 14, marginBottom: 10 }}>{err}</p>
        )}

        {/* 버튼 줄 */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: 6,
              background: "#2563eb",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            로그인
          </button>
          <button
            type="button"
            onClick={() => router.push("/signup")}
            style={{
              padding: "8px 16px",
              border: "1px solid #2563eb",
              borderRadius: 6,
              background: "#fff",
              color: "#2563eb",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}