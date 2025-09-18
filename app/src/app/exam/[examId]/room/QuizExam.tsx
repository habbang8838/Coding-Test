"use client";

import { useState } from "react";
import { quizData } from "./quizData";

export default function QuizExam() {
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [score, setScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qid: number, idx: number) => {
    setAnswers((prev) => ({ ...prev, [qid]: idx }));
  };

  const handleSubmit = () => {
    let total = 0;
    quizData.forEach((q) => {
      if (answers[q.id] === q.correct[0]) {
        total += 5;
      }
    });
    setScore(total);
    setSubmitted(true); // ✅ 제출 완료 처리
  };

  if (submitted) {
    return (
      <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-6">시험 결과</h1>
        <p className="text-xl font-semibold mb-4">총점: {score}점</p>
        {score !== null && score >= 80 ? (
          <p className="text-green-600 text-xl font-bold">합격입니다 🎉</p>
        ) : (
          <p className="text-red-600 text-xl font-bold">불합격입니다 ❌</p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">머신러닝 퀴즈 시험</h1>

      {quizData.map((q) => (
        <div key={q.id} className="mb-6">
          <p className="font-semibold mb-2">
            {q.id}. {q.question}
          </p>
          <div className="space-y-1">
            {q.options.map((opt, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`q-${q.id}`}
                  value={idx}
                  checked={answers[q.id] === idx}
                  onChange={() => handleSelect(q.id, idx)}
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        제출하기
      </button>
    </div>
  );
}