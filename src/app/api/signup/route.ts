// app/api/signup/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, name, birth } = await req.json();

    // 이메일 중복 체크
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json(
        { success: false, error: "이미 가입된 이메일입니다." },
        { status: 400 }
      );
    }

    // 비밀번호 해싱
    const hashedPw = await bcrypt.hash(password, 10);

    // DB 저장
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPw,
        name,
        // 문자열 "YYYY-MM-DD" → Date 객체 변환
        birth: new Date(`${birth}T00:00:00.000Z`),
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    console.error("회원가입 에러:", err);
    return NextResponse.json(
      { success: false, error: err.message || String(err)},
      { status: 500 }
    );
  }
}