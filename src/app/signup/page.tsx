"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// 한국 시간 기준 YYYY-MM-DD
function formatDate(d: Date) {
  const offset = d.getTimezoneOffset() * 60000; // 분 → ms
  const local = new Date(d.getTime() - offset); // 한국시간 보정
  return local.toISOString().split("T")[0];
}

export default function SignupPage() {
  const router = useRouter();

  const today = new Date();
  const defaultBirth = new Date(today);
  defaultBirth.setFullYear(today.getFullYear() - 25); // 25년 전

  const minBirth = new Date(today);
  minBirth.setFullYear(today.getFullYear() - 90); // 90년 전

  const maxBirth = new Date(today);
  maxBirth.setFullYear(today.getFullYear() - 10); // 10년 전

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
    name: "홍길동",
    birth: formatDate(defaultBirth), // ✅ 한국시간 기준
  });
  const [err, setErr] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/.test(form.email)) {
      return "올바른 이메일을 입력하세요.";
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/.test(form.password)) {
      return "비밀번호는 영문+숫자 조합 6~12자여야 합니다.";
    }
    if (form.password !== form.confirm) {
      return "비밀번호 확인이 일치하지 않습니다.";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) return setErr(v);

    alert("회원가입 완료!");
    router.push("/login");
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xs"
      >
        <h1 className="text-2xl font-extrabold mb-6 text-center text-indigo-600">
          회원가입
        </h1>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">이메일</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
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
              className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
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
              className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
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
              className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
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
              className="w-full border p-2 rounded mt-1 focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
            />
          </div>
        </div>

        {err && <p className="text-red-600 text-sm mt-3">{err}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg mt-5 font-bold hover:bg-indigo-700 transition text-sm"
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