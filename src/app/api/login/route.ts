// src/app/api/login/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // DB에서 사용자 조회
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ success: false, error: "존재하지 않는 이메일입니다." }, { status: 400 });
    }

    // 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, error: "비밀번호가 일치하지 않습니다." }, { status: 400 });
    }

    // 로그인 성공 → 쿠키 저장
    const res = NextResponse.json({ success: true });
    res.cookies.set("auth", "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });

    return res;
  } catch (err: any) {
    console.error("로그인 에러:", err);
    return NextResponse.json({ success: false, error: "서버 오류 발생" }, { status: 500 });
  }
}