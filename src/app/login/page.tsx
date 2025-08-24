"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // ✅ 로그인 성공 가정
    localStorage.setItem("loggedIn", "true");
    router.push("/");
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
          maxWidth: 400, // ✅ 날씬하게
          background: "#fff",
          padding: "30px 24px",
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 20 }}>
          로그인
        </h1>

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
            onClick={() => router.push("/signup")}   // ✅ 여기 /register → /signup 으로 변경
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