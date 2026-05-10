import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  const correct = password?.trim() === process.env.ARCHIVE_PASSWORD?.trim();
  return NextResponse.json({ correct });
}
