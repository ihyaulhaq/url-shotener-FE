import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  // Call your actual shortening service here
  // e.g. Bitly, TinyURL, or your own DB logic
  const shortUrl = `https://short.ly/${Math.random().toString(36).slice(2, 7)}`;

  return NextResponse.json({ shortUrl });
}