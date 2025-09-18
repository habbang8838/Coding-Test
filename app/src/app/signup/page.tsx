"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// 한국 시간 기준 YYYY-MM-DD
function formatDate(d: Date) {
  const offset = d.getTimezoneOffset() * 60000;
  const local = new Date(d.getTime() - offset);
  return local.toISOString().split("T")[0];
}

export default function SignupPage() {
  const router = useRouter();

  const today = new Date();
  const defaultBirth = new Date(today);
  defaultBirth.setFullYear(today.getFullYear() - 25);

  const minBirth = new Date(today);
  minBirth.setFullYear(today.getFullYear() - 90);

  const maxBirth = new Date(today);
  maxBirth.setFullYear(today.getFullYear() - 10);

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
    name: "홍길동",
    birth: formatDate(defaultBirth),
  });
  const [err, setErr] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/.test(form.email)) {
      return "올바른 이메일 형식을 입력해주세요. (예: example@email.com)";
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/.test(form.password)) {
      return "비밀번호는 영문+숫자 조합 6~12자여야 합니다.";
    }
    if (form.password !== form.confirm) {
      return "비밀번호 확인이 일치하지 않습니다. 다시 입력해주세요.";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setErr(v);
      alert(v); // 규칙 위반 시 경고창
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          name: form.name,
          birth: form.birth,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setErr(data.error || "회원가입 실패");
        alert(data.error || "회원가입 실패");
        return;
      }

      alert("회원가입 완료!");
      router.push("/login");
    } catch (err) {
      setErr("서버 오류가 발생했습니다.");
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[420px] rounded-xl bg-white p-8 shadow-lg"
      >
        <h1 className="mb-6 text-center text-2xl font-extrabold text-indigo-600">
          회원가입
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">이메일</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="example@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">비밀번호</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="6~12자 영문+숫자"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">비밀번호 확인</label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="비밀번호 재입력"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">이름</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">생년월일</label>
            <input
              type="date"
              name="birth"
              value={form.birth}
              onChange={handleChange}
              min={formatDate(minBirth)}
              max={formatDate(maxBirth)}
              className="mt-1 w-full rounded-md border p-2 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        {err && <p className="mt-3 text-sm text-red-600">{err}</p>}

        <button
          type="submit"
          className="mt-5 w-full rounded-lg bg-indigo-600 py-2 font-bold text-white transition hover:bg-indigo-700 text-sm"
        >
          회원가입
        </button>

        <p className="mt-3 text-center text-sm">
          이미 계정이 있나요?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            로그인
          </a>
        </p>
      </form>
    </main>
  );
}