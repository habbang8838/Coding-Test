"use client";
import Link from "next/link";
import dayjs from "dayjs";

export default function Home() {
  const yyyymm = dayjs().format("YYYYMM");
  const examId = `coding_test_${yyyymm}`;
  return (
    <main style={{ maxWidth:720, margin: "40px auto", padding:16}}>
      <h1 style={{ fontSize:28, fontWeight:800}}>코딩테스트</h1>
      <p style={{color:"#666"}}>시험 대기실로 이동하세요.</p>
      <div style={{marginTop:16}}>
        <Link
          href={`/exam/${examId}/lobby`}
          style={{padding:"10px 14px", background:"#111", color:"#fff", borderRadius:8}}
        >
          시험 대기실로
        </Link>
      </div>    
    </main>
  );
}